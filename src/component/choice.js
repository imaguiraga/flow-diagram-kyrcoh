import {NonTerminal,Terminal} from "./terminal.js"

export class Choice extends NonTerminal {
  constructor(value) {
    super(value, "choice");
    this.type = "choice";
  }
  toG6(filter) {
    return ChoiceG6Visitor.visit(this,filter);
  }
}

export function choice(...nodes) {
  return new Choice(nodes);
}

export class ChoiceG6Visitor{
  static visit(tree,filter){

    const data = {
      nodes: [],
      edges: []
    };
    //
    if (tree.kind !== "choice") {
      return data
    }
    // start + finish nodes
    data.nodes.push({
      id: tree.start.id,
      label: tree.start.id,
      model: { 
        kind: 'choice.start'
      }
    });

    // nodes
    if (tree.kind === "choice") {
      tree._nodes.forEach(node => {
        // keep only terminal nodes
        if (node.kind !== "terminal") {
          return;
        }
        let n = {
          id: node.id,
          label: node.id,
          model: { 
            kind: 'choice.terminal'
          }
        };

        if (filter) {
          if (!filter(n)) {
            data.nodes.push(n);
          }
        } else {
          data.nodes.push(n);
        }
      });
    }
    data.nodes.push({
      id: tree.finish.id,
      label: tree.finish.id ,
      model: { 
        kind: 'choice.finish'
      }
    });
    // edges
    for (let i = 0; i < tree._nodes.length; i++) {
      data.edges.push({
        source: tree.start.id,
        target: tree._nodes[i].start.id
      });
      data.edges.push({
        source: tree._nodes[i].finish.id,
        target: tree.finish.id
      });
    }
    // concatenate G6 graphs

    tree._nodes.forEach(node => {
      let g6 = node.toG6(n => tree.foundNode(n));
      data.nodes = data.nodes.concat(g6.nodes);
      data.edges = data.edges.concat(g6.edges);
    });

    return data;
  }
  
}
