/**
 * Muestra el elemento de volver arriba cuando es necesario.
 */
p2kmgcl.modules.showGoTop = function () {
    var $goTop = $('.goTop');

    $('.mainSidebar').waypoint(function (direction) {
        if (direction === 'up') {
            $goTop.removeClass('shown');
        } else {
            $goTop.addClass('shown');
        }
    }, { offset: '-50%' });
};
