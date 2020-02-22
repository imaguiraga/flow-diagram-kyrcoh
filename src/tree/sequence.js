import {NonTerminal,Terminal} from "./terminal.js"

export class Sequence extends NonTerminal {
  constructor(value) {
    super(value, "sequence");
    this.kind = "sequence";
    this._start = this.children[0];
    this._finish = this.children[this.children.length - 1];
  }

}



export function sequence(...nodes) {
  return new Sequence(nodes);
}
