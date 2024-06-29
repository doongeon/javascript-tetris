import { Game } from "../class";

export default function renderStartBtn() {
  const gameGUI = document.getElementById("gameGUI");
  const startBtn = document.createElement("button");
  const game = new Game();
  const onClickStart = () => {
    const startBtn = document.getElementById("startBtn");
    startBtn!.style.visibility = "hidden";
    game.start();
  };

  startBtn.id = "startBtn";
  startBtn.innerText = "start";
  startBtn.classList.add("button");
  startBtn.addEventListener("click", onClickStart);
  gameGUI!.appendChild(startBtn);
}
