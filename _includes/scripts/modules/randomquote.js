/**
 * Muestra solo una de las notas de la cabecera.
 */
function randomQuote () {
    $('#randomQuotes > ul').each(function () {
        var $li = $(this).find(' > .quoteWrapper'),
            $old = $(this).find(' > .quoteWrapper.chosen'),
            rand = parseInt(Math.random() * $li.size(), 10);

        // Si habia notas esconde la vieja y muestra la nueva
        if ($li.size() >= 1) {
            $old.removeClass('chosen');
            $($li[rand]).addClass('chosen');
        }
    });
}
