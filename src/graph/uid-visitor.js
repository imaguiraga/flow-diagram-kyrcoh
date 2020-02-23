import Terminal from "../tree/terminal.js"
export class UIDVisitor {

  constructor(prefix){
    this._prefix = prefix || "UID";
  }

  visit(tree,filter){
    // Non terminal nodes have start and finish
    if( tree.kind !== "terminal"){
      tree.start.id = this._prefix + "." + tree.kind + ".start";
      tree.finish.id = this._prefix + "." + tree.kind + ".finish";
    }
    tree._nodes.filter(n => n instanceof Object).forEach((node,index) => {
        // keep only terminal nodes
        let p = this._prefix.concat("."+index);
        node.id = p + "." + node.kind;
        node.accept(new UIDVisitor(p),null);
      });
    return tree;
  }

}
