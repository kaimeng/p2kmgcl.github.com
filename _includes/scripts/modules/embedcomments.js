/**
 * Añade los comentarios de disqus a la entrada actual para que el usuario pueda comentar.
 */
function (opts, args) {
    var $link       = $(args.link),
        $parent     = $link.parents('footer'),
        shortname   = args.shortname,
        identifier  = args.identifier,
        $disqus     = null,
        $htmlbody   = $('html, body'),
        $document   = $(document),

        // Se mueve hasta el pie de página del
        // artículo
        scrollToFooter = function (time, callback, offset) {
            $htmlbody.animate({
                scrollTop: $parent.offset().top
                            - $(window).height() / 5
                            + (offset || 0)
            }, time || 1, callback);
        },

        // Captura el scroll de la página para
        // que se quede justo en la lista de comentarios.
        // Solo captura 1 scroll
        catchScroll = function (callback) {
            $document.on('scroll', function (event) {
                scrollToFooter(1, function () {
                    $document.off('scroll');
                });
            });
        };

    // Esconde el enlace para mostrar los
    // comentarios
    $link.animate({ opacity: 0.5 }, 300);

    // Si había un link oculto, lo muestra
    if (opts.proto.$lastLink) {
        opts.proto.$lastLink
            .animate({ opacity: 1 }, 300)
            .attr('onclick', opts.proto.lastLinkOnClick);
    }
    opts.proto.$lastLink = $link;
    opts.proto.lastLinkOnClick = $link.attr('onclick');
    $link.removeAttr('onclick');

    // Actualiza las variables de disqus
    disqus_shortname = shortname;
    disqus_identifier = identifier;
    disqus_url = args.url;
    disqus_title = args.title;

    if (window.DISQUS) {
        $disqus = $('#disqus_thread');

        // Comprueba si la entrada anterior está por encima
        // o por debajo de la actual
        var difference = ($parent.offset().top > $disqus.offset().top) ?
                            -$disqus.height() : $disqus.height();

        scrollToFooter(900, catchScroll, difference);
        $disqus.slideUp(1000, function () {
                $disqus.appendTo($parent);
                DISQUS.reset({
                    reload: true,
                    config: function () {
                        this.page.identifier = identifier,
                        this.page.url = url
                    }
                });
                $disqus.slideDown(1);
                scrollToFooter();
            });
    } else {
        scrollToFooter(900, catchScroll);
        $disqus = $('<div id="disqus_thread"></div>');
        $disqus.appendTo($parent);

        var dsq = document.createElement('script');
            dsq.type = 'text/javascript';
            dsq.async = true;
            dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
        $('head').append(dsq);
    }
}
