/**
 * Muestra el elemento de volver arriba cuando es necesario.
 */
p2kmgcl.modules.showGoTop = function () {
    var $goTop = $('.goTop');

    $('.goTop').on('click', function () {
        $('body, html').animate({
            scrollTop: 0
        }, 1000);
    });

    $('.mainSidebar').waypoint(function (direction) {
        if (direction === 'up') {
            $goTop.removeClass('shown');
        } else {
            $goTop.addClass('shown');
        }
    }, { offset: '-50%' });
};
