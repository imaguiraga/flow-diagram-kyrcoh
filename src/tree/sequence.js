import {NonTerminal,Terminal} from "./terminal.js"

export class Sequence extends NonTerminal {
  constructor(values,ctx,kind) {
    super(values,ctx,kind ||"sequence");
  }

}

export function sequence(...nodes) {
  return new Sequence([...nodes]);
}
