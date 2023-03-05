import { albums } from "./album-data.js";

const href = window.location.href;
const albumsIndex = href.at(-1);
const album = albums[albumsIndex];

const calculateTime = () => {
  let time = 0;
  album.tracks.forEach((track) => {
    const timings = track.time.split(":").map((timing) => +timing);
    const trackTime = timings[0] * 60 + timings[1];
    time += trackTime;
  });
  return [Math.floor(time / 60), time % 60];
};

const time = calculateTime();

function renderAlbum() {
  document.querySelector(".playlist-row").innerHTML = `<div>
  <img class="image" src="../assets/${album.src}" alt="playlist image">
  </div>
  <div class="container">
  
  <div class="row">
    <p class="playlist-text">PLAYLIST</p>
    <p class="playlist-text time">Duration ${time[0]}min ${time[1]}sec</p>
  </div>
  <div class="row">
    <h1>${album.title}</h1>
  </div>
  <div class="row description">
    ${album.description}
  </div>
  <div class="row last-row">
    <button class="play-button">
      <span class="material-icons">play_arrow
      </span> Play
    </button>
    <button class="favorite-button">
      <span class="material-icons favorite">
        favorite
      </span>
    </button>
  </div>
  </div>`;
}
renderAlbum();

function renderTrack(track) {
  document.querySelector(".track-list").innerHTML += `
  <div class="track">
    <div class="box">
      <img src="../assets/${album.src}" alt="track-image">
      <button class="button disabled">
        <span class="material-icons play">play_arrow
        </span>
      </button>
    </div>
    <div class="track-info">
      <div class="container">
        <div data-href="#" class="song-name">${track.name}</div>
        <div data-href="#" class="author">${track.artist}</div>
      </div>
      <div class="track-progress-bar">
        <div class="track-progress"></div>
      </div>
      <div class="track-time">${track.time}</div>
    </div>
    <audio class="audio" src="${track.src}"></audio>
  </div>`;
}

album.tracks.forEach((track) => {
  renderTrack(track)
});

// TRACK SEARCH
document
  .querySelector(".main .track-search-box .track-search")
  .addEventListener("input", (event) => {
    document.querySelector(".track-list").innerHTML = ``;

    album.tracks.forEach((track) => {
      if (
        track.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
        track.artist.toLowerCase().includes(event.target.value.toLowerCase())
      ) {
        renderTrack(track)
      }
    });

    const albumIndex = window.location.href.at(-1);

    const tracks = document
      .querySelector(".track-list")
      .querySelectorAll(".track");
    tracks.forEach((track, index) => {
      track.addEventListener("mouseenter", () => {
        track.querySelector(".box .button").classList.remove("disabled");
      });

      track.addEventListener("mouseleave", () => {
        track.querySelector(".box .button").classList.add("disabled");
      });

      tracks.forEach((track1, index1) => {
        albums[albumIndex].tracks[index1].isPlaying = false;
        albums[albumIndex].tracks[index].isPlaying = true;
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
            } else {
              play.innerHTML = "play_arrow";
              audio.pause();
            }
          });
        }
      });
      console.log("I have play button event!")
    });
  });
// TRACK SEARCH
