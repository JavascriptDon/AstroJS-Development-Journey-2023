const formEl = document.getElementById('form')
const searchInput = document.getElementById('search-input')
const moviesContainer = document.getElementById('movies-index')
let requestUrl = ''
let moviesHtml = ''
let moviesArray = []
let moviesArrayDetailed = []
let watchlist = JSON.parse(localStorage.getItem('watchlist') || "[]")

formEl.addEventListener('submit', (e)=>{
    e.preventDefault()
    let searchString = searchInput.value
    
    requestUrl = `https://www.omdbapi.com/?s=${searchString}&type=movie&apikey=c0f6e736&`
    fetch(requestUrl)
        .then(res => res.json())
        .then(data => {
            moviesHtml = ''
            if(data.Response == "False"){
                renderApology()
            }else {
                moviesArray = data.Search
                for(let movie of moviesArray){
                    getMovieDetails(movie.imdbID)
                }
            }
        })
})

document.addEventListener('click', (e)=>{
    if (e.target.dataset.id) {
        const targetMovieObj = moviesArrayDetailed.filter(
          (movie) => movie.imdbID === e.target.dataset.id
        )[0];
        if (!watchlist.includes(targetMovieObj)) {
          watchlist.push(targetMovieObj);
          localStorage.setItem('watchlist', JSON.stringify(watchlist));
          e.target.innerHTML = `
          ⭐ Added to Watchlist
          `;
        }
      }
})

function getMovieDetails(movieId){
    requestUrl = `https://www.omdbapi.com/?i=${movieId}&type=movie&apikey=c0f6e736&`
    fetch(requestUrl)
        .then(res => res.json())
        .then(data => {
            moviesArrayDetailed.push(data)
            updateResultsHtml(data)
            renderResults()
        })
}

function updateResultsHtml(movie){

        moviesHtml += `
        <div class="movie">
            <div class="movie-poster">
                <img src=${movie.Poster}  alt="movie-poster"> 
            </div>
            <div class="movie-body">
                <div class="movie-data">
                    <h2 class="movie-title">${movie.Title}</h2>
                    <p class="movie-rating">⭐${movie.imdbRating}</p>
                </div>
                <div class="movie-details">
                    <p class="movie-runtime">${movie.Runtime}</p>
                    <p class="movie-genres">${movie.Genre}</p>
                    <button id="add-btn" class="add-remove-btn" data-id=${movie.imdbID}>
                        <img src="/public/plus-icon.svg">
                        Watchlist
                    </button>
                </div>
                <p class="movie-description">
                    ${movie.Plot}
                </p>
            </div>
        </div>
        <hr>
        ` 
}


function renderResults(){
    moviesContainer.innerHTML = moviesHtml
}

function renderApology(){
    moviesContainer.innerHTML = `
        <div class="body-wrapper">
            <h2 class="no-data">Unable to find what you&#39;re looking for. Please try another search.</h2>
        </div>
    `
}