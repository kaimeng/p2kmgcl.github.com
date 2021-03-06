---
---

{% include scripts/libs/highlightjs/highlightjs-7.3.min.js %}
window.p2kmgclCallbacks.push(function () { hljs.initHighlightingOnLoad(); });
{% if site.less.env == "development" %}if (typeof less == 'undefined') { less = { env: "{{ site.less.env }}" }; {% include scripts/libs/less/less-1.4.1.min.js %} }{% endif %}
{% include scripts/libs/modernizr/modernizr-2.6.2-custom.min.js %}
{% include scripts/libs/prefixfree/prefixfree-1.0.7.min.js %}
if (typeof $ == 'undefined') { {% include scripts/libs/jquery/jquery-1.10.2.min.js %} }
{% include scripts/libs/jquery_waypoints/waypoints-2.0.3.min.js %}

/**
 * Crea el objeto global con toda la configuración de la página
 * @type {Object}
 */
window.p2kmgcl = new function () {
    var _me = this,
        _proto = this.constructor.prototype,
        _modules = {
            //infiniteScroll:   {% comment %}{% include scripts/modules/infinitescroll.js %}{% endcomment %},
            embedComment:       {% include scripts/modules/minified/embedcomments.min.js %},
            introWaypoint:      {% include scripts/modules/minified/introwaypoint.min.js %},
            programmingChart:   {% include scripts/modules/minified/programmingchart.min.js %},
            randomQuote:        {% include scripts/modules/minified/randomquote.min.js %},
            showGoTop:          {% include scripts/modules/minified/showgotop.min.js %},
            keyCodeGetter:      {% include scripts/modules/minified/keycodegetter.min.js %},
            konamiCode:         {% include scripts/modules/minified/konamicode.min.js %},
            lorenaBirthday:     {% include scripts/modules/minified/lorenabirthday.min.js %}
        };

    // Crea el método de carga de módulos
    _proto.module = {% include scripts/modules/minified/main.min.js %};
    return this;
};

// Llama a las funciones extra.
// p2kmgclCallbacks se crea en la plantilla structure/header.html
for (var i = 0; i < window.p2kmgclCallbacks.length; i++) {
    window.p2kmgclCallbacks[i]();
}
// A partir de ahora todos los elementos insertados se ejecutan
// automáticamente
window.p2kmgclCallbacks.push = function (element) {
    element();
}
