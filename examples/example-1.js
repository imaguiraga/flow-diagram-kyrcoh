import {
  repeat,
  sequence,
  optional,
  choice,
  zeroOrMore,
  terminal,
  createFlowGraph,
  G6Visitor
} from "../src/flow-export.js";

let testflow = choice(terminal("a"), choice("e", "d"));

const visitor = new G6Visitor();
const data = visitor.visit(testflow);

let graph = createFlowGraph("container");
graph.data(data);
graph.render();
