function konamiCode () {
	konamiCode.prototype.konamiCodeMask =
	konamiCode.prototype.konamiCodeMask || 
	$(document.createElement('div'))
        .hide()
        .appendTo(document.body)
		.css({
			'background-color': '#000',
			'opacity': '0.9',
			'position': 'fixed',
			'top': 0,
			'left': 0,
			'width': '100%',
			'height': '100%',
			'z-index': '9999'
		});
  
	konamiCode.prototype.konamiCodeText =
	konamiCode.prototype.konamiCodeText ||
	$(document.createElement('div'))
		.html('Konami')
		.css({
			color: 'red',
			'font-size': '8em',
			'font-weight': 'bolder',
			'text-align': 'center',
			'margin': '1em auto'
		})
		.appendTo(konamiCode.prototype.konamiCodeMask);
	
	konamiCode.prototype.konamiCodeLink =
	konamiCode.prototype.konamiCodeLink ||
	$(document.createElement('div'))
		.html('Pulsa aquí para ocultar este mensaje')
		.css({
			color: 'red',
			'font-size': '1.5em',
			'text-align': 'center',
			'margin': '1em auto',
			'cursor': 'pointer'
		})
		.on('click', function () {
			konamiCode.prototype.konamiCodeMask.fadeOut()
		})
		.appendTo(konamiCode.prototype.konamiCodeMask);

	// Evita que se ejecute varias veces seguidas
	if (!konamiCode.prototype.inserted) {
        konamiCode.prototype.konamiCodeMask.fadeIn();
	}
}
