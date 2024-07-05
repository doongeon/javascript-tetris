import "./main.css";
import { renderStars, renderCells, renderStartBtn } from "./components";

const handleKeyDown = (event: KeyboardEvent) => {
  const { key } = event;
  if (
    key === "ArrowUp" ||
    key === "ArrowDown" ||
    key === "ArrowLeft" ||
    key === "ArrowRight" ||
    key === " "
  ) {
    event.preventDefault();
  }
};

window.addEventListener("keydown", handleKeyDown);

renderStars(100);
renderCells();
renderStartBtn();
