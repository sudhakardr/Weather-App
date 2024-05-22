const apikey = "22bbbd2756fdb1d95ee9dd0bd3f3b168";

const weatherDataE1 = document.getElementById("weather-data");

const cityInputE1 = document.getElementById("city-input");

const formE1 = document.querySelector("form");

formE1.addEventListener("submit", (event) => {  
        
    event.preventDefault();
    const cityValue = cityInputE1.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {

    try{
        
        const response = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);

        if(!response.ok) {

            throw new Error("Network response was not ok")
        }

        const data = await response.json();

        console.log(data);

        const temperature = Math.round(data.main.temp)

        const description = data.weather[0].description

        console.log(description);

        const icon = data.weather[0].icon

        const details = [

            `Feels like: ${Math.round(data.main.feels_like)}`,

            `Humidity: ${data.main.humidity}%`,

            `Wind Speed: ${data.wind.speed}m/s`,
        ]
        
        weatherDataE1.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`
        console.log("next1");
        weatherDataE1.querySelector(".temperature").textContent = `${temperature}°C`;
        console.log("next2");
        weatherDataE1.querySelector(".description").textContent = description
        console.log("next3");
        weatherDataE1.querySelector(".details").innerHTML = details.map(
                                                                         (detail) => `<div> ${detail} </div>`
                                                                        ).join("")
    }catch (error) {
        
        console.log("error");

        weatherDataE1.querySelector(".icon").innerHTML = ``;

        weatherDataE1.querySelector(".temperature").textContent = ``;

        weatherDataE1.querySelector(".description").textContent = "An error happened, please try again later";

        weatherDataE1.querySelector(".details").innerHTML = ``;
    }
}