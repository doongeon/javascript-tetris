import { Map } from "./Map";
import { TetrisBlock } from "./TetrisBlock";

export class View {
  public static draw(map: Map) {
    this.clearView(map);
    this.colorView(map);
    console.log("frame");
  }

  private static colorView(map: Map) {
    const cells = document.getElementsByClassName("cell");

    for (let i = 0; i < map.grid.length; i++) {
      for (let j = 0; j < map.grid[0].length; j++) {
        if (map.grid[i][j] === 0) continue;
        cells[map.grid[0].length * i + j].classList.add("red");
      }
    }
  }

  private static clearView(map: Map) {
    const cells = document.getElementsByClassName("cell");

    for (let i = 0; i < map.grid.length; i++) {
      for (let j = 0; j < map.grid[0].length; j++) {
        cells[map.grid[0].length * i + j].classList.remove("red");
      }
    }
  }

  public static writeTime(time: string) {
    const timeWindow = document.getElementById("time");
    if (timeWindow) timeWindow.innerText = time;
  }

  public static writeRound(round: number) {
    const roundWindow = document.getElementById("round");
    if (roundWindow) roundWindow.innerText = round + "";
  }

  public static writeScore(score: number) {
    const scoreWindow = document.getElementById("score");
    if (scoreWindow) scoreWindow.innerText = score + "";
  }

  public static drawPreview(tetrisBlock: TetrisBlock) {
    const preview = document.getElementById("preview");
    if (!preview) return;
    preview.innerHTML = "";

    const blockHeight = tetrisBlock.shape.length;
    const blockWidth = tetrisBlock.shape[0].length;

    if (blockWidth === 4) {
      preview.style.display = "grid";
      preview.style.gridTemplateColumns = "repeat(4, 1fr)";
    }

    if (blockWidth === 3) {
      preview.style.display = "grid";
      preview.style.gridTemplateColumns = "repeat(3, 1fr)";
    }

    if (blockWidth === 2) {
      preview.style.display = "grid";
      preview.style.gridTemplateColumns = "repeat(2, 1fr)";
    }

    for (let i = 0; i < blockHeight; i++) {
      for (let j = 0; j < blockWidth; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        if (tetrisBlock.shape[i][j] === 1) {
          cell.classList.add("red");
        }

        preview.appendChild(cell);
      }
    }
  }
}
