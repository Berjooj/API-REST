let userData = [];
let moviesDataList = [];

$(document).ready(function() {
    $.ajax({
        dataType: "json",
        url: "/getUser",
        timeout: 5000,
        success: function(_userData) {
            userData = _userData;

            $("#userName").html(userData['name']);
        }
    });

    $.ajax({
        dataType: "json",
        url: "/movieList",
        success: function(_moviesDataList) {
            moviesDataList = _moviesDataList;
            
            reDrawElementes();
            
            moviesDataList.forEach(movieElement => {
                createMoviePreviewChild(movieElement);
                editAreaOptions(movieElement);
            });

            updateInputs($("#movieTitleSelect option:selected").val());
        }
    });

    $("#movieTitleSelect").on('change', function() {
        updateInputs($("#movieTitleSelect option:selected").val());
    });

    $("#submitButton").click(function () {
        $.ajax({
            url: "/movie/edit/" + $("#movieTitleSelect option:selected").val(),
            type: "PUT",
            contentType: 'application/json',
            data: JSON.stringify({
                name: $('#movieInputName').val(),
                description: $('#movieInputDescription').val(),
                duration: $('#movieInputDuration').val()
            }),
            success: function(response) {
                alert("Filme alterado com sucesso!");
                location.reload();
            }
        });
    });
});

function updateInputs (movieId) {
    moviesDataList.forEach(movie => {
        if (movie['_id'] === movieId) {
            $('#movieInputName').val(movie['name']);
            $('#movieInputDescription').val(movie['description']);
            $('#movieInputDuration').val(movie['duration']);
            return;
        }
    });
}

function reDrawElementes () {
    $("#movieGrid").empty();
    $("#movieTitleSelect").empty();
}

function editAreaOptions (movieDescription) {
    var movieOption = $("<option></option>")
        .val(movieDescription['_id'])
        .attr("id", movieDescription['_id'])
        .html(movieDescription['name']);

    $("#movieTitleSelect").append(movieOption);
}

//Default format from W3CSS
function createMoviePreviewChild (movie) {
    var containerFather = $("<div></div>")
        .addClass("w3-third w3-container w3-margin-bottom all listTag");
    
    var icon = $("<i></i>")
        .addClass("fas fa-film")
        .css("fontSize", "72px");

    var innerContainter = $("<div></div>")
        .addClass("w3-container w3-white");

    var pMovieName = $("<p></p>");
    var movieName = $("<b></b>").html(movie['name']);

    var movieDescription = $("<p></p>").html(movie['description']);

    var ul = $("<ul></ul>")
        .addClass("rank");
    
    for (var i = 0; i < 5; i ++) {
        var starLi = $("<li></li>");
        var starI  = $("<i></i>")
            .addClass("fas fa-star");
        
        starLi.append(starI);
        ul.append(starLi);
    }

    var movieWatchedP = $("<p></p>");
    var movieWatchedInput = $("<input>")
        .attr("name", "viewStatus")
        .attr("type", "radio");
    var movieWatchedB = $("<b></b>").html("Visto");

    var movieWatchP = $("<p></p>");
    var movieWatchInput = $("<input>")
        .attr("name", "viewStatus")
        .attr("type", "radio")
        .val("Não visto");
    var movieWatchB = $("<b></b>").html("Não visto");

    movieWatchedP
        .append(movieWatchedInput)
        .append(movieWatchedB);

    movieWatchP
        .append(movieWatchInput)
        .append(movieWatchB);

    pMovieName.append(movieName);
    innerContainter.append(pMovieName)
        .append(movieDescription)
        .append(ul)
        .append(movieWatchedP)
        .append(movieWatchP);
    containerFather.append(icon).append(innerContainter);

    $("#movieGrid").append(containerFather);
}