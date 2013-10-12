function konamiCode () {
	konamiCode.prototype.konamiCodeMask =
	konamiCode.prototype.konamiCodeMask || 
	$(document.createElement('div'))
		.css({
			'background-color': '#000',
			'opacity': '0.8',
			'position': 'fixed',
			'top': 0,
			'left': 0,
			'width': '100%',
			'height': '100%'
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
			'text-align': 'center',
			'margin': '1em auto',
			'cursor': 'pointer'
		})
		.on('click', function () {
			konamiCode.prototype.konamiCodeMask.fadeOut(function () {
			konamiCode.prototype.konamiCodeMask.remove();
			konamiCode.prototype.inserted = false;
		})})
		.appendTo(konamiCode.prototype.konamiCodeMask);

	// Evita que se ejecute varias veces seguidas
	if (!konamiCode.prototype.inserted) {
        konamiCode.prototype.inserted = true;
        konamiCode.prototype.konamiCodeMask
            .hide()
            .appendTo(document.body)
            .fadeIn();
	}
};
