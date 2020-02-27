import {NonTerminal,Terminal} from "./terminal.js"

export class Choice extends NonTerminal {
  constructor(value,ctx,kind)  {
    super(value,ctx,kind || "choice");
  }

}

export function choice(...nodes) {
  return new Choice([...nodes]);
}

