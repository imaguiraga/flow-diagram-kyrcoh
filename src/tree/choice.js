import {NonTerminalElt} from "./terminal.js"

export class ChoiceElt extends NonTerminalElt {
  constructor(elts,ctx,kind)  {
    super(elts,ctx,kind || "choice");
  }

}

export function choice(...elts) {
  return new ChoiceElt([...elts]);
}

