let board = document.getElementById("board");
let zoomScaleUp = document.getElementById("zoom-scale-up");
let zoomScaleDown = document.getElementById("zoom-scale-down");
let boardBox = document.getElementById("board-box");
let seatClipBoard = document.getElementById("seat-clipboard");
let backBtn = document.getElementById("btn-back");

let checkoutBtn = document.getElementById("checkout-btn");

let maximumSeatSelection = 2;

window.addEventListener("DOMContentLoaded", () => {
  Map.init();
  State.scale = 1;
  State.scale = 2;
});
