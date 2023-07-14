let watchlistHtml = ''
let watchlistArr = JSON.parse(localStorage.getItem('watchlist') || "[]")

render()

document.addEventListener('click', (e)=>{
    if(e.target.dataset.id){
        console.log(e.target.dataset.id)
        watchlistArr = watchlistArr.filter(movie => movie.imdbID !== e.target.dataset.id)
        console.log(watchlistArr)
        localStorage.setItem('watchlist', JSON.stringify(watchlistArr))
        render()
    }

})

function updateWatchlistHtml(movie){
    watchlistHtml += `
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
                                <button id="remove-btn" class="add-remove-btn" data-id=${movie.imdbID}>
                                <img src="/public/minus-icon.svg">
                                    Remove
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

function render(){
    watchlistHtml = ''
    if(watchlistArr.length){
        watchlistArr.forEach(movie => {
            updateWatchlistHtml(movie)
            renderWatchlist()
        })
    } else {
        renderWatchlistApology()
    }

}

function renderWatchlist(){
    document.getElementById('watchlist-index').innerHTML = watchlistHtml
}

function renderWatchlistApology(){
    document.getElementById('watchlist-index').innerHTML = `
                <div class="body-wrapper">
                    <h2 class="no-data">Your watchlist is looking a little empty...</h2>
                    <a href="index.html" class="page-nav">
                        <img src="/public/plus-icon.svg" class="add-icon"/>
                        Let's add some movies!
                    </a>
                </div>
    `
}