/**
 * Muestra el elemento de volver arriba cuando es necesario.
 */
function () {
    var $goTop = $('.goTop');

    $('.goTop').on('click', function () {
        $(document).off('scroll');
        $('body, html').animate({
            scrollTop: 0
        }, 1000);
    });

    $('#hcard-pablomolina').waypoint(function (direction) {
        if (direction === 'up') {
            $goTop.removeClass('shown');
        } else {
            $goTop.addClass('shown');
        }
    }, { offset: '-50%' });
}
