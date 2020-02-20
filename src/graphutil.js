import G6 from "@antv/g6";
import {lighten,darken,contrast} from "less"

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
        /*
        if (cfg.name) {
          group.addShape("text", {
            attrs: {
              text: cfg.name,
              x: 0,
              y: 0,
              fill: cfg.style.textColor || "#00287E",
              fontSize: 14,
              textAlign: "center",
              textBaseline: "middle",
              fontWeight: "bold"
            },
            name: "text-shape"
          });
        }//*/
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

export function flowgraph(containerId){

  const width = document.getElementById(containerId).scrollWidth;
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
  const getNodeConfig = function(node) {
      let stroke = null;
      let fill = null;
      let textColor = graph.cfg.defaultNode.style.textColor;
      switch(node.model.kind){
        case "choice.start":
        case "choice.finish":
          fill = "#7e3ff2";
          stroke = "#5300e8";
          textColor = "#FFFFFF";
        break;
        case "optional.start":
        case "optional.finish":
          fill = "#aaf255";
          stroke = "#61d800";
          textColor = "#FFFFFF";
        break;
        case "repeat.start":
        case "repeat.finish":
          fill = "#df55f2";
          stroke = "#ba00e5";
          textColor = "#FFFFFF";
        break;
        default:
        break;
      }
      // Compute stroke and textColor
      return {
        label: node.id,
        style: {
          stroke ,
          fill,
          textColor
        },
        labelCfg: {
          style: {
            fill: textColor,
            fontSize: 14,
          }
        }
      };
    };
  graph.node(getNodeConfig);

  return graph;
}