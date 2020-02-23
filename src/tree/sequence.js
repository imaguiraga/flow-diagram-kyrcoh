import {NonTerminal,Terminal} from "./terminal.js"

export class Sequence extends NonTerminal {
  constructor(value) {
    super(value, "sequence");
    this.kind = "sequence";
  }

}

export function sequence(...nodes) {
  return new Sequence(nodes);
}
