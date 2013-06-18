/**
 * Crea un gráfico a partir de la lista de habilidades de programación
 * y lo inserta en el currículum.
 */
p2kmgcl.modules.programmingChart = function () {
    var $curriculum = $(".page.curriculum"),
        $programming = $curriculum.find("> .programming"),
        $valueList = $programming.find("> ul"),
        $valueElements = $valueList.find("> li"),

        canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        $canvas = $(canvas),
        colors = [];

    $programming.append(canvas);

    $(window).on('resize', (function () {
        if ($valueList.size() > 0) {
            var elementHeight = parseInt($valueList.css('font-size')) * 2,
                elementLowHeight = elementHeight - 5;

            canvas.width = $curriculum.width() * 0.65;
            canvas.height = $valueElements.size() * elementHeight;

            var maxWidth = canvas.width - 10,

                /**
                 * Genera un color aleatorio.
                 * Origen: http://stackoverflow.com/questions/1484506/random-color-generator-in-javascript
                 */
                getRandomColor = function () {
                    var letters = '0123456789ABCDEF'.split(''),
                        color = '#';
                    for (var i = 0; i < 6; i++ ) {
                        color += letters[Math.round(Math.random() * 15)];
                    }
                    return color;
                };

            $valueElements.each(function (index) {
                var color = colors[index] || getRandomColor();
                colors[index] = color;

                ctx.beginPath();
                ctx.moveTo(0, index * elementHeight + 5);
                ctx.rect(0, index * elementHeight + 5, maxWidth * parseFloat($(this).attr('data-level')) / 10, elementLowHeight);
                ctx.closePath();

                ctx.fillStyle = color;
                ctx.fill();
            });
        }
        return arguments.callee;
    }()));
};
