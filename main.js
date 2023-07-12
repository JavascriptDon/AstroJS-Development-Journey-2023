fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`
		document.getElementById("author").textContent = `By: ${data.user.name}`
    })
    .catch(err => {
        // Use a default background image/author
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1689099687897-f72f754bc748?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80
)`
		document.getElementById("author").textContent = `By: Warren Umoh`
    })

// fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
//     .then(res => {
//         if (!res.ok) {
//             throw Error("Something went wrong")
//         }
//         return res.json()
//     })
//     .then(data => {
//         document.getElementById("crypto-header").innerHTML = `
//             <img src=${data.image.small} />
//             <span>${data.name}</span>
//         `
//         document.getElementById("crypto").innerHTML += `
//             <p>🎯Price: $${data.market_data.current_price.usd}</p>
//             <p>👆: $${data.market_data.high_24h.usd}</p>
//             <p>👇: $${data.market_data.low_24h.usd}</p>
//         `
//     })
//     .catch(err => console.error(err))


    fetch("https://api.quotable.io/random")
    .then(res => {
      if(!res.ok){
        throw Error("Something went wrong")
      }
      return res.json()
    }).then(data => {
      console.log(data)
      document.getElementById("quote").innerHTML += `
      <h4>${data.content}</h4>
      <p>${data.author}</p>
      `
    }).catch(err => console.log(err))

    function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "medium"})
}

setInterval(getCurrentTime, 1000)

navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>
            `
        })
        .catch(err => console.error(err))
});
