import {NonTerminal,Terminal} from "./terminal.js"

export class Optional extends NonTerminal {
  constructor(value) {
    super(value, "optional");
    this.type = "optional";
  }

  toG6(filter) {
    return new OptionalG6Visitor().visit(this,filter);
  }
}

export class OptionalG6Visitor{
  visit(tree,filter) {
    const data = {
      nodes: [],
      edges: []
    };
    if (tree.kind !== "optional") {
      return data;
    }
    // start + finish nodes
    data.nodes.push({
      id: tree.start.id,
      label: tree.start.id ,
      model: { 
        kind: 'optional.start'
      }
    });

    // nodes
    debugger;
    if (tree.kind === "optional") {
      tree._nodes.forEach(node => {
        // keep only terminal nodes
        if (node.kind !== "terminal") {
          return;
        }
        let n = {
          id: node.id,
          label: node.id ,
          model: { 
            kind: 'optional.terminal'
          }
        };
        if (filter) {
          if (!filter(n)) {
            data.nodes.push(n);
          }
        } else {
          data.nodes.push(n);
        }
      });
    }
    data.nodes.push({
      id: tree.finish.id,
      label: tree.finish.id ,
      model: { 
        kind: 'optional.finish'
      }
    });
    // edges
    for (let i = 0; i < tree._nodes.length; i++) {
      data.edges.push({
        source: tree.start.id,
        target: tree._nodes[i].start.id
      });
      data.edges.push({
        source: tree._nodes[i].finish.id,
        target: tree.finish.id
      });
    }

    data.edges.push({
      source: tree.start.id,
      target: tree.finish.id
    });
    // concatenate G6 graphs

    tree._nodes.forEach(node => {
      let g6 = node.toG6(n => tree.foundNode(n));
      data.nodes = data.nodes.concat(g6.nodes);
      data.edges = data.edges.concat(g6.edges);
    });

    return data;
  }
}

export function optional(elt) {
  if (typeof elt === "string") {
    return new Optional(terminal(elt));
  }
  return new Optional(elt);
}

