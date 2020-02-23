import {
  repeat,
  sequence,
  optional,
  choice,
  zeroOrMore,
  terminal,
  Terminal,
  flowgraph,
  G6Visitor
} from "./src/flow.js";

import * as flow from "./src/flow.js";

let selectClause = () => sequence(a, b, repeat(optional("c")), zeroOrMore("d"));
let fromClause = () => choice("1", "2", selectClause, "4");

let testflow = choice(
  terminal("a"),
  choice("e", "d"),
  sequence(terminal("b"), terminal("c"))
);
//*/
// Generate flow by parsing javascript text
let f = new Function("module",`const {
    repeat,
    sequence,
    optional,
    choice,
    zeroOrMore,
    terminal
  } = module;
  let f = () => {
    return choice("a", "b", repeat(optional("c")));
  };
  return f;`);

testflow = f(flow)();

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

let testf = new Function('return choice("1", "2", selectClause, "4");');
//let testflow = choice(terminal("a"), choice("e", "d"));
//let testflow = choice("e", "d");
//let testflow = sequence("b", "c");
// testflow = repeat(terminal("b"));
// testflow = fromClause();
console.log(testflow);
const visitor = new G6Visitor();
const data = visitor.visit(testflow);
console.log(JSON.stringify(data));

let graph = flowgraph("container");
graph.data(data);
console.log(graph);
graph.render();
