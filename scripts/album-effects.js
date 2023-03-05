import { albums } from "./album-data.js";

// DROPDOWN MENU
const profile = document.querySelector(".header .profile");

profile.querySelector(".profile-picture").addEventListener("click", () => {
  profile.querySelector(".dropdown-menu").classList.toggle("inactive");
});
// DROPDOWN MENU

// SEARCH
const search = document.querySelector(".track-search-box .track-search");
const searchBox = document.querySelector(".track-search-box");

search.addEventListener("focusin", () => {
  searchBox.classList.add("search-on-focus");
});

search.addEventListener("focusout", () => {
  searchBox.classList.remove("search-on-focus");
});
// SEARCH

// FAVORITE BUTTON
const favoriteButton = document.querySelector(".playlist-row .favorite-button");

favoriteButton.addEventListener("click", () => {
  favoriteButton
    .querySelector(".favorite")
    .classList.toggle("favorite-button-clicked");
});

favoriteButton.addEventListener("mousedown", () => {
  favoriteButton.classList.add("favorite-clicked");
});

favoriteButton.addEventListener("mouseup", () => {
  favoriteButton.classList.remove("favorite-clicked");
});

favoriteButton.addEventListener("mouseleave", () => {
  favoriteButton.classList.remove("favorite-clicked");
});
// FAVORITE BUTTON

// PLAYBUTTON
const playButton = document.querySelector(".playlist-row .play-button");

playButton.addEventListener("mousedown", () => {
  playButton.classList.add("play-button-mousedown");
});

playButton.addEventListener("mouseleave", () => {
  playButton.classList.remove("play-button-mousedown");
});

playButton.addEventListener("click", () => {
  playButton.classList.toggle("play-button-clicked");
});

playButton.addEventListener("mouseup", () => {
  playButton.classList.remove("play-button-mousedown");
});
// PLAYBUTTON

// TRACK PLAY
const albumIndex = window.location.href.at(-1);

const tracks = document.querySelectorAll(".track");
tracks.forEach((track, index) => {
  track.addEventListener("mouseenter", () => {
    track.querySelector(".box .button").classList.remove("disabled");
  });

  track.addEventListener("mouseleave", () => {
    track.querySelector(".box .button").classList.add("disabled");
  });

  const play = track.querySelector(".box .play");
  const audio = track.querySelector(".audio");

  play.addEventListener("click", () => {
    if (albums[albumIndex].tracks[index].isPlaying) {
      albums[albumIndex].tracks[index].isPlaying = false;
      play.innerHTML = "play_arrow";
      audio.pause();
    } else {
      tracks.forEach((track1, index1) => {
        albums[albumIndex].tracks[index1].isPlaying = false;
        albums[albumIndex].tracks[index].isPlaying = true;
      });

      tracks.forEach((track2, index2) => {
        const play = track2.querySelector(".box .play");
        const audio = track2.querySelector(".audio");
        if (albums[albumIndex].tracks[index2].isPlaying) {
          play.innerHTML = "pause";
          audio.play();

          // TRACK TIME DISPLAY
          updateProgress();
          // TRACK TIME DISPLAY
        } else {
          play.innerHTML = "play_arrow";
          audio.pause();
        }
      });
    }
    function updateProgress() {
      let time = getTime(audio.currentTime);
      const progress = track.querySelector(".track-progress");

      let progressWidth = getComputedStyle(progress).getPropertyValue("width");
      progressWidth = +progressWidth.slice(0, progressWidth.length - 2);

      if (time != track.querySelector(".track-time").innerHTML) {
        track.querySelector(".track-time").innerHTML = time;
        progress.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
      }

      if (albums[albumIndex].tracks[index].isPlaying)
        requestAnimationFrame(updateProgress);
    }

    function getTime(time) {
      time = Math.floor(time);
      let minutes = Math.floor(time / 60);
      let seconds = Math.floor(time % 60);
      return `${minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds
      }`;
    }
  });
});
// TRACK PLAY

// TRACK PLAYLIST PLAY BUTTON
// later
// TRACK PLAYLIST PLAY BUTTON

const tracksInfos = document.querySelectorAll(".track .track-info .container");

const tracksWidths = [];
tracksInfos.forEach((trackInfo) => {
  let width = getComputedStyle(trackInfo).width;
  tracksWidths.push(+width.slice(0, width.length - 2));
});
const maxWidth = Math.max(...tracksWidths);

tracksInfos.forEach((trackInfo) => {
  trackInfo.style.width = `${maxWidth}px`;
});
