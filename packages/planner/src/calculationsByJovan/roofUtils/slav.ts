// slav.ts
import { Subtree } from '../types';
import { cross } from '../Utils/Vector/vector';
import { approximatelyEquals, approximatelySame, normalizeContour, Point2 } from '../Utils/Vector/point';
import { Line2, Ray2 } from '../Utils/Curve/primitive';
import { GEOMETRY_EPSILON } from './geometryCleanup';

// Unified epsilon values for consistency across the skeleton algorithm
// const ORIENTATION_EPSILON = GEOMETRY_EPSILON.ORIENTATION; // For orientation tests (cross product sign checks)
// const COMPARISON_EPSILON = GEOMETRY_EPSILON.POINT_MERGE; // For distance/position comparisons
const MIN_BISECTOR_MAGNITUDE = GEOMETRY_EPSILON.MIN_BISECTOR_MAGNITUDE; // Minimum magnitude for valid bisector

const ORIENTATION_EPSILON = 0.000000000000001; // For orientation tests (cross product sign checks)
const COMPARISON_EPSILON = 0.001; // For distance/position comparisons

export type Event = {
  distance: number;
  compareTo(other: Event): number;
};

// OriginalEdge.ts

export class OriginalEdge {
  constructor(
    public edge: Line2,
    public bisectorLeft: Ray2,
    public bisectorRight: Ray2,
  ) {}
}

export class SplitEvent implements Comparable<SplitEvent> {
  constructor(
    public distance: number,
    public intersectionPoint: Point2,
    public vertex: LAVertex,
    public oppositeEdge: Line2,
  ) {}

  public compareTo(other: SplitEvent | EdgeEvent): number {
    const distanceDiff = this.distance - other.distance;
    if(Math.abs(distanceDiff) > COMPARISON_EPSILON) {
      return distanceDiff;
    }

    // For very close distances, use epsilon-based tie-breaking
    const xDiff = this.intersectionPoint.x - other.intersectionPoint.x;
    if(Math.abs(xDiff) > COMPARISON_EPSILON) {
      return xDiff;
    }

    const yDiff = this.intersectionPoint.y - other.intersectionPoint.y;
    if(Math.abs(yDiff) > COMPARISON_EPSILON) {
      return yDiff;
    }

    // Final tie-breaking: prioritize split events over edge events
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    if(this instanceof SplitEvent && other instanceof EdgeEvent) {
      return -1;
    }
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    if(this instanceof EdgeEvent && other instanceof SplitEvent) {
      return 1;
    }

    return 0;
  }
}

export class EdgeEvent implements Comparable<EdgeEvent> {
  constructor(
    public distance: number,
    public intersectionPoint: Point2,
    public vertexA: LAVertex,
    public vertexB: LAVertex,
  ) {}

  public compareTo(other: SplitEvent | EdgeEvent): number {
    const distanceDiff = this.distance - other.distance;
    if(Math.abs(distanceDiff) > COMPARISON_EPSILON) {
      return distanceDiff;
    }

    // For very close distances, use epsilon-based tie-breaking
    const xDiff = this.intersectionPoint.x - other.intersectionPoint.x;
    if(Math.abs(xDiff) > COMPARISON_EPSILON) {
      return xDiff;
    }

    const yDiff = this.intersectionPoint.y - other.intersectionPoint.y;
    if(Math.abs(yDiff) > COMPARISON_EPSILON) {
      return yDiff;
    }

    // Final tie-breaking: prioritize split events over edge events
    if(this instanceof SplitEvent && other instanceof EdgeEvent) {
      return -1;
    }
    if(this instanceof EdgeEvent && other instanceof SplitEvent) {
      return 1;
    }

    return 0;
  }
}


export class LAVertex {
  public prev: LAVertex | null = null;
  public next: LAVertex | null = null;
  public lav: LAV | null = null;
  private valid = true;
  private bisector: Ray2;
  private isReflex: boolean;

