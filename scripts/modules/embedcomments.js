/**
 * Añade los comentarios de disqus a la entrada actual para que el usuario pueda comentar.
 */
p2kmgcl.modules.embedComment = function (data) {
    var $link       = $(data[0]),
        $parent     = $link.parent(),
        identifier  = data[1],
        url         = data[2],
        $disqus     = null,
        velocity    = 500
        dblVelocity = velocity * 2;

    $link.animate({
        opacity: 0
     }, velocity / 2, function () {
        $link.remove();
    });

    if (window.DISQUS) {
        $disqus = $('#disqus_thread');
        $disqus.appendTo($parent);

        DISQUS.reset({
            reload: true,
            config: function () {
                this.page.identifier = identifier,
                this.page.url = url
            }
        });
        
    } else {
        $disqus = $('<div id="disqus_thread"></div>');
        $disqus.appendTo($parent);
        disqus_identifier = identifier;
        disqus_url = url;

        var dsq = document.createElement('script'); dsq.type = 'text/javascript';
        dsq.async = true;
        dsq.src = 'http://' + disqus_identifier + '.disqus.com/embed.js';
        $('head').append(dsq);
    }

    $disqus.on('load', function () {
        $('html, body').animate({
            scrollTop: $parent.offset().top
                        - $disqus.height()
        }, 1000);
    });
};
