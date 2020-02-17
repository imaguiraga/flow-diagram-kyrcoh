export class Terminal {
  static ID = 0;
  constructor(value, type) {
    let self = this;

    self.title = value;
    //get new id
    Terminal.ID = Terminal.ID + 1;
    self.type = type || "terminal";
    self.id = self.type + "." + Terminal.ID;
    self._nodes = [value];
    self._start = this;
    self._finish = this;
  }

  get start() {
    return this._start;
  }

  get finish() {
    return this._finish;
  }

  get children() {
    return this._nodes;
  }

  static getName(name, obj) {
    obj.title = name;
    return obj;
  }

  toG6(filter) {
    const data = {
      nodes: [],
      edges: []
    };

    let n = {
      id: this.id,
      label: this.id //,
      //cfg: node
    };
    if (filter) {
      if (!filter(n)) {
        data.nodes.push(n);
      }
    } else {
      data.nodes.push(n);
    }
    return data;
  }

  foundNode(node) {
    return this.id === node.id;
  }
}

export class NonTerminal extends Terminal {
  constructor(_nodes, type) {
    super(_nodes, type);
    let self = this;
    self._nodes = [];
    self.title = null;
    self._start = new Terminal("start", "start");
    self._finish = new Terminal("finish", "finish");

    if (Array.isArray(_nodes)) {
      let val = _nodes.map(n => {
        if (n instanceof Function) {
          return Terminal.getName(n.name, n.call());
        } else if (typeof n === "string") {
          return terminal(n);
        }
        return n;
      });
      self._nodes = val;
    } else {
      if (_nodes instanceof Function) {
        console.log(_nodes.name);
        self._nodes.push(Terminal.getName(_nodes.name, _nodes.call()));
      } else {
        if (typeof a === "string") {
          self._nodes.push(terminal(_nodes));
        } else {
          self._nodes.push(_nodes);
        }
      }
    }
    if (this.title === null) {
      this.title = "" + this.id;
    }
  }
  foundNode(node) {
    return this._nodes.filter(n => n.id === node.id).length > 0;
  }
}

export class Sequence extends NonTerminal {
  constructor(value) {
    super(value, "sequence");
    this.type = "sequence";
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
    if (this.type === "sequence") {
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
          //else if (!self.foundNode(n)) {
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

export class Choice extends NonTerminal {
  constructor(value) {
    super(value, "choice");
    this.type = "choice";
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
    if (this.type === "choice") {
      this._nodes.forEach(node => {
        // keep only terminal nodes
        if (node.type !== "terminal") {
          return;
        }
        let n = {
          id: node.id,
          label: node.id
          //cfg: node
        };
        debugger;
        if (filter) {
          if (!filter(n)) {
            data.nodes.push(n);
          }
        } else {
          //if (!self.foundNode(n)) {
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
    // concatenate G6 graphs

    this._nodes.forEach(node => {
      let g6 = node.toG6(n => self.foundNode(n));
      data.nodes = data.nodes.concat(g6.nodes);
      data.edges = data.edges.concat(g6.edges);
    });

    return data;
  }
}

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
      label: this.start.id //,
      // cfg: this.start
    });

    const self = this;
    // nodes
    if (this.type === "repeat") {
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

export function sequence(...nodes) {
  return new Sequence(nodes);
}

export function choice(...nodes) {
  return new Choice(nodes);
}

export function optional(a) {
  if (typeof a === "string") {
    return new Optional(terminal(a));
  }
  return new Optional(a);
}

export function zeroOrMore(a) {
  return optional(repeat(a));
}

export function repeat(a) {
  if (typeof a === "string") {
    return new Repeat(terminal(a));
  }
  return new Repeat(a);
}

export function terminal(a) {
  return new Terminal(a);
}
