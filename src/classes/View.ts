import { Grid } from "./Grid";
import { TetrisBlock } from "./TetrisBlock";

export class View {
  public static draw(grid: Grid) {
    this.clearView();
    this.colorView(grid);
  }

  private static colorView(grid: Grid) {
    const cells = document.getElementsByClassName("cell");

    for (let i = 0; i < grid.grid.length; i++) {
      for (let j = 0; j < grid.grid[0].length; j++) {
        const currentCell = cells[grid.grid[0].length * i + j];
        switch (grid.grid[i][j]) {
          case 0:
            continue;
          case 1:
            currentCell.classList.add("red");
            break;
          case 2:
            currentCell.classList.add("orange");
            break;
          case 3:
            currentCell.classList.add("yellow");
            break;
          case 4:
            currentCell.classList.add("green");
            break;
          case 5:
            currentCell.classList.add("blue");
            break;
        }

        // if (grid.grid[i][j] === 0) continue;

        // if()
        // cells[grid.grid[0].length * i + j].classList.add("red");
      }
    }
  }

  private static clearView() {
    const gameGUI = document.getElementById("gameGUI");
    const cells = gameGUI!.querySelectorAll<HTMLDivElement>(".cell");

    cells.forEach((cell) => {
      ["red", "orange", "yellow", "green", "blue"].forEach((color) => {
        cell.classList.remove(color);
      });
    });
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
    preview.innerHTML = ""; //  전 블록 지우기

    const blockHeight = tetrisBlock.shape.length;
    const blockWidth = tetrisBlock.shape[0].length;

    if (blockWidth === 4) {
      preview.style.display = "grid";
      preview.style.width = `${32 * 4}px`;
      preview.style.gridTemplateColumns = "repeat(4, 1fr)";
    }

    if (blockWidth === 3) {
      preview.style.display = "grid";
      preview.style.width = `${32 * 3}px`;
      preview.style.gridTemplateColumns = "repeat(3, 1fr)";
    }

    if (blockWidth === 2) {
      preview.style.display = "grid";
      preview.style.width = `${32 * 2}px`;
      preview.style.gridTemplateColumns = "repeat(2, 1fr)";
    }

    for (let i = 0; i < blockHeight; i++) {
      for (let j = 0; j < blockWidth; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        switch (tetrisBlock.shape[i][j]) {
          case 0:
            break;
          case 1:
            cell.classList.add("red");
            break;
          case 2:
            cell.classList.add("orange");
            break;
          case 3:
            cell.classList.add("yellow");
            break;
          case 4:
            cell.classList.add("green");
            break;
          case 5:
            cell.classList.add("blue");
        }

        preview.appendChild(cell);
      }
    }
  }
}
