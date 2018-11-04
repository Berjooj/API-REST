let userData = [];
let moviesDataList = [];
// let movieLis

$(document).ready(function() {
    // Get user data
    $.ajax({
        dataType: "json",
        url: "/getUser",
        timeout: 5000,
        success: function(_userData) {
            userData = _userData;
            $("#userName").html(userData['name']);

            // Get watched movie list
            $.ajax({
                dataType: "json",
                url: "/getWatchedList/" + userData['_id'],
                timeout: 4000,
                success: function(_moviesDataList) {
                    console.log(_moviesDataList);
                    reDrawElementes();

                    _moviesDataList.forEach(movieElement => {
                        moviesDataList[moviesDataList.length] = movieElement;

                        createMoviePreviewChild(movieElement, getEvaluation(movieElement), true);
                        editAreaOptions(movieElement);
                    });
                    
                    updateInputs($("#movieTitleSelect option:selected").val());

                    // Get not watched movie list
                    $.ajax({
                        dataType: "json",
                        url: "getNotWatchedList/" + userData['_id'],
                        context: document.body,
                        success: function(_moviesDataList) {
                            // reDrawElementes();

                            _moviesDataList.forEach(movieElement => {
                                moviesDataList[moviesDataList.length] = movieElement;

                                createMoviePreviewChild(movieElement, getEvaluation(movieElement), false);
                                editAreaOptions(movieElement);
                            });
                            
                            updateInputs($("#movieTitleSelect option:selected").val());
                        }
                    });
                }
            });
        }
    });

    // Check for changes on <option> for edit movie
    $("#movieTitleSelect").on('change', function() {
        updateInputs($("#movieTitleSelect option:selected").val());
    });

    // Change (edit movie) event
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

    // Register a new movie event
    $("#submitNewMovie").click(function () {
        $.ajax({
            url: "/registerMovie",
            type: "POST",
            contentType: 'application/json',
            data: JSON.stringify({
                name: $('#newMovieInputName').val(),
                description: $('#newMovieInputDescription').val(),
                duration: $('#newMovieInputDuration').val()
            }),
            success: function(response) {
                alert("Filme adicionado com sucesso!");
                location.reload();
            }
        });
    });

    // Delete a movie event
    $("#removeMovieButton").click(function () {
        $.ajax({
            url: "/movie/delete/" + $("#movieTitleSelect2 option:selected").val(),
            type: "DELETE",
            contentType: 'application/json',
            success: function(response) {
                alert("Filme deletado com sucesso!");
                location.reload();
            }
        });
    });

    // Change movie status (!watch to watch)
    $(document).on("click", ".radioWatch", function () {
        let movieID = $(this).val();
        $.ajax({
            url: "/setWatched",
            type: "POST",
            contentType: 'application/json',
            data: JSON.stringify({
                movieId: movieID,
                userId: userData['_id'],
                status: true
            }),
            success: function(response) {
                alert("Esperamos que tenha gostado!");
                location.reload();
            }
        });
    }).on("click", ".radioWatched", function () {
        let movieID = $(this).val();
        $.ajax({
            url: "/setWatched",
            type: "POST",
            contentType: 'application/json',
            data: JSON.stringify({
                movieId: movieID,
                userId: userData['_id'],
                status: false
            }),
            success: function(response) {
                alert("Esperamos que tenha gostado!");
                location.reload();
            }
        });
    });
});

// Check and return the evaluation rate from that movie
function getEvaluation (movie) {
    return 5;
}

// Check if the user has watched that movie
function isWatched (movie) {

    return false;
}

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
    $("#movieTitleSelect2").empty();
}

function editAreaOptions (movieDescription) {
    var movieOption = $("<option></option>")
        .val(movieDescription['_id'])
        .attr("id", movieDescription['_id'])
        .html(movieDescription['name']);

    $("#movieTitleSelect").append(movieOption);

    movieOption = $("<option></option>")
        .val(movieDescription['_id'])
        .attr("id", movieDescription['_id'])
        .html(movieDescription['name']);
    $("#movieTitleSelect2").append(movieOption);
}

// Movie list (default format from W3CSS)
function createMoviePreviewChild (movie, evaluation, _isWatched) {
    var containerFather = $("<div></div>")
        .addClass("w3-third w3-container w3-margin-bottom w3-animate-left all listTag");

    var _className = (_isWatched === true) ? 'watched' : 'recommended';
    containerFather.addClass(_className);

    console.log(containerFather.attr('class'));
    
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
        .attr("type", "radio")
        .val(movie['_id'])
        .addClass('radioWatch');;
    var movieWatchedB = $("<b></b>").html("Visto");

    var movieWatchP = $("<p></p>");
    var movieWatchInput = $("<input>")
        .attr("name", "viewStatus")
        .attr("type", "radio")
        .val(movie['_id'])
        .addClass('radioWatched');
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