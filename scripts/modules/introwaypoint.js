/**
 * Crea una separación en la pantalla inicial que en principio
 * solo muestra la introducción.
 */
p2kmgcl.modules.introWaypoint = function () {
    // Añade la separación inicial
    $('.intro')
        .css('margin-bottom', '30em')
        .waypoint(function (direction) {

            // Si se mueve hacia abajo reducimos el margen
            // y si es para arriba lo aumentamos
            $(this).animate({
                'margin-bottom': (direction === 'up') ?
                    '30em' : '5em'
            }, 300);
        }, { offset: '25%' });
};
