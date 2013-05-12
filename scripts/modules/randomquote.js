/**
 * Muestra solo una de las notas de la cabecera.
 */
p2kmgcl.modules.randomQuote = function () {
    $('.randomQuotes > ul').each(function () {
        var $li = $(this).find(' > .quoteWrapper'),
            rand = parseInt(Math.random() * $li.size());

        if ($li.size() > 0) {
            $($li[rand]).addClass('chosen');
        }
    });
};
