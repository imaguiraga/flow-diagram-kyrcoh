import {NonTerminal,Terminal} from "./terminal.js"

export class Sequence extends NonTerminal {
  constructor(value,kind,ctx) {
    super(value,kind ||"sequence", ctx);
  }

}

export function sequence(...nodes) {
  return new Sequence([...nodes]);
}
