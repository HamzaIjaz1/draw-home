// Algorithm is copied from the Internet, black box tested, looks like working correct
export const detectFloorGraphCycles = (cy: cytoscape.Core) => {
  const stack: cytoscape.NodeSingular[] = [];
  const visited = new Set();
  const onStack = new Set();
  const cycles: string[][] = [];

  const dfs = (node: cytoscape.NodeSingular) => {
    if(onStack.has(node.id())) {
      const cycle = stack.slice(stack.indexOf(node));
      cycles.push(cycle.map(e => e.id()));
      return;
    }

    if(visited.has(node.id())) {
      return;
    }

    visited.add(node.id());
    onStack.add(node.id());
    stack.push(node);

    node.outgoers('node').forEach(neighbor => {
      dfs(neighbor);
    });

    stack.pop();
    onStack.delete(node.id());
  };

  cy.nodes().forEach(node => {
    if(!visited.has(node.id())) {
      dfs(node);
    }
  });

  return cycles;
};
