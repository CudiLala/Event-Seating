let sizeForm = document.getElementById("size-form");
let resizeForm = document.getElementById("resize-form");
let zoomScale = document.getElementById("zoom-scale");
let board = document.querySelector(".board-container svg");
let toolNew = document.querySelector("[tool-button=new]");
let toolTable = document.querySelector("[tool-button=table]");

window.addEventListener("DOMContentLoaded", () => {
  App.init();
});
