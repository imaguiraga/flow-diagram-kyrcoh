import {NonTerminal,Terminal} from "./terminal.js"

export class Repeat extends NonTerminal {
  constructor(value) {
    super(value, "repeat");
    this.type = "repeat";
  }

  toG6(filter) {
    return RepeatG6Visitor.visit(this,filter);
  }
}

export class RepeatG6Visitor{
  static visit(tree,filter) {
    const data = {
      nodes: [],
      edges: []
    };
    if (tree.kind !== "repeat") {
      return data;
    }
    // start + finish nodes
    data.nodes.push({
      id: tree.start.id,
      label: tree.start.id,
      model: { 
        kind: 'repeat.start'
      }
    });

    // nodes
    if (tree.kind === "repeat") {
      tree._nodes.forEach(node => {
        // keep only terminal nodes
        if (node.kind !== "terminal") {
          return;
        }
        let n = {
          id: node.id,
          label: node.id ,
          model: { 
            kind: 'repeat.terminal'
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
      label: tree.finish.id,
      model: { 
        kind: 'repeat.finish'
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
      source: tree.finish.id,
      target: tree.start.id
    });
    // concatenate G6 graphs

    this._nodes.forEach(node => {
      let g6 = node.toG6(n => tree.foundNode(n));
      data.nodes = data.nodes.concat(g6.nodes);
      data.edges = data.edges.concat(g6.edges);
    });
    return data;
  }
}

export function repeat(elt) {
  if (typeof elt === "string") {
    return new Repeat(terminal(elt));
  }
  return new Repeat(elt);
}
