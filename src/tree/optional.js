import {NonTerminal,Terminal,terminal} from "./terminal.js"

export class Optional extends NonTerminal {
  constructor(value,ctx,kind)  {
    super(value,ctx,kind || "optional");
  }

}

export function optional(elt,ctx) {
  return new Optional(elt,ctx);
}

