$(document).ready(function () {
    $(document).on ({
        mouseenter: function () {
            let starIndex =  parseInt($(this).index('.rank i'));
            let ulChildren = $(this).parent().parent();
            for (var i = 0; i <= starIndex%5; i++) {
                ulChildren.find('li:eq(' + i + ')').css('color', 'darkkhaki');
            }
        },
        mouseleave: function () {
            let starIndex =  parseInt($(this).index('.rank i'));
            let ulChildren = $(this).parent().parent();
            for (var i = 0; i <= starIndex%5; i++) {
                ulChildren.find('li:eq(' + i + ')').css('color', 'gray');
            }
        },
        click: function () {
            let evaluation =  parseInt($(this).index('.rank i')) % 5;
            let movieID = $(this).parent().parent().attr('class').split(' ')[1];
            $.ajax({
                url: "/setEvaluation",
                type: "POST",
                contentType: 'application/json',
                data: JSON.stringify({
                    movieId: movieID,
                    userId: userData['_id'],
                    evaluation: evaluation
                }),
                success: function(response) {
                    alert("Obrigado pelo voto!");
                    setUpContent();
                }
            });
        }
    }, '.fa-star');
});