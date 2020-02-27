import {NonTerminal,Terminal,terminal} from "./terminal.js"

export class Repeat extends NonTerminal {
  constructor(value,ctx,kind) {
    super(value,ctx,kind ||"repeat");
  }

}

export function repeat(elt,ctx) {
  return new Repeat(elt,ctx);
}
