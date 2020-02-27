import {NonTerminalElt,TerminalElt} from "./terminal.js"

export class SequenceElt extends NonTerminalElt {
  constructor(elts,ctx,kind) {
    super(elts,ctx,kind ||"sequence");
  }

}

export function sequence(...elts) {
  return new SequenceElt([...elts]);
}
