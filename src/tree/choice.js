import {NonTerminal,Terminal} from "./terminal.js"

export class Choice extends NonTerminal {
  constructor(elts,ctx,kind)  {
    super(elts,ctx,kind || "choice");
  }

}

export function choice(...elts) {
  return new Choice([...elts]);
}

