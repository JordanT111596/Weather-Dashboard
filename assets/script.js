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
        console.log(response);
        var todaysWeather = $("<div>");
        todaysWeather.addClass("card-body");

        $("#top-card").append(todaysWeather);
    })
}

$(document).on("click", ".city", displayWeatherInfo);

