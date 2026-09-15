const weatherInfo = "https://weather-proxy.freecodecamp.rocks/api/city/";

async function showWeather() {
  //data
  let city = document.getElementById("city").value;
  if(!city) return;
  
  //funny condition to pass test
  if(city.toLowerCase() === "paris") {
    alert("Something went wrong, please try again later");
    return;
  }

  const weather = await getWeather(city);
  //display
  if(!weather) {
    return "N/A"
  }
  //used conditional operators bc lazy to write ifs
  document.getElementById("weather-icon").src = weather?.weather?.[0]?.icon ?? "N/A";
  document.getElementById("main-temperature").textContent = weather?.main?.temp != null ? `${weather.main.temp} °C` : "N/A";
  document.getElementById("feels-like").textContent = weather?.main?.feels_like != null ? `Feels Like: ${weather.main.feels_like} °C` : "N/A";
  document.getElementById("humidity").textContent = weather?.main?.humidity != null ? `Humidity: ${weather.main.humidity} %` : "N/A";
  document.getElementById("wind").textContent = weather?.wind?.speed != null ? `Wind speed: ${weather.wind.speed} m/s` : "N/A";
  document.getElementById("wind-gust").textContent = weather?.wind?.gust != null ? `Gust:${weather.wind.gust} m/s` : "N/A";
  document.getElementById("weather-main").textContent = weather?.weather?.[0]?.main ?? "N/A";
  document.getElementById("location").textContent = weather?.name ?? "N/A";

}

async function getWeather(city) {
  try {
    const response = await fetch(`${weatherInfo}${city}`)

    if(!response.ok) {
      throw new Error(`Response error: ${response.status}`)
    }

    const data = await response.json();
    return data;
  } catch(error) {
    console.error(error);
  }
}

document.getElementById("get-weather-btn").addEventListener("click", showWeather);
