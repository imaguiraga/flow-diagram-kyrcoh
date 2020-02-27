import {NonTerminal,Terminal} from "./terminal.js"

export class Choice extends NonTerminal {
  constructor(value,kind,ctx) {
    super(value, kind || "choice", ctx);
  }

}

export function choice(...nodes) {
  return () => {new Choice([...nodes])};
}