  constructor(
    public point: Point2,
    public edgeLeft: Line2,
    public edgeRight: Line2,
    directionVectors: Point2[] | null = null,
  ) {
    // Calculate creator vectors from edge start to end points
    const creatorVectors: [Point2, Point2] = [edgeLeft.v.negate(), edgeRight.v];
    const finalDirectionVectors = (!directionVectors || directionVectors.length !== 2) ? creatorVectors : directionVectors;

    // Ensure directionVectors contains only valid Point2 objects
    if(!finalDirectionVectors[0] || !finalDirectionVectors[1]) {
      console.warn('Invalid direction vectors. Using default creator vectors.');
      this.isReflex = cross(creatorVectors[0], creatorVectors[1]) < -ORIENTATION_EPSILON;
    } else {
      this.isReflex = cross(finalDirectionVectors[0], finalDirectionVectors[1]) < -ORIENTATION_EPSILON;
    }

    // Calculate bisector direction
    let direction = creatorVectors[0].add(creatorVectors[1]);

    const magnitude = direction.magnitude();

    // Handle parallel or near-parallel edges (degenerate case)
    if(magnitude < MIN_BISECTOR_MAGNITUDE) {
      // For parallel edges, use perpendicular to edge direction
      const perpendicular = new Point2(-creatorVectors[0].y, creatorVectors[0].x);
      direction = perpendicular;
      console.warn('Near-parallel edges detected, using perpendicular bisector');
    }

    // Normalize the direction vector
    direction = direction.normalized();

    // Reverse direction if the vertex is reflex
    if(this.isReflex) {
      direction = direction.negate();
    }

    this.bisector = new Ray2(this.point, direction);
  }

  invalidate() {
    this.valid = false;
  }


  isValid(): boolean {
    return this.valid;
  }

  getBisector(): Ray2 {
    return this.bisector;
  }

  nextEvent(): SplitEvent | EdgeEvent | null {
    const events: Array<SplitEvent | EdgeEvent> = [];
    const originalEdges = this.lav?.slav?.getOriginalEdges() || [];

    if(this.isReflex) {
      for(const edge of originalEdges) {
        if(edge.edge.equals(this.edgeLeft) || edge.edge.equals(this.edgeRight)) {
          continue;
        }

        const leftDot = Math.abs(this.edgeLeft.v.normalized().dot(edge.edge.v.normalized()));
        const rightDot = Math.abs(this.edgeRight.v.normalized().dot(edge.edge.v.normalized()));
        const selfEdge = leftDot < rightDot ? this.edgeLeft : this.edgeRight;

        const i = new Line2(selfEdge.p1, selfEdge.p2).intersect(new Line2(edge.edge.p1, edge.edge.p2));

        if(i && !approximatelyEquals(i.distance(this.point), 0)) {
          const linvec = this.point.subtract(i).normalized();
          let edvec = edge.edge.v.normalized();
          if(linvec.dot(edvec) < 0) {
            edvec = edvec.negate();
          }

          const bisecvec = edvec.add(linvec);
          const bisecMag = bisecvec.magnitude();

          // Skip if bisector is degenerate (parallel edges case)
          if(bisecMag < MIN_BISECTOR_MAGNITUDE) {
            continue;
          }

          const bisector = new Line2(i, i.add(bisecvec));

          const b = bisector.intersect(new Line2(this.bisector.p, this.bisector.atDistance(1)));

          if(!b) {
            continue;
          }

          // Validate that intersection is not too close to current vertex
          if(b.distance(this.point) < COMPARISON_EPSILON) {
            continue;
          }

          const xleft = cross(edge.bisectorLeft.v.normalized(), b.subtract(edge.bisectorLeft.p).normalized()) > -ORIENTATION_EPSILON;
          const xright = cross(edge.bisectorRight.v.normalized(), b.subtract(edge.bisectorRight.p).normalized()) < ORIENTATION_EPSILON;
          const xedge = cross(edge.edge.v.normalized(), b.subtract(edge.edge.p1).normalized()) < ORIENTATION_EPSILON;

          if(!(xleft && xright && xedge)) {
            continue;
          }

          const distance = new Line2(edge.edge.p1, edge.edge.p2).distance(b);

          // Skip events that are too close (degenerate)
          if(distance < COMPARISON_EPSILON) {
            continue;
          }

          const newEvent = new SplitEvent(distance, b, this, edge.edge);
          events.push(newEvent);
        }
      }
    }

    if(this.prev) {
      const prevIntersection = this.bisector.intersect(this.prev.getBisector());

      if(prevIntersection) {
        const edgeEvent = new EdgeEvent(this.edgeLeft.distance(prevIntersection), prevIntersection, this.prev, this);
        events.push(edgeEvent);
        // if(prevIntersection && prevIntersection.distance(this.point) > COMPARISON_EPSILON) {
        //   const distance = this.edgeLeft.distance(prevIntersection);

      //   // Skip very close intersections
      //   if(distance > COMPARISON_EPSILON) {
      //     const edgeEvent = new EdgeEvent(distance, prevIntersection, this.prev, this);
      //     events.push(edgeEvent);
      //   }
      }
    }

    if(this.next) {
      const nextIntersection = this.bisector.intersect(this.next.getBisector());

      // if(nextIntersection && nextIntersection.distance(this.point) > COMPARISON_EPSILON) {
      //   const distance = this.edgeRight.distance(nextIntersection);

      if(nextIntersection) {
        const edgeEvent = new EdgeEvent(this.edgeRight.distance(nextIntersection), nextIntersection, this, this.next);
        events.push(edgeEvent);
        // // Skip very close intersections
        // if(distance > COMPARISON_EPSILON) {
        //   const edgeEvent = new EdgeEvent(distance, nextIntersection, this, this.next);
        //   events.push(edgeEvent);
        // }
      }
    }

    if(events.length === 0) {
      return null;
    }

    // Use epsilon-based comparison for more stable sorting
    const closestEvent = events.reduce((closest, current) => {
      const closestDist = this.point.distance(closest.intersectionPoint);
      const currentDist = this.point.distance(current.intersectionPoint);

      if(Math.abs(currentDist - closestDist) < COMPARISON_EPSILON) {
        // If distances are essentially equal, use deterministic tie-breaking
        if(Math.abs(current.intersectionPoint.x - closest.intersectionPoint.x) < COMPARISON_EPSILON) {
          return current.intersectionPoint.y < closest.intersectionPoint.y ? current : closest;
        }
        return current.intersectionPoint.x < closest.intersectionPoint.x ? current : closest;
      }

      return currentDist < closestDist ? current : closest;
    });

    return closestEvent;
  }
}


