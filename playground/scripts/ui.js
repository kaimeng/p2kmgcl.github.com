$(function () { var

    _$window   = $(window),
    _$output   = $(p2kmgcl.playground.outputWrapper),

    // Atajo a los editores
    _editors = p2kmgcl.playground.editors,

    // Porcentaje de ancho del editor
    _editorWidth = 0.5,

    // Muestra si está o no a pantalla completa
    _isFullScreen = false,

    /**
     * Redimensiona todos los elementos al cambiar de tamaño
     * la ventana del navegador.
     */
    _windowResizeHandler = function () {
        if (!_isFullScreen) {
            var newWidth = _$window.width(),
                editorWidth = parseInt(newWidth * _editorWidth, 10);

            _resizable.width(editorWidth);
            _$output.width(newWidth - editorWidth);
        }
    },

    /**
     * Hace que el editor de código pueda cambiarse
     * de tamaño
     */
    _resizable = $(_editors.el).resizable({
        grid: [1, Infinity],
        resize: function (event, ui) {
            _editorWidth = $(this).width() / _$window.width();
        }
    }),

    /**
     * Al pulsar f11 se pone a pantalla completa ;)
     */
    _fullScreenMode = function () {
        $(window).on('keydown', function (e) {
            var editorFocus = $('.CodeMirror-focused'),
                wrapper     = $(p2kmgcl.playground.el);

            if (e.which == 122 &&
                editorFocus.length > 0) {
                event.preventDefault();

                wrapper.toggleClass('p2kmgclEditorFullscreen');
                _isFullScreen = wrapper.hasClass('p2kmgclEditorFullscreen');

                if (_isFullScreen) {
                    editorFocus.addClass('CodeMirror-fullscreen-focus');
                } else {
                    $('.CodeMirror-fullscreen-focus')
                        .removeClass('CodeMirror-fullscreen-focus');
                }

                // Refresca las ventanas de edición
                for (var language in _editors.content) {
                    _editors.content[language].codemirror.refresh();
                }
            }
        });
    },

    _init = function () {
        // Al cambiar de tamaño la ventana...
        _$window.on('resize', _.debounce(_windowResizeHandler, 100));
        _fullScreenMode();
    };

    // Empezamos
    _init();
});
