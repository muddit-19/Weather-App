// API key
// 0506e5a7609a8540e13e7127ecb9a413

let weather =
{
    apikey: "0506e5a7609a8540e13e7127ecb9a413",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apikey)
            .then((res) => {
                if (res.status > 299 || res.status < 200) {
                    document.querySelector(".weather").classList.add("error");
                    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x720/?error')";
                    return;   
                }
                else
                {
                    document.querySelector(".weather").classList.remove("error");   
                }
                return res.json()
            })
            .then((data) => this.displayWeather(data));
    },

    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerHTML = "Weather in " + name;
        document.querySelector(".icon").setAttribute("src", "http://openweathermap.org/img/wn/" + icon + ".png");
        document.querySelector(".description").innerHTML = description;
        document.querySelector(".temp").innerHTML = temp + "°C";
        document.querySelector(".humidity").innerHTML = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerHTML = "Wind Speed: " + speed + " Km/hr";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x720/?" + name + "')";
    },

    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather("Delhi");