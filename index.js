import G6 from "@antv/g6";
import {
  repeat,
  sequence,
  optional,
  choice,
  zeroOrMore,
  terminal,
  Terminal
} from "./flow.js";
import { graphdata } from "./data.js";

let selectClause = () => sequence(a, b, repeat(optional("c")), zeroOrMore("d"));
let fromClause = () => choice("1", "2", selectClause, "4");

let test1 = choice(
  terminal("a"),
  choice("e", "d"),
  sequence(terminal("b"), terminal("c"))
);

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

let test2 = choice(terminal("a"), choice("e", "d"));
let test3 = choice("e", "d");
let test4 = sequence("b", "c");
let test5 = repeat(terminal("b"));
//let result = fromClause();
console.log(test5);
const data = test1.toG6();
console.log(JSON.stringify(data));

G6.registerNode(
  "sql",
  {
    drawShape(cfg, group) {
      const rect = group.addShape("rect", {
        attrs: {
          x: -75,
          y: -25,
          width: 150,
          height: 50,
          radius: 10,
          stroke: "#5B8FF9",
          fill: "#C6E5FF",
          lineWidth: 3
        },
        name: "rect-shape"
      });
      if (cfg.name) {
        group.addShape("text", {
          attrs: {
            text: cfg.name,
            x: 0,
            y: 0,
            fill: "#00287E",
            fontSize: 14,
            textAlign: "center",
            textBaseline: "middle",
            fontWeight: "bold"
          },
          name: "text-shape"
        });
      }
      return rect;
    }
  },
  "single-node"
);
G6.Global.nodeStateStyle.selected = {
  stroke: "#d9d9d9",
  fill: "#5394ef"
};

const width = document.getElementById("container").scrollWidth;
const height = document.getElementById("container").scrollHeight || 500;
const graph = new G6.Graph({
  container: "container",
  width,
  height,
  layout: {
    type: "dagre",
    nodesepFunc: d => {
      if (d.id === "3") {
        return 500;
      }
      return 50;
    },
    ranksep: 70
  },
  defaultNode: {
    type: "sql"
  },
  defaultEdge: {
    type: "polyline",
    style: {
      radius: 20,
      offset: 45,
      endArrow: true,
      lineWidth: 2,
      stroke: "#C2C8D5"
    }
  },
  modes: {
    default: ["drag-canvas", "zoom-canvas"]
  },
  fitView: true
});
graph.data(data);
console.log(graph);
graph.render();
