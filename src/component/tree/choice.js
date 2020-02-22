import {NonTerminal,Terminal} from "./terminal.js"

export class Choice extends NonTerminal {
  constructor(value) {
    super(value, "choice");
    this.type = "choice";
  }

}

export function choice(...nodes) {
  return new Choice(nodes);
}

