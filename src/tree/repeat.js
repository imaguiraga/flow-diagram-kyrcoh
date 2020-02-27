import {NonTerminal,Terminal,terminal} from "./terminal.js"

export class Repeat extends NonTerminal {
  constructor(elts,ctx,kind) {
    super(elts,ctx,kind ||"repeat");
  }

  add(elt){
    // only one elt can be added
    if(this.elts.length > 0){
      this.elts.clear();
    }
    this.elts.push(elt);
    return this;
  }
}

export function repeat(elt) {
  return new Repeat(elt);
}
