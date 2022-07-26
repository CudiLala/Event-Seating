let appState = JSON.parse(localStorage.getItem("appState")) || {
  display: "form",
  arenaSize: [0, 0],
  scale: 1,
};

let displayMap = {
  board: "board",
  form: "form-container",
};

function setDisplay(display) {
  appState.display = display;

  for (let key in displayMap) {
    if (display == key) {
      document.getElementById(displayMap[key]).style.display = "flex";
    } else {
      document.getElementById(displayMap[key]).style.display = "none";
    }
  }

  localStorage.setItem("appState", JSON.stringify(appState));
}

function setArenaSize([width, height]) {
  appState.arenaSize = [width, height];
  localStorage.setItem("appState", JSON.stringify(appState));
  draw();
}

function draw() {
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute(
    "viewBox",
    `0 0 ${appState.arenaSize[0]} ${appState.arenaSize[1]}`
  );
  svg.style.position = "absolute";

  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("width", appState.arenaSize[0]);
  rect.setAttribute("height", appState.arenaSize[1]);
  rect.setAttribute("stroke", "black");
  rect.setAttribute("fill", "transparent");
  rect.setAttribute("stroke-width", "2px");

  svg.append(rect);

  console.log(svg);

  let arena = document.getElementById("arena");
  let prevSvg = arena.getElementsByTagName("svg").item(0);

  if (prevSvg) prevSvg.replaceWith(svg);
  else document.getElementById("arena").append(svg);
}

function run() {
  setDisplay(appState.display);
  setArenaSize(appState.arenaSize);

  draw();
}

run();
