let root = document.documentElement;
let sizeForm = document.getElementById("size-form");
let resizeForm = document.getElementById("resize-form");
let board = document.getElementById("board");
let boardBox = document.getElementById("board-box");
let sideBarBody = document.getElementById("side-bar-body");
let header = document.getElementById("header");
let zoomScaleUp = document.getElementById("zoom-scale-up");
let zoomScaleDown = document.getElementById("zoom-scale-down");

//tools
let toolNew = document.getElementById("tool-new");
let toolArea = document.getElementById("tool-area");
let toolRow = document.getElementById("tool-row");
let toolToggleFullscreen = document.getElementById("tool-toggle-fullscreen");
let toolGenerateJson = document.getElementById("tool-generate-json");
let toolForm = document.getElementById("tool-form");

window.addEventListener("DOMContentLoaded", () => {
  App.init();
});
