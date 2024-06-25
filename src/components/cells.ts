export function renderCells(rowCount: number, columnCount: number) {
  const gameGUI = document.getElementById("gameGUI");

  const cell = document.createElement("div");
  cell.classList.add("cell");

  [...new Array(rowCount * columnCount)].map((__) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");

    gameGUI?.appendChild(cell);
  });
}