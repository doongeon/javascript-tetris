import "./style.css";
import "./styles/background.css";
import "./styles/button.css";
import { COLUMN_COUNTS, ROW_COUNTS } from "./classes/Constants.ts";
import { renderStars } from "./components/stars.ts";
import { renderCells } from "./components/cells.ts";
import { Game } from "./classes/Game.ts";

const game = new Game();

renderStars(100);
renderCells(ROW_COUNTS, COLUMN_COUNTS);

const onClick = () => {
  const startBtn = document.getElementById("startBtn");
  const image = document.getElementById("image");
  if (!startBtn) return;
  startBtn.style.visibility = "hidden";
  image!.style.visibility = "hidden";
  setTimeout(() => {
    game.startRound();
  }, 1000);
};

function renderStartBtn() {
  const gameGUI = document.getElementById("gameGUI");
  const startBtn = document.createElement("button");
  startBtn.id = "startBtn";
  startBtn.innerText = "start";
  startBtn.classList.add("button");
  startBtn.addEventListener("click", onClick);
  gameGUI?.appendChild(startBtn);
}

renderStartBtn();
