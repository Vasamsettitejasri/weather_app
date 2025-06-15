const apiKey = "34b389b3d7047316729deb8791ac08ea";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

const cityName = document.querySelector(".city");
const temperature = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    const data = await response.json();

    cityName.textContent = data.name;
    temperature.textContent = Math.round(data.main.temp) + "°C";
    humidity.textContent = data.main.humidity + "%";
    wind.textContent = data.wind.speed + " km/h";

    // Local weather icons
    const condition = data.weather[0].main;
    if (condition === "Clouds") {
      weatherIcon.src = "cloud.png";
    } else if (condition === "Clear") {
      weatherIcon.src = "clear.png";
    } else if (condition === "Rain") {
      weatherIcon.src = "rain.png";
    } else if (condition === "Drizzle") {
      weatherIcon.src = "drizzle.png";
    } else if (condition === "Mist") {
      weatherIcon.src = "mist.png";
    } else {
      weatherIcon.src = "2nd.png"; // fallback
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
  }
});
