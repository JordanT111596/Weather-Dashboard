//event listener that logs the user input using either the button or the enter key
$("#search-button").on("click", function (event) {
    //stops page from refreshing upon hitting enter key
    event.preventDefault();
    //stores user input into variable
    var userText = $("#search-input").val();
    console.log(userText);
});