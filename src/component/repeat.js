import {NonTerminal,Terminal} from "./terminal.js"

export class Repeat extends NonTerminal {
  constructor(value) {
    super(value, "repeat");
    this.type = "repeat";
  }

  toG6(filter) {
    const data = {
      nodes: [],
      edges: []
    };

    // start + finish nodes
    data.nodes.push({
      id: this.start.id,
      label: this.start.id,
      model: { 
        kind: 'repeat.start'
      }
    });

    const self = this;
    // nodes
    if (this.kind === "repeat") {
      this._nodes.forEach(node => {
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
      id: this.finish.id,
      label: this.finish.id,
      model: { 
        kind: 'repeat.finish'
      }
    });
    // edges
    for (let i = 0; i < this._nodes.length; i++) {
      data.edges.push({
        source: this.start.id,
        target: this._nodes[i].start.id
      });
      data.edges.push({
        source: this._nodes[i].finish.id,
        target: this.finish.id
      });
    }

    data.edges.push({
      source: this.finish.id,
      target: this.start.id
    });
    // concatenate G6 graphs

    this._nodes.forEach(node => {
      let g6 = node.toG6(n => self.foundNode(n));
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
