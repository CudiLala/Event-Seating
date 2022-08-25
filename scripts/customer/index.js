let board = document.getElementById("board");
let zoomScaleUp = document.getElementById("zoom-scale-up");
let zoomScaleDown = document.getElementById("zoom-scale-down");
let boardBox = document.getElementById("board-box");
let seatClipBoard = document.getElementById("seat-clipboard");

let selectedBtn = document.getElementById("selected-btn");
let infoBtn = document.getElementById("info-btn");
let selectedCount = document.getElementById("selected-count");
let infoCount = document.getElementById("info-count");
let selectedModal = document.getElementById("selected-modal");
let infoModal = document.getElementById("info-modal");

window.addEventListener("DOMContentLoaded", () => {
  Map.init();
  infoBtn.focus();
});
