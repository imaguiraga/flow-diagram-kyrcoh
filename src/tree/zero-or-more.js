import {optional} from "./optional.js"
import {repeat} from "./repeat.js"

export function zeroOrMore(elt,ctx) {
  return optional(repeat(elt),ctx);
}