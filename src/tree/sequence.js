import {NonTerminal,Terminal} from "./terminal.js"

export class Sequence extends NonTerminal {
  constructor(value,ctx,kind) {
    super(value,ctx,kind ||"sequence");
  }

}

export function sequence(...nodes) {
  return new Sequence([...nodes]);
}
