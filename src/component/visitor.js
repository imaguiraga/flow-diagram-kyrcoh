export default class G6Visitor {
  visit(tree,filter){
    switch(tree.kind){
      case "choice":
        return visitChoice(tree,filter);
      break;
      case "optional":
        return visitOptional(tree,filter);
      break;
      case "sequence":
        return visitSequence(tree,filter);
      break;
      case "repeat":
        return visitRepeat(tree,filter);
      break;
      case "terminal":
        return visitTerminal(tree,filter);
      break;

    }
    return null;
  }

  visitSequence(tree,filter){
    return SequenceG6Visitor.visit(tree,filter);
  }

  visitChoice(tree,filter){
    return ChoiceG6Visitor.visit(tree,filter);
  }

  visitOptional(tree,filter){
    return OptionalG6Visitor.visit(tree,filter);
  }

  visitRepeat(tree,filter){
    return RepeatG6Visitor.visit(tree,filter);
  }

  visitTerminal(tree,filter){
    return TerminalG6Visitor.visit(tree,filter);
  }
}