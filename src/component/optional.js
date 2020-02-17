import {NonTerminal,Terminal} from "./terminal.js"

export class Optional extends NonTerminal {
  constructor(value) {
    super(value, "optional");
    this.type = "optional";
  }

  toG6(filter) {
    const data = {
      nodes: [],
      edges: []
    };

    // start + finish nodes
    data.nodes.push({
      id: this.start.id,
      label: this.start.id //,
      //cfg: this.start
    });

    const self = this;
    // nodes
    debugger;
    if (this.type === "optional") {
      this._nodes.forEach(node => {
        // keep only terminal nodes
        if (node.type !== "terminal") {
          return;
        }
        let n = {
          id: node.id,
          label: node.id //,
          //cfg: node
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
      label: this.finish.id //,
      //cfg: this.finish
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
      source: this.start.id,
      target: this.finish.id
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

export function optional(elt) {
  if (typeof elt === "string") {
    return new Optional(terminal(elt));
  }
  return new Optional(elt);
}

