class SVGComponent {
  static #components = {};
  #name;
  #comp;
  #selected;
  #selectFn;
  #deselectFn;

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
   * @returns {SVGComponent}
   */
  static get(name) {
    return SVGComponent.#components[name].component;
  }

  /**
   * @returns {SVGElement}
   */
  html() {
    return SVGComponent.#components[this.#name].html;
  }

  select() {
    this.#selected = true;
    this.addAttributes({ stroke: "#1760fd" });
    if (this.#selectFn) this.#selectFn();
  }

  deselect() {
    this.#selected = false;
    this.addAttributes({ stroke: "black" });
    if (this.#deselectFn) this.#deselectFn();
  }

  onselect(fn) {
    this.#selectFn = fn;

    return this;
  }

  static deselectAll(args = { except: null }) {
    for (let svgComponent in this.#components) {
      if (svgComponent != args.except)
        this.#components[svgComponent].component.deselect();
    }
  }
}
