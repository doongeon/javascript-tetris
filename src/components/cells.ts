import { COLUMN_COUNTS, ROW_COUNTS } from "../Constants";

export default function renderCells() {
  const gameGUI = document.getElementById("gameGUI");
  gameGUI!.style.gridTemplateColumns = `repeat(${COLUMN_COUNTS}, 1fr)`;
  gameGUI!.style.gridTemplateRows = `repeat(${ROW_COUNTS}, 1fr)`;
  const cell = document.createElement("div");
  cell.classList.add("cell");

  [...new Array(ROW_COUNTS * COLUMN_COUNTS)].map((__) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");

    gameGUI?.appendChild(cell);
  });
}
