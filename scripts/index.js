
/**
 * Crea el objeto global con toda la configuración de la página
 * @type {Object}
 */
window.p2kmgcl = {
    /**
     * Comprueba si un módulo de nombre name existe. Debe estar almacenado en el objeto modules de la clase. Además si se pasa un parámetro adicional, lo ejecutará con los argumentos restantes pasados
     * @param  {string} name Nombre del módulo
     * @param {boolean} execute Pasar true para ejecutar el módulo
     * @return {boolean} True si está disponible, false si no.
     */
    module: function (name, exec) {
        if (typeof p2kmgcl.modules[name] === 'function') {
            // Se ejecuta el módulo
            if (exec === true) {
                // Une todos los argumentos en una array, pero solo a partir del tercer argumento pasado
                argumentList = [];
                for (var i = 2; i < arguments.length; i++) {
                    argumentList.push(arguments[i]);
                }
                p2kmgcl.modules[name](argumentList);
            }
            return true;
        }
        return false;
    },

    // Módulos que podrán ejecutarse
    modules: {},

    // Ejecuta todos los métodos establecidos
    init: function () {
        p2kmgcl.module('infiniteScroll', true);
        p2kmgcl.module('cheatList', true);
        p2kmgcl.module('randomQuote', true);
        p2kmgcl.module('introWaypoint', true);
        p2kmgcl.module('showGoTop', true);
    }
};

$(function () { p2kmgcl.init(); });
