import {NonTerminalElt,TerminalElt,terminal} from "./terminal.js"

export class RepeatElt extends NonTerminalElt {
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
  return new RepeatElt(elt);
}
