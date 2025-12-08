function pseudoangle(d: Array<number | undefined>): number {
  if(!d || d.length < 2 || d[0] === undefined || d[1] === undefined) {
    // throw new Error(
    //   'Invalid input: d must be an array of at least two defined numbers.',
    // );
    console.warn('Invalid input to pseudoangle: returning NaN');
    return NaN; // or another default value like 0 if more appropriate
  }
  const p = d[0] / (Math.abs(d[0]) + Math.abs(d[1])); // -1 .. 1 increasing with x
  return d[1] < 0 ? 3 + p : 1 - p; //  2 .. 4 increasing with x, 0 .. 2 decreasing with x
}

function compareAngles(
  vList: Array<number[] | undefined>,
  p1: number,
  p2: number,
  center: number,
): number {
  if(!vList[p1] || !vList[p2] || !vList[center]) {
    console.error('compareAngles: Invalid indices or center:', {
      vList,
      p1,
      p2,
      center,
    });
    return 0; // or throw an error, depending on how you want to handle it
  }

  const v1 = vList[p1];
  const v2 = vList[p2];
  const c = vList[center];

  if(
    !v1 ||
    !v2 ||
    !c ||
    v1[0] === undefined ||
    v1[2] === undefined ||
    v2[0] === undefined ||
    v2[2] === undefined ||
    c[0] === undefined ||
    c[2] === undefined
  ) {
    console.error('compareAngles: Invalid vertex values:', {
      vList,
      p1,
      p2,
      center,
    });
    return 0; // or throw an error, depending on how you want to handle it
  }

  const a1 = pseudoangle([v1[0] - c[0], v1[2] - c[2]]);
  const a2 = pseudoangle([v2[0] - c[0], v2[2] - c[2]]);
  return a1 < a2 ? 1 : -1;
}

type GraphDict = { [key: number]: number[] };

export class Poly2FacesGraph {
  private g_dict: GraphDict;

  constructor() {
    this.g_dict = {};
  }

  addVertex(vertex: number): void {
    if(!this.g_dict[vertex]) {
      this.g_dict[vertex] = [];
    }
  }

  addEdge(edge: [number, number]): void {
    const [vertex1, vertex2] = edge;
    this.addVertex(vertex1);
    this.addVertex(vertex2);

    if(!this.g_dict[vertex1]) {
      this.g_dict[vertex1] = [];
    }
    if(!this.g_dict[vertex2]) {
      this.g_dict[vertex2] = [];
    }

    this.g_dict[vertex1].push(vertex2);
    this.g_dict[vertex2].push(vertex1);
  }

  edges(): Array<[number, number]> {
    const edges: Array<[number, number]> = [];
    for(const key of Object.keys(this.g_dict)) {
      const vertex = parseInt(key, 10);
      const neighbors = this.g_dict[vertex];
      if(!neighbors) {
        continue;
      } // Skip if neighbors is undefined

      for(const neighbor of neighbors) {
        if(
          !edges.some(
            e => (e[0] === neighbor && e[1] === vertex) ||
              (e[1] === neighbor && e[0] === vertex),
          )
        ) {
          edges.push([vertex, neighbor]);
        }
      }
    }
    return edges;
  }

  circularEmbedding(
    vList: number[][],
    direction: 'CCW' | 'CW' = 'CCW',
  ): { [key: number]: number[] } {
    const embedding: { [key: number]: number[] } = {};

    for(const key of Object.keys(this.g_dict)) {
      const vertex = parseInt(key, 10); // Added radix parameter
      const neighbors = this.g_dict[vertex];
      if(!neighbors) {
        continue;
      } // Skip if neighbors is undefined

      const ordering = neighbors
        .slice()
        .sort((a, b) => compareAngles(vList, a, b, vertex)); // Use vertex directly here

      if(direction === 'CCW') {
        embedding[vertex] = ordering;
      } else if(direction === 'CW') {
        embedding[vertex] = ordering.reverse();
      }
    }

    return embedding;
  }


  faces(
    embedding: { [key: number]: number[] },
    nrOfPolyVerts: number,
  ): number[][] {
    const edgeset = new Set<string>();
    for(const edge of this.edges()) {
      edgeset.add(`${edge[0]},${edge[1]}`);
      edgeset.add(`${edge[1]},${edge[0]}`);
    }

    const faces: Array<Array<[number, number]>> = [];
    let path: Array<[number, number]> = [];

    for(const edge of edgeset) {
      const [v1, v2] = edge.split(',').map(Number);
      if(v1 !== undefined && v2 !== undefined) {
        path.push([v1, v2]);
        edgeset.delete(`${v1},${v2}`);
        break; // Only one iteration to start the path
      }
    }

    while(edgeset.size > 0) {
      const lastElement = path[path.length - 1];
      if(!lastElement) {
        break;
      }

      const neighbors = embedding[lastElement[1]];
      if(!neighbors) {
        continue;
      }

      const secondToLast = lastElement[0];
      const index = neighbors.indexOf(secondToLast);
      const nextIndex = (index + 1) % neighbors.length;
      const next_node = neighbors[nextIndex];

      if(next_node === undefined) {
        continue;
      }

      const tup: [number, number] = [lastElement[1], next_node];

      if(
        path.length > 0 &&
        path[0] &&
        tup[0] === path[0][0] &&
        tup[1] === path[0][1]
      ) {
        faces.push([...path]);
        path = [];
        for(const edge of edgeset) {
          const [v1, v2] = edge.split(',').map(Number);
          if(v1 !== undefined && v2 !== undefined) {
            path.push([v1, v2]);
            edgeset.delete(`${v1},${v2}`);
            break; // Only one iteration to start a new path
          }
        }
      } else {
        if(path.some(p => p[0] === tup[0] && p[1] === tup[1])) {
          // throw new Error('Endless loop caught in poly2FacesGraph faces()');
          console.warn('Potential endless loop detected in poly2FacesGraph faces()');
          return []; // Return empty array to avoid throwing an error
        }
        path.push(tup);
        edgeset.delete(`${tup[0]},${tup[1]}`);
      }
    }

    if(path.length !== 0) {
      faces.push([...path]);
    }

    const final_faces: number[][] = [];
    for(let face of faces) {
      const origEdges = face.filter(
        ([v1, v2]) => v1 < nrOfPolyVerts && v2 < nrOfPolyVerts,
      );
      if(origEdges.length) {
        const nextOrigIndex = face.findIndex(
          ([v1, v2]) => v1 < nrOfPolyVerts && v2 < nrOfPolyVerts,
        );
        face = face.slice(nextOrigIndex).concat(face.slice(0, nextOrigIndex));
      }
      const vert_list = face.map(e => e[0]);
      if(vert_list.some(i => i >= nrOfPolyVerts)) {
        final_faces.push(vert_list);
      }
    }

    return final_faces;
  }
}
