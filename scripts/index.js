let sizeForm = document.getElementById("size-form");
let resizeForm = document.getElementById("resize-form");
let zoomScale = document.getElementById("zoom-scale");
let board = document.querySelector(".board-container svg");
let sideBarBody = document.getElementById("side-bar-body");
let header = document.getElementById("header");

//tools
let toolNew = document.getElementById("tool-new");
let toolArea = document.getElementById("tool-area");
let toolTable = document.getElementById("tool-table");
let toolChair = document.getElementById("tool-chair");
let toolStand = document.getElementById("tool-stand");
let toolStage = document.getElementById("tool-stage");
let toolBar = document.getElementById("tool-bar");
let toolGenerateJson = document.getElementById("tool-generate-json");
let toolForm = document.getElementById("tool-form");

window.addEventListener("DOMContentLoaded", () => {
  App.init();
});