export class LAV {
  head: LAVertex | null = null;
  slav: SLAV;
  length = 0;
  constructor(slav: SLAV) {
    this.slav = slav;
  }

  static fromPolygon(polygon: Array<[number, number]>, slav: SLAV): LAV {
    const lav = new LAV(slav);
    const points = normalizeContour(polygon).map(([x, y]) => new Point2(x, y));

    points.forEach((point, index) => {
      const prevIndex = (index - 1 + points.length) % points.length;
      const nextIndex = (index + 1) % points.length;
      const prev = points[prevIndex];
      const next = points[nextIndex];

      if(prev && next) { // Ensure prev and next are not undefined
        const vertex = new LAVertex(point, new Line2(prev, point), new Line2(point, next));
        vertex.lav = lav;
        if(!lav.head) {
          lav.head = vertex;
          vertex.prev = vertex;
          vertex.next = vertex;
        } else {
          vertex.next = lav.head;
          vertex.prev = lav.head.prev;
          // vertex.prev!.next = vertex;
          (vertex.prev as LAVertex).next = vertex;
          lav.head.prev = vertex;
        }
      }
    });

    // eslint-disable-next-line max-len
    slav.setOriginalEdges(Array.from(lav).map(vertex => new OriginalEdge(new Line2((vertex.prev as LAVertex).point, vertex.point), (vertex.prev as LAVertex).getBisector(), vertex.getBisector())));

    return lav;
  }


  // static fromPolygon(polygon: [number, number][], slav: SLAV): LAV {
  //   const lav = new LAV(slav);
  //   const points = normalizeContour(polygon).map(([x, y]) => new Point2(x, y));

