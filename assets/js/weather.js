const apiKey = "8c813aec713050c48599a7cf59aa10ed";

// search funtionality
$("#searchBtn").on("click", (search) => {
    search.preventDefault();
    var cityName = $("#searchBar").val();
    $("#city").text(cityName);

    // call and display current weather
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey)
        .then(data => {
            return data.json();
                
        })
        .then(data => {
            console.log(data);
            $("#currentTemp").text(`Temp:  ${data.main.temp} °F`);
            $("#currentWind").text(`Wind Speed: ${data.wind.speed} MPH`);
            $("#currentHumidity").text(`Humidity: ${data.main.humidity}%`);
            var lat = data.coord.lat;
            var lon = data.coord.lon;

            fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,daily&appid=" + apiKey)
            .then(data => {
                    return data.json();
            })
            .then(data => {
                $("#UV").text(`UV Index:  ${data.current.uvi}`);
            });
    });


    // call and display 5day forecast
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey)
    .then(data => {
            return data.json();
    })
    .then(data => {
        day1Temp = ((data.list[0].main.temp - 273.15)*1.8)+32;
        day2Temp = ((data.list[7].main.temp - 273.15)*1.8)+32;
        day3Temp = ((data.list[15].main.temp - 273.15)*1.8)+32;
        day4Temp = ((data.list[23].main.temp - 273.15)*1.8)+32;
        day5Temp = ((data.list[31].main.temp - 273.15)*1.8)+32;

        $("#day1Temp").text("Temperature: " + Math.round(day1Temp) + "°F");
        $("#day1Humidity").text("Humidity: " + data.list[0].main.humidity + "%");
        $("#day1Wind").text("Wind Speed: " + data.list[0].wind.speed + "MPH");

        $("#day2Temp").text("Temperature: " + Math.round(day2Temp) + "°F");
        $("#day2Humidity").text("Humidity: " + data.list[7].main.humidity + "%");
        $("#day2Wind").text("Wind Speed: " + data.list[7].wind.speed + "MPH");

        $("#day3Temp").text("Temperature: " + Math.round(day3Temp) + "°F");
        $("#day3Humidity").text("Humidity: " + data.list[14].main.humidity + "%");
        $("#day3Wind").text("Wind Speed: " + data.list[14].wind.speed + "MPH");

        $("#day4Temp").text("Temperature: " + Math.round(day4Temp) + "°F");
        $("#day4Humidity").text("Humidity: " + data.list[21].main.humidity + "%");
        $("#day4Wind").text("Wind Speed: " + data.list[21].wind.speed + "MPH");

        $("#day5Temp").text("Temperature: " + Math.round(day5Temp) + "°F");
        $("#day5Humidity").text("Humidity: " + data.list[28].main.humidity + "%");
        $("#day5Wind").text("Wind Speed: " + data.list[28].wind.speed + "MPH");
    })

});

const btn = document.querySelector("#searchBtn");
var input = document.querySelector("#searchBar");

btn.addEventListener("click", (searchSave) => {
  searchSave.preventDefault();
  cities = input.value;
  addToStorage(cities);
})
function saveHistory(cities) {
  var historyArray = [];
  if (localStorage.getItem("history")) {
    historyArray.push(cities);
    localStorage.setItem("history", JSON.stringify(historyArray));
  }
}
function getHistory() {
  if(localStorage.getItem("history")) {
    return;
  }
  $("searchHistory").text(history[0]);
};