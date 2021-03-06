function keyCodeGetter () {
	/**
	 * Obtiene la letra asociada a un código de teclado
	 * @param event Evento de teclado
	 */
	keyCodeGetter.prototype.displayChar = 
	keyCodeGetter.prototype.displayChar ||
	function (event) {
		var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
			charCode = (event.which) ? event.which : event.keyCode,
			letter = null;

		if (charCode >= 65 && charCode <= 90) {
			letter = alphabet.charAt(charCode - 65);
		} else {
			switch (charCode) {
				case 32: letter = ' '; break;
				case 13: letter = '┘'; break;
				case 17: letter = 'Ctrl'; break;
				case 37: letter = '←'; break;
				case 38: letter = '↑'; break;
				case 39: letter = '→'; break;
				case 40: letter = '↓'; break;
				case 186: letter = 'Ñ'; break;
				default: letter = charCode;
			}
		}
		return letter;
	};

	keyCodeGetter.prototype.dictionary =
	keyCodeGetter.prototype.dictionary || {
		'↑↑↓↓←→←→BA': function () { p2kmgcl.module('konamiCode', true); },
		'↑↑↓↓←→←→BA┘': function () { p2kmgcl.module('konamiCode', true); },
		'LORENA': function () { p2kmgcl.module('lorenaBirthday', true); }
	};

	keyCodeGetter.prototype.showWord =
	keyCodeGetter.prototype.showWord ||
	function () {
		keyCodeGetter.prototype.wordDOM
			.html(word.join(''))
			.fadeIn();
	};
		
	keyCodeGetter.prototype.checkWord = 
	keyCodeGetter.prototype.checkWord ||
	function () {
		var _word = word.join('');
		if (typeof keyCodeGetter.prototype.dictionary[_word] == 'function') {
			keyCodeGetter.prototype.dictionary[_word]();
		}
	};
		
	keyCodeGetter.prototype.forgetWord =
	keyCodeGetter.prototype.forgetWord ||
	function () {
		word = [];
		keyCodeGetter.prototype.wordDOM.fadeOut(function () {
			keyCodeGetter.prototype.wordDOM.html('');
		});
	};
		
	keyCodeGetter.prototype.addLetter =
	keyCodeGetter.prototype.addLetter ||
	function (event) {
		var letter = keyCodeGetter.prototype.displayChar(event);
		if (typeof letter == 'string') {
			word.push(letter);
			keyCodeGetter.prototype.showWord();

			clearTimeout(memory);
			memory = setTimeout(function () {
				keyCodeGetter.prototype.checkWord();
				keyCodeGetter.prototype.forgetWord();
			}, memorySize);
		}
	};

	keyCodeGetter.prototype.wordDOM =
	keyCodeGetter.prototype.wordDOM ||
	$(document.createElement('div'))
        .attr('id', 'keyCodeGetter')
        .hide()
        .css({
            'position': 'fixed',
            'bottom': '1em',
            'right': '1em',
            'padding': '0.1em 0.3em',
            'color': '#f1f1f1',
            'background-color': '#333',
            'border-color': 'solid #111 thin',
            'border-radius': '0.2em',
            'opacity': 0.9,
            'font-family': "Inconsolata, 'Inconsolata', Consolas, monospace"
        });
        
    var	word = [],
		memory = null,
		memorySize = 1000;

	$(document.body).append(keyCodeGetter.prototype.wordDOM);
	$(window).on('keydown', keyCodeGetter.prototype.addLetter);
}
