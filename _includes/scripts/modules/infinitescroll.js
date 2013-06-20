/**
 * Genera un scroll infinito que sustituye la carga
 * página a página por un bonito scroll infinito mucho
 * más interesante.
 */
function (opts) {
    var $blog = $('.blog'),
        $pagination = $blog.find('> .pagination'),
        $infiniteContainer = $blog.find('> .infinite-container'),
        $congratulation = $('.infiniteCongratulation');

    // Escondemos la paginación. No es relevante
    // si nuestro scroll es infinitio
    $pagination.hide();

    // Caña!
    $infiniteContainer.waypoint('infinite', {
        container:          'auto',
        items:              '.infinite-item',
        more:               '.infinite-more-link',
        offset:             'bottom-in-view',
        loadingClass:       'infinite-loading',
        onBeforePageLoad:   function () {
            // Esconde los agradecimientos
            // (aún hay más)
            $congratulation.addClass('hidden');

            // Guarda la última entrada
            opts.proto.$lastEntry = $infiniteContainer.find('> .infinite-item:last-child');
        },
        onAfterPageLoad:    function () {
            // Vuelve a mostrarlos para
            // la próxima vez
            $congratulation.removeClass('hidden');

            // Colorea los trozos de código
            var $actualEntry = opts.proto.$lastEntry.next();

            while ($actualEntry.size() > 0) {
                $actualEntry.find('> .content > pre > code').each(function (codeBlock) {
                    hljs.highlightBlock(this);
                });
                $actualEntry = $actualEntry.next();
            }
        }
    });
}
