class ElementWarpper {
  constructor(type) {
    this.root = document.createElement(type);
  }

  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }

  appendChild(component) {
    this.root.appendChild(component.root);
  }
}

class TextWarpper {
  constructor(content) {
    this.root = document.createTextNode(content);
  }
}

export class Component {
  constructor() {
    this.props = Object.create(null);
    this.children = [];
    this._root = null;
  }

  setAttribute(name, value) {
    this.props[name] = value;
  }

  appendChild(component) {
    this.children.push(component);
  }

  get root() {
    if (!this._root) {
      this._root = this.render().root;
    }
    return this._root;
  }
}

export function createElement(type, attributes, ...children) {
  let e;
  if (typeof type === "string") {
    e = new ElementWarpper(type);
  } else {
    e = new type();
  }
  for (const p in attributes) {
    e.setAttribute(p, attributes[p]);
  }

  let insertChild = (children) => {
    for (const iterator of children) {
      if (typeof iterator === "string") {
        iterator = new TextWarpper(iterator);
      }
      if (typeof iterator === "object" && iterator instanceof Array) {
        insertChild(iterator);
      } else {
        e.appendChild(iterator);
      }
    }
  };
  insertChild(children);

  return e;
}

export function render(component, parentElement) {
  parentElement.appendChild(component.root);
}
