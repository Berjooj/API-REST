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
            setEvaluationStars();
        },
        click: function () {
            let _evaluation =  parseInt($(this).index('.rank i')) % 5;
            let movieID = $(this).parent().parent().attr('class').split(' ')[1];
            $.ajax({
                url: "/setEvaluation",
                type: "POST",
                contentType: 'application/json',
                data: JSON.stringify({
                    movieId: movieID,
                    userId: userData['_id'],
                    evaluation: _evaluation
                }),
                success: function(response) {
                    alert("Obrigado pelo voto!");
                    getEvaluationData();
                }
            });
        }
    }, '.fa-star');
});

function getEvaluationData () {
    $.ajax({
        dataType: "json",
        url: "/evaluation/" + userData['_id'],
        context: document.body,
        success: function (evaluationDataList) {
            evaluationMoviesDataList = evaluationDataList;
            setEvaluationStars();
        }
    });
}