  //   points.forEach((point, index) => {
  //     const prev = points[(index - 1 + points.length) % points.length];
  //     const next = points[(index + 1) % points.length];
  //     const vertex = new LAVertex(point, new Line2(prev, point), new Line2(point, next), false);
  //     vertex.lav = lav;
  //     if (!lav.head) {
  //       lav.head = vertex;
  //       vertex.prev = vertex;
  //       vertex.next = vertex;
  //     } else {
  //       vertex.next = lav.head;
  //       vertex.prev = lav.head.prev;
  //       vertex.prev!.next = vertex;
  //       lav.head.prev = vertex;
  //     }

  //      slav.setOriginalEdges(Array.from(lav).map(vertex =>
  //         new OriginalEdge(new Line2(vertex.prev!.point, vertex.point), vertex.prev!.getBisector(), vertex.getBisector())
  //   ));
  //   });
  //   return lav;
  // }


  static fromChain(head: LAVertex, slav: SLAV): LAV {
    const lav = new LAV(slav);
    lav.head = head;
    for(const vertex of lav) {
      vertex.lav = lav;
    }
    return lav;
  }

  invalidate(vertex: LAVertex) {
    if(this.head === vertex) {
      this.head = vertex.next;
    }

    // Create a new object with the desired changes
    const updatedVertex = {
      ...vertex,
      lav: null,
    };

    // Use the updatedVertex object instead of the original vertex object
    vertex.invalidate();

    return updatedVertex;
  }

  unify(vertexA: LAVertex, vertexB: LAVertex, point: Point2): LAVertex {
    const directionVectors: Point2[] = [
      vertexB.getBisector().v.normalized(),
      vertexA.getBisector().v.normalized(),
    ];

    const replacement = new LAVertex(point, vertexA.edgeLeft, vertexB.edgeRight, directionVectors);
    replacement.lav = this;


    const prevVertexA = vertexA.prev;
    const nextVertexB = vertexB.next;

    if(prevVertexA) {
      prevVertexA.next = replacement;
    }

    if(nextVertexB) {
      nextVertexB.prev = replacement;
    }

    replacement.prev = vertexA.prev;
    replacement.next = vertexB.next;

    vertexA.invalidate();
    vertexB.invalidate();

    return replacement;
  }

  [Symbol.iterator](): Iterator<LAVertex> {
    let current = this.head;
    return {
      next: (): IteratorResult<LAVertex> => {
        if(current) {
          const result = { value: current, done: false };
          current = current.next !== this.head ? current.next : null;
          return result;
        }
        return { value: null, done: true };
      },
    };
  }
}


export class SLAV {
  public lavs: LAV[] = [];
  private originalEdges: OriginalEdge[] = []; // Updated to use OriginalEdge type

  constructor(polygon: Array<[number, number]>, holes: Array<Array<[number, number]>>) {
    const contours = [
      normalizeContour(polygon),
      ...holes.map(normalizeContour),
    ];
    this.lavs = contours.map(contour => LAV.fromPolygon(contour, this));
    this.originalEdges = this.lavs.flatMap(lav => Array.from(lav).map(
      // eslint-disable-next-line max-len
      vertex => new OriginalEdge(new Line2((vertex.prev as LAVertex).point, vertex.point), (vertex.prev as LAVertex).getBisector(), vertex.getBisector()),
    ));
  }

  getOriginalEdges(): OriginalEdge[] {
    return this.originalEdges;
  }

  setOriginalEdges(edges: OriginalEdge[]) {
    this.originalEdges = edges;
  }


  handleEdgeEvent(event: EdgeEvent): { subtree: Subtree; events: Array<SplitEvent | EdgeEvent> } | null {
    const sinks: Point2[] = [];
    const events: Array<SplitEvent | EdgeEvent> = [];
    // const lav = event.vertexA.lav!;
    const lav = event.vertexA.lav;
    if(lav === null || lav === undefined) {
      // handle the case when lav is null or undefined
      return null;
    }


    // TODO: Mislim da ovo mozes obrisati jer imas istu validaciju u skeletonize.ts na ulazu
    if(!event.vertexA.isValid() || !event.vertexB.isValid()) {
      // console.log(`Skipping invalid edge event at intersection ${JSON.stringify(event.intersectionPoint)}`);
      return null;
    }

    if(event.vertexA.prev === event.vertexB.next) {
      this.lavs = this.lavs.filter(l => l !== lav);

      for(const vertex of Array.from(lav)) {
        sinks.push(vertex.point);
        vertex.invalidate();
      }
    } else {
      const newVertex = lav.unify(event.vertexA, event.vertexB, event.intersectionPoint);

      // Invalidate the old vertices to prevent re-processing
      event.vertexA.invalidate();
      event.vertexB.invalidate();

      if(lav.head === event.vertexA || lav.head === event.vertexB) {
        lav.head = newVertex;
      }
      sinks.push(event.vertexA.point, event.vertexB.point);

      const nextEvent = newVertex.nextEvent();


      // if(nextEvent && !approximatelyEqualPoints(nextEvent.intersectionPoint, event.intersectionPoint)) {
      //   events.push(nextEvent);
      // }

      if(nextEvent) {
        events.push(nextEvent);
      }
    }

    const result = {
      subtree: {
        source: event.intersectionPoint,
        height: event.distance,
        sinks,
      },
      events,
    };


    return result;
  }


