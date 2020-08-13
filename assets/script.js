//event listener that logs the user input using either the button or the enter key
var apiKey = "863a6db584ee09579b62dfe7cf104c44";

$("#search-button").on("click", function (event) {
    //stops page from refreshing upon hitting enter key
    event.preventDefault();
    //stores user input into variable
    var userText = $("#search-input").val();
    console.log(userText);
});