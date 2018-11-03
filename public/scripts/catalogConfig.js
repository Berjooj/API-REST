$(document).ready(function() {
    let userData = [];
    let moviesDataList = [];

    $.ajax({
        dataType: "json",
        url: "/getUser",
        timeout: 5000,
        success: function(_userData) {
            $.each(_userData, function(key, val) {
                userData[key] = val;
            });

            $("#userName").html(userData['name']);
        }
    });

    $.ajax({
        dataType: "json",
        url: "/movieList",
        success: function(_moviesDataList) {
            moviesDataList = _moviesDataList;
            
            

        }
    });
});