  handleSplitEvent(
    event: SplitEvent,
  ): { subtree: Subtree; events: Array<SplitEvent | EdgeEvent> } | null {
    const lav = event.vertex.lav;
    if(lav === null || lav === undefined) {
      // handle the case when lav is null or undefined
      return null;
    }

    const sinks: Point2[] = [event.vertex.point];
    const vertices: LAVertex[] = [];
    let x: LAVertex | null = null;
    let y: LAVertex | null = null;
    const norm = event.oppositeEdge.v.normalized();

    for(const v of this.lavs.flatMap(lav => Array.from(lav))) {
      if(
        approximatelySame(norm, v.edgeLeft.v.normalized()) &&
        approximatelySame(event.oppositeEdge.p1, v.edgeLeft.p1)
      ) {
        x = v;
        y = x ? x.prev : null;
      } else if(
        approximatelySame(norm, v.edgeRight.v.normalized()) &&
        approximatelySame(event.oppositeEdge.p1, v.edgeRight.p1)
      ) {
        y = v;
        x = y ? y.next : null;
      }

      if(x) {
        if(y) {
          const xleft =
          cross(
            y?.getBisector()?.v.normalized(),
            event.intersectionPoint.subtract(y?.point).normalized(),
          ) >= -ORIENTATION_EPSILON;
          const xright =
          cross(
            x.getBisector().v.normalized(),
            event.intersectionPoint.subtract(x.point).normalized(),
          ) <= ORIENTATION_EPSILON;
          if(xleft && xright) {
            break;
          } else {
            x = null;
            y = null;
          }
        }
      }
    }


    if(!x) {
      return null;
    }

    const v1 = new LAVertex(
      event.intersectionPoint,
      event.vertex.edgeLeft,
      event.oppositeEdge,
    );
    const v2 = new LAVertex(
      event.intersectionPoint,
      event.oppositeEdge,
      event.vertex.edgeRight,
    );

    v1.prev = event.vertex.prev;
    v1.next = x;
    // event.vertex.prev!.next = v1;
    // x!.prev = v1;

    if(event.vertex.prev) {
      const prevVertex = event.vertex.prev;
      prevVertex.next = v1;
    }
    if(x) {
      const nextVertex = x;
      nextVertex.prev = v1;
    }


    v2.prev = y;
    v2.next = event.vertex.next;


    if(event.vertex.next) {
      const nextVertex = event.vertex.next;
      nextVertex.prev = v2;
    }
    if(y) {
      const yVertex = y;
      yVertex.next = v2;
    }


    const originalLavs = new Set(this.lavs);
    this.lavs = this.lavs.filter(l => l !== lav);
    const newLavs: LAV[] = [];

    if(lav !== x.lav) {
      this.lavs = this.lavs.filter(l => l !== x.lav);
      const newLav1 = LAV.fromChain(v1, this);
      newLavs.push(newLav1);
      this.lavs.push(newLav1);
    } else {
      const newLav1 = LAV.fromChain(v1, this);
      const newLav2 = LAV.fromChain(v2, this);
      newLavs.push(newLav1, newLav2);
      this.lavs.push(newLav1, newLav2);
    }


    for(const l of this.lavs) {
      if(Array.from(l).length > 2) {
        if(l.head !== null) {
          vertices.push(l.head);
        }
        // vertices.push(l.head!);
      } else {
        // Only add as sink if this degenerate LAV was created by the current split event
        // or if it's from the original LAVs that were part of the split operation
        const isNewlyCreated = newLavs.includes(l);
        const wasInvolvedInSplit = !originalLavs.has(l) || l === lav || l === x.lav;

        if(isNewlyCreated || wasInvolvedInSplit) {
          if(l.head?.next) {
            sinks.push(l.head.next.point);
          }
        }
        for(const vertex of Array.from(l)) {
          vertex.invalidate();
        }
      }
    }


    const newEvents: Array<SplitEvent | EdgeEvent> = [];
    for(const vertex of vertices) {
      const nextEvent = vertex.nextEvent();
      if(nextEvent) {
        newEvents.push(nextEvent);
      }
    }

    event.vertex.invalidate();
    return {
      subtree: {
        source: event.intersectionPoint,
        height: event.distance,
        sinks,
      },
      events: newEvents,
    };
  }
}

