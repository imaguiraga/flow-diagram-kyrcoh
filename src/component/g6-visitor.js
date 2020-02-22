

export class G6Visitor {
  
  visit(tree,filter){
    switch(tree.kind){
      case "choice":
        return this.visitChoice(tree,filter);
      break;
      case "optional":
        return this.visitOptional(tree,filter);
      break;
      case "sequence":
        return this.visitSequence(tree,filter);
      break;
      case "repeat":
        return this.visitRepeat(tree,filter);
      break;
      case "terminal":
        return this.visitTerminal(tree,filter);
      break;

    }
    return null;
  }

  visitSequence(tree,filter){
    return SequenceG6Visitor.visit(this,tree,filter);
  }

  visitChoice(tree,filter){
    return ChoiceG6Visitor.visit(this,tree,filter);
  }

  visitOptional(tree,filter){
    return OptionalG6Visitor.visit(this,tree,filter);
  }

  visitRepeat(tree,filter){
    return RepeatG6Visitor.visit(this,tree,filter);
  }

  visitTerminal(tree,filter){
    return TerminalG6Visitor.visit(this,tree,filter);
  }
}


export class TerminalG6Visitor{
  static visit(visitor,tree,filter) {
    const data = {
      nodes: [],
      edges: []
    };

    let n = {
      id: tree.id,
      label: tree.id ,
      model: { 
        kind: 'terminal'
      }
    };
    if (filter) {
      if (!filter(n)) {
        data.nodes.push(n);
      }
    } else {
      data.nodes.push(n);
    }
    return data;
  }

}

export class SequenceG6Visitor{
  static visit(visitor,tree,filter) {
    const data = {
      nodes: [],
      edges: []
    };
    if (tree.kind !== "sequence") {
      return data;
    }
    // nodes
    if (tree.kind === "sequence") {
      tree._nodes.forEach(node => {
        // keep only terminal nodes
        if (node.kind !== "terminal") {
          return;
        }
        let n = {
          id: node.id,
          label: node.id,
          model: { 
            kind: 'sequence.terminal'
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
    // edges
    for (let i = 0; i < tree._nodes.length - 1; i++) {
      data.edges.push({
        source: tree._nodes[i].finish.id,
        target: tree._nodes[i + 1].start.id
      });
    }
    // concatenate G6 graphs

    tree._nodes.forEach(node => {
      let g6 = node.accept(visitor,n => tree.foundNode(n));
      if(g6 !== null) {
        data.nodes = data.nodes.concat(g6.nodes);
        data.edges = data.edges.concat(g6.edges);
      }
    });

    return data;
  }
}

export class ChoiceG6Visitor{
  static visit(visitor,tree,filter){

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
      let g6 = node.accept(visitor,n => tree.foundNode(n));
      if(g6 !== null) {
        data.nodes = data.nodes.concat(g6.nodes);
        data.edges = data.edges.concat(g6.edges);
      }
    });

    return data;
  }
  
}

export class OptionalG6Visitor{
  static visit(visitor,tree,filter) {
    const data = {
      nodes: [],
      edges: []
    };
    if (tree.kind !== "optional") {
      return data;
    }
    // start + finish nodes
    data.nodes.push({
      id: tree.start.id,
      label: tree.start.id ,
      model: { 
        kind: 'optional.start'
      }
    });

    // nodes
    debugger;
    if (tree.kind === "optional") {
      tree._nodes.forEach(node => {
        // keep only terminal nodes
        if (node.kind !== "terminal") {
          return;
        }
        let n = {
          id: node.id,
          label: node.id ,
          model: { 
            kind: 'optional.terminal'
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
        kind: 'optional.finish'
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

    data.edges.push({
      source: tree.start.id,
      target: tree.finish.id
    });
    // concatenate G6 graphs

    tree._nodes.forEach(node => {
      let g6 = node.accept(visitor,n => tree.foundNode(n));
      if(g6 !== null) {
        data.nodes = data.nodes.concat(g6.nodes);
        data.edges = data.edges.concat(g6.edges);
      }
    });

    return data;
  }
}

export class RepeatG6Visitor{
  static visit(visitor,tree,filter) {
    const data = {
      nodes: [],
      edges: []
    };
    if (tree.kind !== "repeat") {
      return data;
    }
    // start + finish nodes
    data.nodes.push({
      id: tree.start.id,
      label: tree.start.id,
      model: { 
        kind: 'repeat.start'
      }
    });

    // nodes
    if (tree.kind === "repeat") {
      tree._nodes.forEach(node => {
        // keep only terminal nodes
        if (node.kind !== "terminal") {
          return;
        }
        let n = {
          id: node.id,
          label: node.id ,
          model: { 
            kind: 'repeat.terminal'
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
      label: tree.finish.id,
      model: { 
        kind: 'repeat.finish'
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

    data.edges.push({
      source: tree.finish.id,
      target: tree.start.id
    });
    // concatenate G6 graphs

    this._nodes.forEach(node => {
      let g6 = node.accept(visitor,n => tree.foundNode(n));
      if(g6 !== null) {
        data.nodes = data.nodes.concat(g6.nodes);
        data.edges = data.edges.concat(g6.edges);
      }
    });
    return data;
  }
}