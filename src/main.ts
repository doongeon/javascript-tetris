import "./main.css";
import { renderStars, renderCells, renderStartBtn } from "./components";

// Add event listener for keydown event inside iframe
document.addEventListener("keydown", function (event: KeyboardEvent) {
  const keysToBlock = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "];

  if (keysToBlock.includes(event.key)) {
    // Send message to parent window to block scrolling
    window.parent.postMessage(
      "block-keys",
      "https://df64ytwdcjyj9.cloudfront.net"
    );
    console.log("scroll");
  }
});

renderStars(100);
renderCells();
renderStartBtn();
