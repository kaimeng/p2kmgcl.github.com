/**
 * Lista con las curiosidades de la web
 */
p2kmgcl.modules.cheatList = function ()  {
    var template = '<article class="cheatList">\
                <header><h1>Lista de trucos</h1></header>\
                \
                <ul>\
                    <li>Puedes volver a ver esta lista escribiendo en la página inicial <code>getcheatlist</code>.</li>\
                    <li>Si escribes el código Konami, encontrarás un bonito huevo de pascua.</li>\
                    <li>En realidad si mandas un correo a <strong>[loquequieras]@pablomolina.me</strong>, lo leeré.</li>\
                    <li>Puedes usar las distintas redes sociales .pablomolina.me para acceder a mis perfiles web (por ejemplo: <a href="http://plus.pablomolina.me">plus.pablomolina.me</a>).</li>\
                </ul>\
            </article>',
        $el = $(template);

        // Añade la lista al final del blog si existe el scroll infinito
        if (p2kmgcl.module('infiniteScroll')) {
            $('.blog > .infiniteCongratulation').append($el);
        }
};
