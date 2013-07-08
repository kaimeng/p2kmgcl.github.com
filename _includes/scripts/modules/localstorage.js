function localStorate () {
    var _localKey = window.location.hostname + '_p2kmgcl',
        _localStorage = null,
        _localTimeout = null,
        _localCallbacks = [];

    /**
     * Obtiene datos del almacenamiento local
     * @param {string} key Cadena de texto que identifica su ubicación
     * @param {function} callback Se ejecutará cuando la carga esté completa,
     *  se tomará como parámetro el nombre de la clave y su valor
     * @return {anything} El valor de la clave
     */
    _proto.getLocal = function (key, ready) {
        if (_localStorage !== null) {
            if (typeof ready === 'function') {
                return ready(key, _localStorage[key]);
            } else {
                return _localStorage[key];
            }
        } else {
            _localCallbacks.push({
                fn: ready || console.log,
                key: key
            });
            return null;
        }
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

        // Guarda al pasar 1 segundo
        // para evitar guardados repetidos
        clearTimeout(_localTimeout);
        _localTimeout = setTimeout(function () {
            window.localStorage[_localKey] = JSON.stringify(_localStorage);
            _localTimeout = null;
        }, 1000);

        return this;
    };

    // Inicializa el objeto
    _localStorage = JSON.parse(window.localStorage[_localKey] || '{}');
    for (var i = 0; i < _localCallbacks.length; i++) {
        _localCallbacks[i].fn(  _localCallbacks[i].key,
                                _localStorage[_localCallbacks[i].key]);
    }
}
