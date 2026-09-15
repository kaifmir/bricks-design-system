const toc = document.getElementById("toc");
const tocToggle = document.getElementById("toc-toggle");
const tocLinks = Array.from(toc.querySelectorAll("a[href^='#']"));
const sections = tocLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function setActiveLink(id) {
  tocLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) setActiveLink(visible.target.id);
  },
  { root: null, rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
);

sections.forEach((section) => observer.observe(section));

function closeToc() {
  toc.classList.remove("is-open");
  tocToggle.setAttribute("aria-expanded", "false");
}

tocToggle.addEventListener("click", () => {
  const isOpen = toc.classList.toggle("is-open");
  tocToggle.setAttribute("aria-expanded", String(isOpen));
});

tocLinks.forEach((link) => {
  link.addEventListener("click", closeToc);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeToc();
});

const toTopBtn = document.getElementById("to-top");
toTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
