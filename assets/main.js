//Make document load before running
$(document).ready(function () {
    //starting array of gifs
    var gifArray = ["Breaking Bad", "Avatar: The Last Airbender", "Spongebob SquarePants", "Firefly","Psych","Game of Thrones","Buffy The Vampire Slayer","Chuck","Babylon 5","Animaniacs","Twilight Zone","Parks and Rec","How I Met Your Mother"];

    //Function to display gifs
    function displayGifs() {

        var gif = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=jI76w2WD2kkFxBhBGZgycqhkRCUlFkVM&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {

                console.log(response)
                var results = response.data;
                //empty div so there is only the current selection of gifs, not all summoned
                $("#gifs-appear-here").empty();
                //print out image div in html, with all kinds of attributes to help with still and animate function
                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div class='gif'>");
                    var p = $("<p>");
                    p.text("Rating: "+results[i].rating);
                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_still.url);
                    gifImage.attr("data-animate",results[i].images.fixed_height.url)
                    gifImage.attr("data-still",results[i].images.fixed_height_still.url)
                    gifImage.attr("data-state","still")
                    gifImage.addClass("gifImage img-fluid");
                    gifDiv.append(p);
                    gifDiv.append(gifImage);
                    $("#gifs-appear-here").prepend(gifDiv);

                };
            })


    }
    function renderButtons() {
        $("#buttons-view").empty();
        console.log("render buttons function running")
        for (var i = 0; i < gifArray.length; i++) {
            //generate buttons
            var a = $("<button>");
            // Add a class
            a.addClass("gif-btn");
            // Add data attribute
            a.attr("data-name", gifArray[i]);
            // Add button text
            a.text(gifArray[i]);
            // Add to div
            $("#buttons-view").append(a);
        }
    }
    // If the submit button is clicked
    $("#add-gif").on("click", function (event) {
        event.preventDefault();
        // grab textbox input
        var gif = $("#gif-input").val().trim();

        // Adds gif to array
        gifArray.push(gif);

        // Calling renderButtons 
        renderButtons();
    });

 //Pause and stop functionality when a gif is clicked
 $("#gifs-appear-here").on("click",".gifImage",function (event) {
    console.log("gifImage class clicked");
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"))
        $(this).attr("data-state", "animate")
    }
    else {
        $(this).attr("src", $(this).attr("data-still"))
        $(this).attr("data-state", "still")
    }
})


    //run displayGifs function if a button with class .gif-btn is clicked
    $(document).on("click", ".gif-btn", displayGifs);

   


    renderButtons();


})
