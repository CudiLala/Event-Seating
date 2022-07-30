class SVGComponent {
  static #components = {};
  #name;
  #comp;
  #selected;

  constructor(type, name) {
    this.#name = name;
    this.#comp = document.createElementNS("http://www.w3.org/2000/svg", type);

    SVGComponent.#components[name] = {
      html: this.#comp,
      type: type,
      component: this,
    };

    this.#comp.addEventListener("click", (ev) => {
      ev.stopPropagation();
      this.select();
    });

    this.addAttributes({
      name,
    });
  }

  addAttributes(attirbutes) {
    for (let key in attirbutes) {
      SVGComponent.#components[this.#name].html.setAttribute(
        key,
        attirbutes[key]
      );
    }

    return this;
  }

  /**
   * @param {string} name
   * @returns {Component}
   */
  static get(name) {
    return SVGComponent.#components[name].component;
  }

  /**
   * @returns {Element}
   */
  html() {
    return SVGComponent.#components[this.#name].html;
  }

  select() {
    this.#selected = !this.#selected;
    if (this.#selected) this.addAttributes({ stroke: "#1760fd" });
    else this.addAttributes({ stroke: "black" });
  }
}
