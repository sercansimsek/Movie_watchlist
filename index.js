const main = document.querySelector(".main");
const searchInput = document.querySelector(".search-input");
const submitBtn = document.querySelector(".submit-btn");
const form = document.querySelector(".form");
const listingContainer = document.querySelector(".listing-container");

import getApiKey from "./env.js";

const apiKey = getApiKey();

function dataFromServer(event) {
  event.preventDefault();
  let listingHTML = "";

  const movieTitle = searchInput.value.trim();

  if (!movieTitle) {
    console.log("Please enter a movie title");
    return;
  }

  fetch(`https://www.omdbapi.com/?t=${movieTitle}&apikey=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      listingHTML = `
        <li class="listing">
          <img
            src="${data.Poster}"
            alt="listing banner"
            class="listing-banner"
          />
          <div class="listing-info">
            <div class="listing-header">
              <p class="listing-title">${data.Title}</p>
              <div class="listing-rating">
                <img
                  src="/images/Icon.svg"
                  alt="Filled star represents rating"
                  class="rate-icon"
                />
                <p class="listing-rate">${data.Ratings[0].Value}</p>
              </div>
            </div>
            <div class="listing-extra">
              <p class="listing-duration">${data.Runtime}</p>
              <p class="listing-category">${data.Genre}</p>
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
              ${data.Plot}
            </p>
          </div>
        </li>
        <hr class="divider" 
      `;
      listingContainer.innerHTML = listingHTML;
    });
}

form.addEventListener("submit", dataFromServer);
