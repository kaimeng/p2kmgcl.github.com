/**
 * Añade los comentarios de disqus a la entrada actual para que el usuario pueda comentar.
 */
p2kmgcl.modules.embedComment = function (data) {
    var $link       = $(data[0]),
        $parent     = $link.parents('footer'),
        identifier  = data[1],
        url         = data[2],
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
    if (p2kmgcl.modules.embedComment.prototype.$lastLink) {
        p2kmgcl.modules.embedComment.prototype.$lastLink
            .animate({ opacity: 1 }, 300);
        p2kmgcl.modules.embedComment.prototype.$lastLink.attr('onclick', p2kmgcl.modules.embedComment.prototype.lastLinkOnClick);
    }
    p2kmgcl.modules.embedComment.prototype.$lastLink = $link;
    p2kmgcl.modules.embedComment.prototype.lastLinkOnClick = $link.attr('onclick');
    $link.removeAttr('onclick');

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
        
        disqus_identifier = identifier;
        disqus_url = url;

        var dsq = document.createElement('script');
            dsq.type = 'text/javascript';
            dsq.async = true;
            dsq.src = 'http://' + disqus_identifier + '.disqus.com/embed.js';
        $('head').append(dsq);
    }
};
