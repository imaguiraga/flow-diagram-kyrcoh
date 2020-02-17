import {
  repeat,
  sequence,
  optional,
  choice,
  zeroOrMore,
  terminal,
  Terminal,
  flowgraph
} from "./flow.js";
import { graphdata } from "./data.js";

let selectClause = () => sequence(a, b, repeat(optional("c")), zeroOrMore("d"));
let fromClause = () => choice("1", "2", selectClause, "4");

let testlow = choice(
  terminal("a"),
  choice("e", "d"),
  sequence(terminal("b"), terminal("c"))
);
//*/
/*
let selectClause = () => {
  return sequence(a, b, repeat(optional("c")), ZeroOrMore("d"));
};
//*/

/*
let selectClause = function() {
  return sequence(a, b, repeat(optional("c")));
};
//*/

function a() {
  return new Terminal("a");
}

function b() {
  return new Terminal("b");
}

//let testlow = choice(terminal("a"), choice("e", "d"));
//let testlow = choice("e", "d");
//let testlow = sequence("b", "c");
//let testlow = repeat(terminal("b"));
//let result = fromClause();
console.log(testlow);
const data = testlow.toG6();
console.log(JSON.stringify(data));

let graph = flowgraph("container");
graph.data(data);
console.log(graph);
graph.render();
