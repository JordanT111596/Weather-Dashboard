//event listener that logs the user input using either the button or the enter key
var apiKey = "863a6db584ee09579b62dfe7cf104c44";

renderCityList();

$("#search-button").on("click", function (event) {
    //stops page from refreshing upon hitting enter key
    event.preventDefault();
    //stores user input into variable
    var userText = $("#search-input").val().trim();
    if (userText) {
        var localStorageCities = JSON.parse(window.localStorage.getItem("localStorageCities")) || [];
        var newCity = {
            cityName: userText
        }
        localStorageCities.push(newCity);
        window.localStorage.setItem("localStorageCities", JSON.stringify(localStorageCities));
        renderCityList();
    }
});

function renderCityList() {
    $("#cityList").empty();
    var localStorageCities = JSON.parse(window.localStorage.getItem("localStorageCities")) || [];
    for (var i = 0; i < localStorageCities.length; i++) {
        var newLi = $("<li>");
        newLi.text(localStorageCities[i].cityName);
        newLi.addClass("list-group-item");
        newLi.addClass("city");
        newLi.attr("data-city", localStorageCities[i].cityName)
        $("#cityList").append(newLi);
    }
}

function displayWeatherInfo() {
    $("#top-card").empty();
    $("#five-day").empty();
    $("#day-holder").empty();

    var city = $(this).attr("data-city");
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        //logs response so i can see what I'm grabbing
        console.log(response);
        //creates card to hold daily city weather info
        var todaysWeather = $("<div>");
        todaysWeather.addClass("card-body");
        todaysWeather.attr("id", "todays-weather");

        //displays city name and date
        var cityDate = $("<h5>");
        cityDate.text(city + " " + (moment().format("[(]M[/]D[/]YYYY[)]")));
        cityDate.addClass("card-title");
        todaysWeather.append(cityDate);

        //displays current weather icon
        var weatherIcon = $("<img>");
        weatherIcon.attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
        weatherIcon.attr("alt", response.weather[0].description);
        cityDate.append(weatherIcon);

        //displays temperature
        var tempToday = $("<p>");
        tempToday.addClass("card-text");
        tempToday.text("Temperature: " + ((((response.main.temp) - 273.15) * 1.80 + 32).toFixed(2)) + "°F");
        todaysWeather.append(tempToday);

        //displays humidity
        var humidToday = $("<p>");
        humidToday.addClass("card-text");
        humidToday.text("Humidity: " + response.main.humidity + "%");
        todaysWeather.append(humidToday);

        //displays wind speed
        var windToday = $("<p>");
        windToday.addClass("card-text");
        windToday.text("Wind Speed: " + response.wind.speed + " MPH");
        todaysWeather.append(windToday);

        var lat = response.coord.lat;
        var lon = response.coord.lon;
        var queryURL2 = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon;

        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            //displays uvIndex element
            var uvToday = $("<p>");
            uvToday.addClass("card-text");
            uvToday.text("UV Index: ");

            var uvIndex = $("<span>");
            uvIndex.text(response.value);
            uvToday.append(uvIndex);

            $("#todays-weather").append(uvToday);

            if (response.value >= 8) {
                uvIndex.addClass("badge badge-danger");
            }
            else if (response.value >= 5 && response.value <= 7.99) {
                uvIndex.addClass("badge badge-warning");
            }
            else if (response.value >= 0 && response.value <= 4.99) {
                uvIndex.addClass("badge badge-success");
            }
        });

        //appends all this to the card element
        $("#top-card").append(todaysWeather);
    })
}

$(document).on("click", ".city", displayWeatherInfo);

