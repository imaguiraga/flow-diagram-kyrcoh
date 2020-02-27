import {NonTerminal,Terminal,terminal} from "./terminal.js"

export class Repeat extends NonTerminal {
  constructor(value,ctx,kind) {
    super(value,ctx,kind ||"repeat");
  }

}

export function repeat(elt) {
  return new Repeat(elt);
}
