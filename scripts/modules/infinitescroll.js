/**
 * Genera un scroll infinito que sustituye la carga
 * página a página por un bonito scroll infinito mucho
 * más interesante.
 */
p2kmgcl.modules.infiniteScroll = function () {
    var $blog = $('.blog');

    // Escondemos la paginación. No es relevante
    // si nuestro scroll es infinitio
    $blog.find('> .pagination').hide();

    // Caña!
    $blog.find('> .infinite-container').waypoint('infinite', {
        container:          'auto',
        items:              '.infinite-item',
        more:               '.infinite-more-link',
        offset:             'bottom-in-view',
        loadingClass:       'infinite-loading',
        onBeforePageLoad:   function () {
            // Esconde los agradecimientos
            // (aún hay más)
            $('.infiniteCongratulation').addClass('hidden');
        },
        onAfterPageLoad:    function () {
            // Vuelve a mostrarlos para
            // la próxima vez
            $('.infiniteCongratulation').removeClass('hidden');
        }
    });
};
