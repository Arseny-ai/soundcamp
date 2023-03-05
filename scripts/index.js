import { albums } from "./album-data.js";

// PLAYLISTS RENDER
const playlists = document.querySelector(".playlists");
albums.forEach((album, index) => {
  playlists.innerHTML += `
  <div data-href="views/album.html?album=${index}">
    <div class="playlists-card">
      <img src="assets/${album.src}">
      <h3>${album.title}</h3>
    </div>
  </div>
`;
});
// PLAYLISTS RENDER

// ANCHORS
document.querySelectorAll("div[data-href]").forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    window.location.replace(anchor.getAttribute("data-href"));
  });
});
// ANCHORS

// ALBUM SEARCH
const search = document.querySelector(".header .search-box .search");
const searchButton = document.querySelector(
  ".header .search-box .search-button"
);

searchButton.addEventListener("click", () => {
  playlists.innerHTML = ``;
  albums.forEach((album, index) => {
    if (album.title.toLowerCase().includes(search.value)) {
      playlists.innerHTML += `
      <div data-href="views/album.html?album=${index}">
        <div class="playlists-card">
          <img src="assets/${album.src}">
          <h3>${album.title}</h3>
        </div>
      </div>
    `;
    }
  });
  document.querySelectorAll("div[data-href]").forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      window.location.replace(anchor.getAttribute("data-href"));
    });
  });
});
// ALBUM SEARCH
