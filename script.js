const TOTAL = 25;

const deck = document.getElementById("deck");

for (let i = 1; i <= TOTAL; i++) {
  const n = String(i).padStart(2, "0");
  const figure = document.createElement("figure");
  figure.className = "slide";
  figure.id = `slide-${i}`;

  const img = document.createElement("img");
  img.src = `slides/slide-${n}.jpg`;
  img.alt = `Bricks Design System — slide ${i} of ${TOTAL}`;
  img.loading = i <= 2 ? "eager" : "lazy";
  img.decoding = "async";
  if (i === 1) img.fetchPriority = "high";

  figure.appendChild(img);
  deck.appendChild(figure);
}

const hash = Number(location.hash.replace(/\D/g, ""));
if (hash >= 1 && hash <= TOTAL) {
  document.getElementById(`slide-${hash}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
}
