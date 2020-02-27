import {NonTerminal,Terminal,terminal} from "./terminal.js"

export class Optional extends NonTerminal {
  constructor(value,kind,ctx) {
    super(value, kind || "optional", ctx);
  }

}

export function optional(elt,ctx) {
  
  if (typeof elt === "string") {
    return new Optional([terminal(elt)],"optional",ctx);
  }
  return new Optional([elt],"optional",ctx);
}

