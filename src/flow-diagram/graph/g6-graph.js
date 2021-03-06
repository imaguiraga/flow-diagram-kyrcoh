import G6 from "@antv/g6";

const flowEltNodeOptions =    {
      drawShape(cfg, group) {
        const rect = group.addShape("rect", {
          attrs: {
            x: -75,
            y: -25,
            width: 150,
            height: 50,
            radius: 10,
            stroke: cfg.style.stroke || "#5B8FF9",
            fill: cfg.style.fill || "#C6E5FF",
            lineWidth: 3
          },
          name: "rect-shape"
        });

        return rect;
      }
    };

  G6.registerNode(
    "flow-elt", flowEltNodeOptions, "single-node"
  );
  G6.Global.nodeStateStyle.selected = {
    stroke: "#d9d9d9",
    fill: "#5394ef"
  };

export function createFlowGraph(containerId){

  const width = document.getElementById(containerId).scrollWidth || 500;
  const height = document.getElementById(containerId).scrollHeight || 500;
  const graphOptions = {
    container: containerId,
    width,
    height,
    layout: {
      type: "dagre",
      nodesepFunc: (d) => {
        return 50;
      },
      ranksep: 70
    },
    defaultNode: {
      type: "flow-elt",
      style: {
        stroke:"#5B8FF9",
        fill: "#C6E5FF",
        textColor: "#00287E"
      },
      labelCfg: {
        style: {
          fontSize: 14,
        }
      }
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
      default: ["drag-canvas", "zoom-canvas", "drag-node"]
    },
    fitView: true
  };
  const graph = new G6.Graph(graphOptions);

// Override node default config based on nodde.kind
 
  const NODE_KIND_CFG = new Map([
    // Choice
    ["choice.start", {
      style: {
        fill: "#7e3ff2",
        stroke: "#5300e8"
      },
      labelCfg: {
        style: {
          fill: "#FFFFFF"
        }
      }
    }],
    ["choice.finish", {
      style: {
        fill: "#7e3ff2",
        stroke: "#5300e8"
      },
      labelCfg: {
        style: {
          fill: "#FFFFFF"
        }
      }
    }],
    // Sequence
    ["sequence.start", {
      style: {
        fill: "#7e3ff2",
        stroke: "#5300e8"
      },
      labelCfg: {
        style: {
          fill: "#FFFFFF"
        }
      }
    }],
    ["sequence.finish", {
      style: {
        fill: "#7e3ff2",
        stroke: "#5300e8"
      },
      labelCfg: {
        style: {
          fill: "#FFFFFF"
        }
      }
    }],
    // Optional 
    ["optional.start", {
      style: {
        fill: "#aaf255",
        stroke: "#61d800"
      },
      labelCfg: {
        style: {
          fill: "#FFFFFF"
        }
      }
    }],
    ["optional.finish", {
      style: {
        fill: "#aaf255",
        stroke: "#61d800"
      },
      labelCfg: {
        style: {
          fill: "#FFFFFF"
        }
      }
    }],
    // Repeat
    ["repeat.start", {
      style: {
        fill: "#df55f2",
        stroke: "#ba00e5"
      },
      labelCfg: {
        style: {
          fill: "#FFFFFF"
        }
      }
    }],
    ["repeat.finish", {
      style: {
        fill: "#df55f2",
        stroke: "#ba00e5"
      },
      labelCfg: {
        style: {
          fill: "#FFFFFF"
        }
      }
    }]
  ]);

  const getNodeConfig = function(node) {
    // Compute stroke and textColor
    if(NODE_KIND_CFG.has(node.model.kind)) {
      return NODE_KIND_CFG.get(node.model.kind);
    }

    return {};
  };
  graph.node(getNodeConfig);

  return graph;
}