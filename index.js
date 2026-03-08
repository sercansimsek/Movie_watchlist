const main = document.querySelector(".main");
const searchInput = document.querySelector(".search-input");
const submitBtn = document.querySelector(".submit-btn");
const form = document.querySelector(".form");
const listingContainer = document.querySelector(".listing-container");
const startExploring = document.querySelector(".start-exploring");

import getApiKey from "./env.js";

const apiKey = getApiKey();

function dataFromServer(event) {
  event.preventDefault();
  startExploring.style.display = "none";
  let listingHTML = "";

  const movieTitle = searchInput.value.trim();

  if (!movieTitle) {
    console.log("Please enter a movie title");
    return;
  }

  fetch(`https://www.omdbapi.com/?s=${movieTitle}&apikey=${apiKey}`)
    .then((response) => {
      response.json();

      if (!response.ok) {
        main.innerHTML =
          "<p>Unable to find what you are looking for. Please try another search.</p>";
      }
    })
    .then((data) => {
      data.Search.map((movie) => {
        fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`)
          .then((res) => res.json())
          .then((extraData) => {
            listingHTML += `
          <li class="listing">
          <img
            src="${movie.Poster}"
            alt="listing banner"
            class="listing-banner"
          />
          <div class="listing-info">
            <div class="listing-header">
              <p class="listing-title">${movie.Title}</p>
              <div class="listing-rating">
                <img
                  src="/images/Icon.svg"
                  alt="Filled star represents rating"
                  class="rate-icon"
                />
                <p class="listing-rate">${extraData.Ratings[0].Value}</p>
              </div>
            </div>
            <div class="listing-extra">
              <p class="listing-duration">${extraData.Runtime}</p>
              <p class="listing-category">${extraData.Genre}</p>
              <div class="listing-watchlist">
                <img
                  src="/images/dev.svg"
                  alt="plus icon represents adding an item"
                  class="add-icon"
                />

                <p class="watchlist-text">Watchlist</p>
              </div>
            </div>
            <p class="listing-description">
              ${extraData.Plot}
            </p>
          </div>
        </li>
        <hr class="divider"></hr> 
        `;

            listingContainer.innerHTML = listingHTML;
          });
      });
    });

  searchInput.value = "";
}

form.addEventListener("submit", dataFromServer);
