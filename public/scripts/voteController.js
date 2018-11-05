$(document).ready(function () {
    $(document).on ({
        mouseenter: function(){
            let starIndex =  parseInt($(this).index('.rank i'));
            let ulChildren = $(this).parent().parent();
            for (var i = 0; i <= starIndex%5; i++) {
                ulChildren.find('li:eq(' + i + ')').css('color', 'darkkhaki');
            }
        },
        mouseleave: function(){
            let starIndex =  parseInt($(this).index('.rank i'));
            let ulChildren = $(this).parent().parent();
            console.log(starIndex + " saiu");
            for (var i = 0; i <= starIndex%5; i++) {
                ulChildren.find('li:eq(' + i + ')').css('color', 'black');
            }
        }
    }, '.fa-star');
    // $(document).on('mouseenter', '.fa-star', function (it) {
        
    // }).on('mouseleave', 'fa-star', function (it) {
        
    // });
});