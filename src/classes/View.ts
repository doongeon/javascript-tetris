import { Map } from "./Map";

export class View {
  map: Map;

  constructor(map: Map) {
    this.map = map;
  }

  draw() {
    this.clearView();
    this.colorView();
    console.log("frame");
  }

  colorView() {
    const cells = document.getElementsByClassName("cell");

    for (let i = 0; i < this.map.grid.length; i++) {
      for (let j = 0; j < this.map.grid[0].length; j++) {
        if (this.map.grid[i][j] === 0) continue;
        cells[this.map.grid[0].length * i + j].classList.add("red");
      }
    }
  }

  clearView() {
    const cells = document.getElementsByClassName("cell");

    for (let i = 0; i < this.map.grid.length; i++) {
      for (let j = 0; j < this.map.grid[0].length; j++) {
        cells[this.map.grid[0].length * i + j].classList.remove("red");
      }
    }
  }
}
