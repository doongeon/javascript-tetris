export default function renderStars(n: number) {
  const gameBackground = document.getElementById("gameBackground");
  [...new Array(n)].map((__) => {
    const star = document.createElement("div");
    star.classList.add("star");
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 2}s`;

    gameBackground?.appendChild(star);
  });
}
