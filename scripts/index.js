---
---

if (typeof less == 'undefined') { less = { env: "{{ site.less.env }}" }; {% include scripts/libs/less/less-1.3.3.min.js %} }
{% include scripts/libs/modernizr/modernizr-2.6.2-custom.min.js %}
{% include scripts/libs/prefixfree/prefixfree-1.0.3.min.js %}
if (typeof $ == 'undefined') { {% include scripts/libs/jquery/jquery-1.9.1.min.js %} }
{% include scripts/libs/jquery_waypoints/waypoints-2.0.2.min.js %}

/**
 * Crea el objeto global con toda la configuración de la página
 * @type {Object}
 */
window.p2kmgcl = new function () {
    var _me = this,
        _proto = this.constructor.prototype,
        _modules = {
            //infiniteScroll:   {% comment %}{% include scripts/modules/infinitescroll.js %}{% endcomment %},
            embedComment:       {% include scripts/modules/embedcomments.js %},
            introWaypoint:      {% include scripts/modules/introwaypoint.js %},
            programmingChart:   {% include scripts/modules/programmingchart.js %},
            randomQuote:        {% include scripts/modules/randomquote.js %},
            showGoTop:          {% include scripts/modules/showgotop.js %},
            localStorage:       {% include scripts/modules/localstorage.js %}
        };

    // Crea el método de carga de módulos
    _proto.module = {% include scripts/modules/_main.js %};
    return this;
};

// Llama a las funciones extra.
// p2kmgclCallbacks se crea en la plantilla structure/header.html
for (var i = 0; i < window.p2kmgclCallbacks.length; i++) {
    window.p2kmgclCallbacks[i]();
}
