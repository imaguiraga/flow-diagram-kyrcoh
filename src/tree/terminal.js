export class TerminalElt {
  static ID = 0;
  constructor(_elts /*@Array*/,ctx,kind) {
    let self = this;
    self.title = "title";
    self.elts = [];
    
    if( typeof _elts !== "undefined"){
      if (!Array.isArray(_elts)){
        _elts = [_elts];
      } 
      self.title = _elts[0];
      self.elts = _elts;
    }
    //get new id
    TerminalElt.ID = TerminalElt.ID + 1;
    self.kind = kind || "terminal";
    self.id = self.kind + "." + TerminalElt.ID;
    
    self.start = this;
    self.finish = this;
    self.ctx = ctx;
  }
  
  ctx(_ctx){
    this.ctx = _ctx;
    return this;
  }

  title(_title){
    this.title = _title;
    return this;
  }

  id(_id){
    this.id = _id;
    return this;
  }

  add(elt){
    // only one elt can be added
    if(this.elts.length > 0){
      this.elts.clear();
    }
    let e = this.resolveElt(elt); 
    if( e !== null) {
      this.elts.push(this.resolveElt(elt));
    }
    
    return this;
  }

  resolveElt(elt){
    // Only accept primitive types as Terminal Element 
    let result = null;
    if( typeof elt !== "undefined") {
      try {
        if (typeof elt === "function") {
          result = elt.call();
        } 
        
        result = elt.toString();
      } catch(e){

      }
    }
    return result;
  }

  foundElt(elt) {
    return this.id === elt.id;
  }

  accept(visitor,filter){
    return visitor.visit(this,filter);
  }

}

export class NonTerminalElt extends TerminalElt {
  constructor(_elts,ctx,kind) {
    super(_elts,ctx,kind);
    let self = this;
    self.elts = [];
    self.title = null;
    self.start = new TerminalElt("start",null,"start");
    self.finish = new TerminalElt("finish",null,"finish");

    if (!Array.isArray(_elts)){
      _elts = [_elts];
    }

    if(Array.isArray(_elts)) {
      self.elts = _elts.map(self.resolveElt);
    } 

    if (self.title === null) {
      self.title = "" + self.id;
    }
  }

  resolveElt(elt){
    if (typeof elt === "function") {
      return elt.call();
    } else if (typeof elt !== "object") {
      // very likely a primitive type
      return terminal(elt);
    }
    // default to object
    return elt;
  }

  foundElt(elt) {
    return this.elts.filter(e => e.id === elt.id).length > 0;
  }

  add(elt){
    let self = this;
    if(Array.isArray(elt)){
      elt.forEach((e) => {
        self.elts.push(self.resolveElt(e));
      });

    } else {
      self.elts.push(self.resolveElt(elt));
    }
    
    return this;
  }
}

export function terminal(elt) {
  return new TerminalElt(elt);
}
