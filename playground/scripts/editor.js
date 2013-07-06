$(function () { p2kmgcl.playground = (function () { var
	// Objeto que engloba a todo el editor
	_el = document.querySelector('.p2kmgclEditor'),

	// Opciones por defecto que recibirán
	// las instancias de codemirror
	_codemirrorDefaults = {
		lineNumbers: true,
		lineWrapping: true,

		autoCloseBrackets: true,
		showTrailingSpace: true,
		autoCloseTags: true,
		continueComments: true,

		theme: 'solarized'
	},

	// Librerías de javascript que se incluirán
	_jsLibs = {
		path: 'libs',
		content: {
			'less':		'less/less-1.4.1.min.js',
			'jquery':	'jquery/jquery-1.9.1.min.js'
		}
	},

	// Instancias de codemirror
	// que se usarán
	_editors,

	// Salida del código
	_outputWrapper = _el.querySelector('.output'),
	_outputFrame,
	_outputWindow,
	_outputDocument,

	// Código generado
	_outputStyle,
	_outputScript,
	_outputHTML,

	/**
	 * Crea los editores de texto
	 * para cada lenguaje
	 * @param {array} opts.languages Lenguajes de los que se crearán los editores
	 */
	_createEditors = function (opts) {
		// Inicializa el objeto de los editores
		_editors = {
			el: _el.querySelector('.editors'),
			content: {}
		};

		var language,
			editorOptions,
			editorWrapper,
			codemirror;

		// Genera las instancias de codemirror
		for (var i = 0; i < opts.languages.length; i++) {
			language = opts.languages[i];

			// Carga las opciones por defecto
			editorOptions = _codemirrorDefaults;
			editorOptions.mode = language;

			// Crea un objeto que engloba al editor
			editorWrapper = document.createElement('textarea');
			editorWrapper.className = 'codemirrorEditor';
			_editors.el.appendChild(editorWrapper);

			codemirror = CodeMirror.fromTextArea(editorWrapper, editorOptions);
			codemirror.language = language;
			codemirror.display.wrapper.dataset.language = language;

			// Genera el objeto
			_editors.content[language] = {
				el: editorWrapper,
				codemirror: codemirror
			};
		}
	},

	/**
	 * Inicializa la salida de los editores
	 */
	_createOutput = function () {
		_outputFrame = document.createElement('iframe');
		_outputFrame.sandbox = 'allow-forms allow-same-origin allow-scripts allow-top-navigation';
		_outputWrapper.appendChild(_outputFrame);

		_outputWindow = _outputFrame.contentWindow;
		_outputDocument = _outputWindow.document;
		_outputStyle = _outputDocument.createElement('style'),
		_outputScript = _outputDocument.createElement('script');
	},

	/**
	 * Guarda los datos del editor en la base de datos
	 * local de HTML5
	 */
	_localSave = function () {
		p2kmgcl.setLocal('playground', new Date());
		p2kmgcl.setLocal('playground_style', _outputStyle);
		p2kmgcl.setLocal('playground_script', _outputScript);
		p2kmgcl.setLocal('playground_html', _outputHTML);
	},

	/**
	 * Carga los datos del editor desde localhost
	 */
	_localLoad = function () {
		p2kmgcl.getLocal('playground', function (key, val) {
			// Habia un guardado
			if (val) {
				_editors.content['less'].codemirror.setValue(p2kmgcl.getLocal('playground_style') || '');
				_editors.content['javascript'].codemirror.setValue(p2kmgcl.getLocal('playground_script') || '');
				_editors.content['htmlmixed'].codemirror.setValue(p2kmgcl.getLocal('playground_html') || '');
			}
		});
	},

	/**
	 * Actualiza la vista con el
	 * contenido de las entradas
	 */
	_updateOutput = _.debounce(function (codemirror, changes) {
		var	outputJsLibs  =  '';
			_outputStyle  =	_editors.content['less'].codemirror.getValue(),
			_outputScript =	_editors.content['javascript'].codemirror.getValue(),
			_outputHTML   =	_editors.content['htmlmixed'].codemirror.getValue();

		for (var lib in _jsLibs.content) {
			outputJsLibs += '<script src="' + _jsLibs.path + '/' +
				_jsLibs.content[lib] + '"></script>';
		}

		var outputCode   =	'<!DOCTYPE html><html>'+
							'<head><meta charset="utf-8" />'+
							'<style type="text/less">' + _outputStyle + '</style>'+
							'</head><body>'+ _outputHTML + outputJsLibs +
							'<script>' + _outputScript + '</script>'+
							'</body></html>';

		console.clear();
		_outputDocument.open();
		_outputDocument.write(outputCode);
		_outputDocument.close();
		_localSave();
	}, 250),

	/**
	 * Inicializa el editor y da vida al asunto
	 */
	_init = function () {
		_createEditors({
			languages: ['htmlmixed', 'less', 'javascript']
		});

		_createOutput();

		// Asigna los eventos de cambio
		// para actualizar la vista
		for (var language in _editors.content) {
			_editors.content[language]
				.codemirror.on('change', _updateOutput);
		}

		// Si existe el guardado local lo cargamos
		_localLoad();
	};

	// Comencemos
	_init();
	return {
		el: _el,
		editors: _editors,
		outputWrapper: _outputWrapper,
		output: _outputFrame
	};

}()); });
