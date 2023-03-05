// HEADER SEARCH
const search = document.querySelector(".header .search-box .search");
const searchWidth = window.getComputedStyle(search).width;

if (+searchWidth.slice(0, searchWidth.length - 2) > 16 * 16) {
  search.addEventListener("focusin", () => {
    search.placeholder = "Album search";
  });

  search.addEventListener("focusout", () => {
    document.querySelector(".header .search-box .search").placeholder = "";
  });
}
// HEADER SEARCH

// DROPDOWN MENU
const profile = document.querySelector(".header .profile");

profile.querySelector(".profile-picture").addEventListener("click", () => {
  profile.querySelector(".dropdown-menu").classList.toggle("inactive");
});
// DROPDOWN MENU

// SHOW-ALL HOVER EFFECT
const showAll = document.querySelector(".main .playlists-container .show-all");

showAll.addEventListener("mouseenter", () => {
  showAll.querySelector(".arrow").classList.add("arrow-hovered");
});

showAll.addEventListener("mouseleave", () => {
  showAll.querySelector(".arrow").classList.remove("arrow-hovered");
});
// SHOW-ALL HOVER EFFECT

// FAVORITE BUTTON
const favoriteButton = document.querySelector(
  ".main .main-row .favorite-button"
);

favoriteButton.addEventListener("mousedown", () => {
  favoriteButton.classList.add("favorite-clicked");
});

favoriteButton.addEventListener("mouseup", () => {
  favoriteButton.classList.remove("favorite-clicked");
});

favoriteButton.addEventListener("mouseleave", () => {
  favoriteButton.classList.remove("favorite-clicked");
});

favoriteButton.addEventListener("click", () => {
  favoriteButton.classList.toggle("fav");
});
// FAVORITE BUTTON

// CARD HOVER EFFECT
const playlistCards = document.querySelectorAll(".playlists-card");

playlistCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.querySelector("h3").classList.add("hovered-heading");
  });
  card.addEventListener("mouseleave", () => {
    card.querySelector("h3").classList.remove("hovered-heading");
  });
});
// CARD HOVER EFFECT

