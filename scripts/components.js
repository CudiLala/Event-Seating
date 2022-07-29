class Component {
  static #components = {};
  #name;
  #comp;

  constructor(type, name) {
    this.#name = name;
    this.#comp = document.createElementNS("http://www.w3.org/2000/svg", type);

    Component.#components[name] = {
      html: this.#comp,
      type: type,
      component: this,
    };

    this.#comp.addEventListener("click", () => {
      console.log("handle click");
    });
  }

  addAttributes(attirbutes) {
    for (let key in attirbutes) {
      Component.#components[this.#name].html.setAttribute(key, attirbutes[key]);
    }

    return this;
  }

  /**
   * @param {string} name
   * @returns {Component}
   */
  static get(name) {
    return Component.#components[name].component;
  }

  /**
   * @returns {Element}
   */
  html() {
    return Component.#components[this.#name].html;
  }
}