type Comparable<T> = {
  compareTo(other: T): number;
};
class MinHeap<T extends Comparable<T>> {
  private heap: T[] = [];

  public push(item: T): void {
    this.heap.push(item);
    this.siftUp();
  }


  public pop(): T | undefined {
    if(this.heap.length === 1) {
      return this.heap.pop();
    }

    const top = this.heap[0];
    const lastElement = this.heap.pop();

    if(lastElement !== undefined) {
      this.heap[0] = lastElement;
      this.siftDown();
    }

    return top;
  }

  public peek(): T | undefined {
    return this.heap[0];
  }

  public size(): number {
    return this.heap.length;
  }

  public isEmpty(): boolean {
    return this.heap.length === 0;
  }

  private siftUp(): void {
    let idx = this.heap.length - 1;
    const element = this.heap[idx];

    if(element === undefined) {
      return;
    }

    while(idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const parent = this.heap[parentIdx];

      if(parent === undefined || element.compareTo(parent) < 0) {
        this.heap[idx] = parent !== undefined ? parent : element;
        idx = parentIdx;
      } else {
        break;
      }
    }

    this.heap[idx] = element;
  }

  private siftDown(): void {
    let idx = 0;
    const length = this.heap.length;
    const element = this.heap[0];

    if(element === undefined) {
      return;
    }

    while(true) {
      const leftChildIdx = 2 * idx + 1;
      const rightChildIdx = 2 * idx + 2;
      let swapIdx: number | null = null;

      if(leftChildIdx < length) {
        const leftChild = this.heap[leftChildIdx];
        if(leftChild !== undefined && leftChild.compareTo(element) < 0) {
          swapIdx = leftChildIdx;
        }
      }

      if(rightChildIdx < length) {
        const rightChild = this.heap[rightChildIdx];
        if(rightChild !== undefined) {
          if(swapIdx === null) {
            // Only choose the right child if it is smaller than the element
            if(rightChild.compareTo(element) < 0) {
              swapIdx = rightChildIdx;
            }
          } else {
            const swapElement = this.heap[swapIdx];
            if(swapElement !== undefined && rightChild.compareTo(swapElement) < 0) {
              swapIdx = rightChildIdx;
            }
          }
        }
      }

      if(swapIdx === null) {
        break;
      }

      const swapElement = this.heap[swapIdx];
      if(swapElement !== undefined) {
        this.heap[idx] = swapElement;
        idx = swapIdx;
      } else {
        break;
      }
    }

    this.heap[idx] = element;
  }
}


// Updated EventQueue class
export class EventQueue {
  private data: MinHeap<SplitEvent | EdgeEvent> = new MinHeap();

  put(event: SplitEvent | EdgeEvent | null) {
    if(event) {
      this.data.push(event);
    }
  }

  putAll(events: Array<SplitEvent | EdgeEvent>) {
    events.forEach(event => this.put(event));
  }

  get(): SplitEvent | EdgeEvent | undefined {
    return this.data.pop();
  }

  isEmpty(): boolean {
    return this.data.isEmpty();
  }

  size(): number {
    return this.data.size();
  }

  printAll() {
    // eslint-disable-next-line no-console
    console.log(this.data);
  }
}
