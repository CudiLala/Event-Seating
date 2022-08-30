let board = document.getElementById("board");
let zoomScaleUp = document.getElementById("zoom-scale-up");
let zoomScaleDown = document.getElementById("zoom-scale-down");
let boardBox = document.getElementById("board-box");
let seatClipBoard = document.getElementById("seat-clipboard");

let infoBtn = document.getElementById("info-btn");
let infoCount = document.getElementById("info-count");
let infoModal = document.getElementById("info-modal");
let checkoutBtn = document.getElementById("checkout-btn");

let maximumSeatSelection = 2;

window.addEventListener("DOMContentLoaded", () => {
  Map.init();
  infoBtn.focus();
});
