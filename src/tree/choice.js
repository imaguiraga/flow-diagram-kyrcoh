import {NonTerminal,Terminal} from "./terminal.js"

export class Choice extends NonTerminal {
  constructor(values,ctx,kind)  {
    super(values,ctx,kind || "choice");
  }

}

export function choice(...nodes) {
  return new Choice([...nodes]);
}

