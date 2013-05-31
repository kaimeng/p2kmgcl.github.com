---
---

/**
 * Lista con las curiosidades de la web
 */
p2kmgcl.modules.cheatList = function ()  {
    var template = '{% include content/cheatlist.html %}',
        $el = $(template);

        // Añade la lista al final del blog si existe el scroll infinito
        if (p2kmgcl.module('infiniteScroll')) {
            $('.blog > .infiniteCongratulation').append($el);
        }
};
