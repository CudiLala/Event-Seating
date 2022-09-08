class App {
  static async init() {
    let queries = new URLSearchParams(window.location.search);
    let pvId = queries.get("pvId");
    let mapId = queries.get("mapId");

    if (pvId == null) {
      pvId = 1;
      window.location.href = `?pvId=${pvId}`;
    } else if (mapId == null) {
      State.init(false);

      let res = await fetch(`http://localhost:5000/seatingMaps?pvId=${pvId}`, {
        method: "GET",
      });
      let data = await res.json();
      sideBarBody.innerHTML = "";
      sideBarBody.append(Component.venueMapLinks(data));
    } else {
      let res = await fetch(`http://localhost:5000/seatingMaps/${mapId}`, {
        method: "GET",
      });
      let data = await res.json();

      State.init(true);
      Board.init({ size: data.size, content: data.content });
    }
  }

  static renew() {
    let pvId = new URLSearchParams(window.location.search).get("pvId");
    window.location.href = `?pvId=${pvId}`;
  }
}
