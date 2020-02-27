import {NonTerminal,Terminal,terminal} from "./terminal.js"

export class Repeat extends NonTerminal {
  constructor(value,kind,ctx) {
    super(value,kind ||"repeat", ctx);
  }

}

export function repeat(elt,ctx) {
  if (typeof elt === "string") {
    return new Repeat([terminal([elt])],"repeat",ctx);
  }
  return new Repeat([elt],"repeat",ctx);
}
