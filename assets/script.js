//event listener that logs the user input using either the button or the enter key
var apiKey = "863a6db584ee09579b62dfe7cf104c44";
var cityArr = [];

$("#search-button").on("click", function (event) {
    //stops page from refreshing upon hitting enter key
    event.preventDefault();
    //stores user input into variable
    var userText = $("#search-input").val();
    console.log(userText);
    renderCityList(userText);
    //cityArr.push(userText);
});

function renderCityList (name) {
    cityArr.push(name);
    for (var i = 0; i < cityArr.length; i++) {
        var newLi = $("<li>");
        newLi.text(cityArr[i]);
        newLi.addClass("list-group-item");
        newLi.addClass("city");
        newLi.attr("id", "city" + i);
        $("#cityList").append(newLi);
    }
}