export function renderRoundPopup(round: number, roundSkipCount?: number) {
  const gameGUI = document.getElementById("gameGUI");
  const roundPopup = document.createElement("div");
  roundPopup.id = "roundPopup";
  if (roundSkipCount && roundSkipCount > 1) {
    roundPopup.innerHTML = `<span>round ${round}</span><span class="rainbow-text">${roundSkipCount}up!</span>`;
  } else {
    roundPopup.innerHTML = `<span>round ${round}</span>`;
  }

  roundPopup.classList.add("popup");
  gameGUI?.appendChild(roundPopup);
}

export function removeRoundPopup() {
  const roundPopup = document.getElementById("roundPopup");
  if (!roundPopup) return;
  roundPopup.parentElement?.removeChild(roundPopup);
}
