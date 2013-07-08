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
function module (modules, exec, args) {
    var $html = $('html');
        allAvailable = true,
        _module = null,
        _exec = null,
        _args = null,
        _opts = null;

    modules = (typeof modules === 'string') ? modules.split(' ') : modules;

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
            throw new Error('Invalid typeof module ' + (typeof modules[i]));
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
}
