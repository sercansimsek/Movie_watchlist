const watchlistContainer = document.querySelector(
  ".listing-container-watchlist",
);

function loadWatchlist() {
  return JSON.parse(localStorage.getItem("watchlist") || "[]");
}

function saveWatchlist(list) {
  localStorage.setItem("watchlist", JSON.stringify(list));
}

function renderWatchlist() {
  const list = loadWatchlist();

  if (!list.length) {
    watchlistContainer.innerHTML = `<p class="main-err">Your watchlist is empty. <a href="index.html">Search for movies</a></p>`;
    return;
  }

  let html = "";

  list.forEach((movie) => {
    html += `
      <li class="listing" data-imdbid="${movie.imdbID}">
        <img
          src="${
            movie.Poster && movie.Poster !== "N/A"
              ? movie.Poster
              : "/images/placeholder.png"
          }"
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
              <p class="listing-rate">
                ${
                  movie.Ratings && movie.Ratings[0]
                    ? movie.Ratings[0].Value
                    : "N/A"
                }
              </p>
            </div>
          </div>
          <div class="listing-extra">
            <p class="listing-duration">${movie.Runtime}</p>
            <p class="listing-category">${movie.Genre}</p>
             <img
                  src="/images/minus.svg    "
                  alt="plus icon represents adding an item"
                  class="remove-icon"
                />
                <p class="watchlist-text">Remove</p>
          </div>
          <p class="listing-description">${movie.Plot}</p>
        </div>
      </li>
      <hr class="divider" />
    `;
  });

  watchlistContainer.innerHTML = html;
}

function handleRemove(event) {
  if (event.target.classList.contains("remove-icon")) {
    const li = event.target.closest(".listing");
    const id = li.dataset.imdbid;
    let list = loadWatchlist();
    list = list.filter((m) => m.imdbID !== id);
    saveWatchlist(list);
    renderWatchlist();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderWatchlist();
  watchlistContainer.addEventListener("click", handleRemove);
});
