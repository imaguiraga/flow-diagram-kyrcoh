import {NonTerminal,Terminal} from "./terminal.js"

export class Sequence extends NonTerminal {
  constructor(elts,ctx,kind) {
    super(elts,ctx,kind ||"sequence");
  }

}

export function sequence(...elts) {
  return new Sequence([...elts]);
}
