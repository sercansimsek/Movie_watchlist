const main = document.querySelector(".main");
const searchInput = document.querySelector(".search-input");
const submitBtn = document.querySelector(".submit-btn");
const form = document.querySelector(".form");

import getApiKey from "./env.js";

const apiKey = getApiKey();

function dataFromServer(event) {
  event.preventDefault();

  const movieTitle = searchInput.value.trim();

  if (!movieTitle) {
    console.log("Please enter a movie title");
    return;
  }

  fetch(`https://www.omdbapi.com/?t=${movieTitle}&apikey=${apiKey}`)
    .then((response) => response.json())
    .then((data) => console.log(data));
}

form.addEventListener("submit", dataFromServer);
