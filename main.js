import {URL_endpoints} from "./endpoint.js";

async function fetchUnsplashPhoto() {
  try {
    const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature");
    if (!res.ok) {
      throw new Error("Failed to fetch data from Unsplash");
    }
    const data = await res.json();
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
    document.getElementById("author").textContent = `By: ${data.user.name}`;
  } catch (err) {
    document.body.style.backgroundImage = "url(https://images.unsplash.com/photo-1689099687897-f72f754bc748?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80)";
    document.getElementById("author").textContent = "By: Warren Umoh";
  }
}

async function fetchCoinData() {
  try {
    const coinKeys = Object.keys(URL_endpoints);
    const randomCoinKey = coinKeys[Math.floor(Math.random() * coinKeys.length)];

    const coinEndpoint = URL_endpoints[randomCoinKey];
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinEndpoint}`);
    if (!res.ok) {
      throw new Error("Failed to fetch coin data");
    }
    const data = await res.json();
    document.getElementById("crypto-header").innerHTML = `
      <img src=${data.image.small} />
      <span>${data.name}</span>
    `;
    document.getElementById("crypto").innerHTML += `
      <p>🎯Price: £${data.market_data.current_price.gbp}</p>
      <p>👆high_24h : £${data.market_data.high_24h.gbp}</p>
      <p>👇low_24h : £${data.market_data.low_24h.gbp}</p>
    `;
  } catch (err) {
    console.error(err);
  }
}


async function fetchRandomQuote() {
  try {
    const res = await fetch("https://api.quotable.io/random");
    if (!res.ok) {
      throw new Error("Failed to fetch quote");
    }
    const data = await res.json();
    document.getElementById("quote").innerHTML += `
      <h4>${data.content}</h4>
      <p>${data.author}</p>
    `;
  } catch (err) {
    console.log(err);
  }
}

    function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "medium"})
}

setInterval(getCurrentTime, 1000)

async function fetchWeatherData() {
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    const res = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial}`);
    if (!res.ok) {
      throw new Error("Weather data not available");
    }
    const data = await res.json();
    const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById("weather").innerHTML = `
      <img src=${iconUrl} />
      <p class="weather-temp">${Math.round(data.main.temp)}º</p>
      <p class="weather-city">${data.name}</p>
    `;
  } catch (err) {
    console.error(err);
  }
}

fetchUnsplashPhoto();
fetchRandomQuote();
fetchWeatherData();
fetchCoinData();