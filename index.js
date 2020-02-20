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

let selectClause = () => sequence(a, b, repeat(optional("c")), zeroOrMore("d"));
let fromClause = () => choice("1", "2", selectClause, "4");

let testflow = choice(
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

//let testflow = choice(terminal("a"), choice("e", "d"));
//let testflow = choice("e", "d");
//let testflow = sequence("b", "c");
// testflow = repeat(terminal("b"));
// testflow = fromClause();
console.log(testflow);
const data = testflow.toG6();
console.log(JSON.stringify(data));

let graph = flowgraph("container");
graph.data(data);
console.log(graph);
graph.render();
