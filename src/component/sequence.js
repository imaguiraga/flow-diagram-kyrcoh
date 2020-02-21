import {NonTerminal,Terminal} from "./terminal.js"

export class Sequence extends NonTerminal {
  constructor(value) {
    super(value, "sequence");
    this.kind = "sequence";
    this._start = this.children[0];
    this._finish = this.children[this.children.length - 1];
  }

  toG6(filter) {
    const data = {
      nodes: [],
      edges: []
    };
    const self = this;
    // nodes
    if (this.kind === "sequence") {
      this._nodes.forEach(node => {
        // keep only terminal nodes
        if (node.kind !== "terminal") {
          return;
        }
        let n = {
          id: node.id,
          label: node.id,
          model: { 
            kind: 'sequence.terminal'
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
    // edges
    for (let i = 0; i < this._nodes.length - 1; i++) {
      data.edges.push({
        source: this._nodes[i].finish.id,
        target: this._nodes[i + 1].start.id
      });
    }
    // concatenate G6 graphs

    this._nodes.forEach(node => {
      let g6 = node.toG6(n => self.foundNode(n));
      data.nodes = data.nodes.concat(g6.nodes);
      data.edges = data.edges.concat(g6.edges);
    });

    return data;
  }
}


export function sequence(...nodes) {
  return new Sequence(nodes);
}
