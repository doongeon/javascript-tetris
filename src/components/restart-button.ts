import { Game } from "../class";

const onClickRestart = () => {
  const restartBtn = document.getElementById("restartBtn");
  if (!restartBtn) return;
  restartBtn.style.visibility = "hidden";
  const game = new Game();
  game.start();
};

export default function renderRestartBtn() {
  const gameGUI = document.getElementById("gameGUI");
  const restartBtn = document.createElement("button");
  restartBtn.id = "restartBtn";
  restartBtn.innerText = "again?";
  restartBtn.classList.add("button");
  restartBtn.addEventListener("click", onClickRestart);
  gameGUI?.appendChild(restartBtn);
}
