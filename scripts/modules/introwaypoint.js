/**
 * Crea una separación en la pantalla inicial que en principio
 * solo muestra la introducción.
 */
p2kmgcl.modules.introWaypoint = function () {
    // Añade la separación inicial
    $('.intro')
        .addClass('hiddenBlog')
        .waypoint(function (direction) {
            // Si vamos a ver el blog los mostramos
            if (direction === 'up') {
                $(this).addClass('hiddenBlog');
            } else {
                $(this).removeClass('hiddenBlog');
            }
        }, { offset: '25%' });
};
