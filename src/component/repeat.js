import {NonTerminal,Terminal} from "./terminal.js"

export class Repeat extends NonTerminal {
  constructor(value) {
    super(value, "repeat");
    this.type = "repeat";
  }

}



export function repeat(elt) {
  if (typeof elt === "string") {
    return new Repeat(terminal(elt));
  }
  return new Repeat(elt);
}
