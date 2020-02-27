export class Terminal {
  static ID = 0;
  constructor(values /*@Array*/,ctx,kind) {
    let self = this;

    self.title = values[0];
    //get new id
    Terminal.ID = Terminal.ID + 1;
    self.kind = kind || "terminal";
    self.id = self.kind + "." + Terminal.ID;
    self._nodes = values;
    self._start = this;
    self._finish = this;
    self.ctx = ctx;
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

  foundNode(node) {
    return this.id === node.id;
  }

  accept(visitor,filter){
    return visitor.visit(this,filter);
  }

}

export class NonTerminal extends Terminal {
  constructor(_nodes,ctx,kind) {
    super(_nodes,ctx,kind);
    let self = this;
    self._nodes = [];
    self.title = null;
    self._start = new Terminal(["start"],null,"start");
    self._finish = new Terminal(["finish"],null,"finish");
    if (!Array.isArray(_nodes)){
      _nodes = [_nodes];
    }
    if (Array.isArray(_nodes)) {
      let val = _nodes.map(n => {
        if (n instanceof Function) {
          return n.call();
        } else if (typeof n === "string") {
          return terminal(n);
        }
        return n;
      });
      self._nodes = val;
    } 

    if (this.title === null) {
      this.title = "" + this.id;
    }
  }
  foundNode(node) {
    return this._nodes.filter(n => n.id === node.id).length > 0;
  }
}

export function terminal(elt,ctx) {
  return new Terminal([elt],ctx);
}
