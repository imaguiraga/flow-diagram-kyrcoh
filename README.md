# react-kyrcoh

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/react-kyrcoh)

# ID generation

Use an hierarchical id generation scheme, where every order indicate a new depth

i.e: a -> b -> c yields
         b -> d
a = 0, b = 0.0, c = 0.0.0, d = 0.0.1

- create custom shape from node properties
- dynamically redraw the diagram based on when the state change
- leverage layout and rendering functionalities.