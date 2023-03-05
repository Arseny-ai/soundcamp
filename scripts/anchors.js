// ANCHORS
document.querySelectorAll("div[data-href]").forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    window.location.replace(anchor.getAttribute("data-href"));
  });
});
// ANCHORS