board.addEventListener("click", (e) => {
  Lib.removeSeatClipboard();
});
boardBox.addEventListener("scroll", () => {
  Lib.removeSeatClipboard();
});

zoomScaleUp?.addEventListener("click", () => {
  State.scale += 0.04;
  Lib.removeSeatClipboard();
});
zoomScaleUp?.addEventListener("mousedown", () => {
  Lib.startContinousScaleUpAfter500ms();
});
zoomScaleUp?.addEventListener("mouseup", () => {
  Lib.stopContinousScale();
});
zoomScaleUp?.addEventListener("mouseleave", () => {
  //implemented this due to chrome bugs
  Lib.stopContinousScale();
});

zoomScaleDown?.addEventListener("click", () => {
  State.scale -= 0.04;
  Lib.removeSeatClipboard();
});
zoomScaleDown?.addEventListener("mousedown", () => {
  Lib.startContinousScaleDownAfter500ms();
});
zoomScaleDown?.addEventListener("mouseup", () => {
  Lib.stopContinousScale();
});
zoomScaleDown?.addEventListener("mouseleave", () => {
  //implemented this due to chrome bugs
  Lib.stopContinousScale();
});

checkoutBtn.addEventListener("click", () => {
  if (checkoutBtn.classList.contains("disabled")) console.log("disabled");
});

backBtn.addEventListener("click", () => {
  window.history.back();
});
