function konamiCode () {
	var parent = $('#hcard-pablomolina > figure'),
		element = parent.find('>.photo'),
		clone = element.clone(),
		text = $('<h1>Ab imo pectore</h1>'),
		$window = $(window),
		tam = Math.min($window.width() * 0.8, $window.height() * 0.7);
	
	// Empieza a cargar la imagen
	clone.attr('src', '{{ site.baseurl }}/assets/lorenayyo.jpg')
		.attr('title', 'Lorena y Pablo');
	
	// Coloca el elemento original en el centro de la pantalla
	element
	.css({
		position: 'fixed',
		top: element.offset().top,
		left: element.offset().left,
		'z-index': 99999
	})
	.animate({
		top: $window.height() / 2 - tam / 1.8,
		left: $window.width() / 2 - tam / 2,
		width: tam,
		height: tam
	
	// Al terminal, genera al elemento nuevo
	// y al texto correspondiente
	}, 1000, function () {
		clone
		.css({
			position: 'fixed',
			width: tam,
			height: tam,
			top: element.offset().top,
			left: element.offset().left,
			'z-index': 99998
		})
		.hide()
		.appendTo(parent);
		
		text
		.css({
			position: 'fixed',
			width: tam,
			top: element.offset().top + tam,
			left: element.offset().left,
			'text-align': 'center',
			'color': 'white',
			'font-size': '2em',
			'text-shadow': '0 0 0.1em black, 0 0 0.2em black, 0 0 0.2em black,\
			                0 0 0.5em black, 0 0 1em black',
			'z-index': 99998
		})
		.hide()
		.appendTo(parent);
		
		// Finalmente muestra todo
		clone.fadeIn(600);
		element.fadeOut(600, function () {
			text.fadeIn(600);
		});
	});
}
