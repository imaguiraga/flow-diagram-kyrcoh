import {NonTerminal,Terminal,terminal} from "./terminal.js"

export class Optional extends NonTerminal {
  constructor(value) {
    super(value, "optional");
    this.type = "optional";
  }

}

export function optional(elt) {
  if (typeof elt === "string") {
    return new Optional(terminal(elt));
  }
  return new Optional(elt);
}

