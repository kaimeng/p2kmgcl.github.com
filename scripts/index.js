---
---

/**
 * Crea el objeto global con toda la configuración de la página
 * @type {Object}
 */
window.p2kmgcl = new function () {
    var _localKey = window.location.hostname,
        _localStorage = {},

        _proto = this.constructor.prototype,
        _modules = {
            //infiniteScroll:   {% comment %}{% include scripts/modules/infinitescroll.js %}{% endcomment %},
            embedComment:       {% include scripts/modules/embedcomments.js %},
            introWaypoint:      {% include scripts/modules/introwaypoint.js %},
            programmingChart:   {% include scripts/modules/programmingchart.js %},
            randomQuote:        {% include scripts/modules/randomquote.js %},
            showGoTop:          {% include scripts/modules/showgotop.js %}
        };

    /**
     * Comprueba si un módulo de nombre name existe. Debe estar almacenado en el objeto modules de la clase. Además si se pasa un parámetro adicional, lo ejecutará con los argumentos restantes pasados
     * @param  {string || Array} modules Nombre del módulo o módulos. Pueden pasarse varios con "m1 m2 m3" o pasando un array de cadenas ["m1", "m2"]. Si se quieren pasar argumentos se debe pasar un array de objetos:
     *  {
     *      name: "m1",
     *      exec: true,
     *      args: {}
     *  }
     * @param {boolean:false} execute Pasar true para ejecutar el módulo
     * @param {object:{}} args Objeto de argumentos pasados al módulo
     * @return {boolean} True si está disponible, false si no. En caso de pasar varios módulos, devuelve true si todos existen.
     */
    _proto.module = function (modules, exec, args) {
        var $html = $('html');
            allAvailable = true,
            _module = null,
            _exec = null,
            _args = null,
            _opts = null;

        modules = (typeof modules === 'string')
                    ? modules.split(' ')
                    : modules;

        if (!(modules instanceof Array)) {
            throw new Error('Module must be an array or string');
        }

        for (var i = 0; i < modules.length; i++) {
            if (typeof modules[i] === 'object') {
                _module = _modules[modules[i].name];
                _exec = modules[i].exec;
                _args = modules[i].args;
            
            } else if (typeof modules[i] === 'string') {
                _module = _modules[modules[i]];
                _exec = exec;
                _args = args;

            } else {
                throw new Error('Invalid typeof module '
                    + (typeof modules[i]));
            }

            if (typeof _module === 'function') {
                $html
                    .removeClass('no-js-module-' + modules[i])
                    .addClass('js-module-' + modules[i]);
                allAvailable = allAvailable && true;
            
                // Solo lo ejecutamos si se indica
                // así
                if (_exec === true) {
                    // Crea un objeto con varias opciones
                    // útiles para el módulo
                    _opts = {
                        proto: _module.prototype
                    };

                    _module(_opts, (typeof _args === 'object') ? _args : {});
                }
            } else {
                $html
                    .removeClass('js-module-' + modules[i])
                    .addClass('no-js-module-' + modules[i]);
                allAvailable = allAvailable && false;    
            }
        }

        // Si i vale 0 no había ningún
        // módulo así que devolverá false.
        return i && allAvailable;
    };

    /**
     * Obtiene datos del almacenamiento local
     * @param {string} key Cadena de texto que identifica su ubicación
     * @return {anything} El valor de la clave
     */
    _proto.getLocal = function (key) {
        return _localStorage[key];
    };

    /**
     * Actualiza la clave key con el valor val
     * @param  {string} key Clave que se quiere actualizar
     * @param  {anything} val Valor que quiere dársele
     * @return {this}
     */
    _proto.setLocal = function (key, val) {
        // Actualiza el valor
        _localStorage[key] = val;
        window.localStorage[_localKey] = JSON.stringify(_localStorage);

        return this;
    };

    /**
     * La carga ha terminado, empecemos con el lio.
     */
    _proto.init = function () {
        _localStorage = JSON.parse(window.localStorage[_localKey] || '{}');

        _proto.module([
            "introWaypoint",
            "programmingChart",
            "randomQuote",
            "showGoTop"
        ], true);

        return this;
    };

    return this;
};

// Modernizr
{% include scripts/libs/modernizr/modernizr-2.6.2-custom-36981.min.js %}
// Prefixfree
{% include scripts/libs/prefixfree/prefixfree-1.0.3.min.js %}

// Underscore
{% include scripts/libs/underscore/underscore-1.4.4.min.js %}
// jQuery
if (typeof $ == 'undefined') { {% include scripts/libs/jquery/jquery-1.9.1.min.js %} }

// jQuery Waypoints
{% include scripts/libs/jquery_waypoints/waypoints-2.0.2.min.js %}
{% include scripts/libs/jquery_waypoints/waypoints-infinite-2.0.2.min.js %}

// Lesscss
if (typeof less == 'undefined') {
less = { env: "{{ site.less.env }}" };
{% include scripts/libs/less/less-1.3.3.min.js %}
}

// Finalmente activa el tema
$(p2kmgcl.init);
