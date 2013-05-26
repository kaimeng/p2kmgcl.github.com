---
layout: post
title: Creando una vistosa barra de progreso en HTML5
image: Barra resultado
tags: [CSS, Diseño web, HTML, Javascript, SVG, Tutoriales]
---

Viendo un tutorial rápido en [vectortuts](http://vector.tutsplus.com/tutorials/tools-tips/quick-tip-create-a-modern-volume-bar-with-adobe-illustrator/) he recordado que tenía ganas de probar qué se puede lograr con una imagen svg incrustada en el código de tu web. Pues bien, con este pequeño experimento he creado una barra de progreso (móvil, por supuesto) sumamente vistosa. Para los que quieran ver directamente los resultados he dejado al final del post un enlace a jsBin para que veáis cómo ha quedado. Los pasos que he seguido son los siguientes:

## Imagen vectorial

Siguiendo un poco el tutorial de la web mencionada anteriormente, he creado con [inkscape](http://inkscape.org/) la imagen vectorial que ha servido de base para la barra de progreso. Por facilidad también le he dado a la barra principal la etiqueta "principal" para poder referenciarla de forma más cómoda desde el código javascript.

Si no sabes lo que es una imagen vectorial o no has usado nunca un programa de este tipo, basta saber que se procesa más o menos cono un canvas en HTML5: no se guarda la información de los píxeles, sino el aspecto y las formas de la imagen -de ahí que se pueda incrustar el código en una web-.

## Insertando el código

Para insertar la imagen creada en la web no hay más que guardar la imagen como un archivo svg plano y seguidamente abrirla con un editor de texto. Es importante que sea svg plano y no del propio del programa para que los navegadores sepan interpretarlo correctamente.

Una vez abierto, copiamos todo el texto del contenido menos la primera o primeras líneas, ya que solo son la declaración del tipo de documento:

    <!--?xml version="1.0" encoding="UTF-8" standalone="no"?-->
    <!-- Created with Inkscape (http://www.inkscape.org/) -->

Ahora pegamos el texto copiado directamente en nuestro fichero html y voilá, ya tenemos la imagen insertada.

## Creando la animación

En resumen, lo que vamos a hacer a continuación es acceder al elemento "principal" del svg incrustado y vamos a modificar sus atributos "height" (altura) e "y" (posición vertical en el archivo svg).
La modificación de la posición vertical no es más que un detalle para que la barra se rellene de abajo a arriba y no al revés, pero no es necesario cambiar este atributo.

<a class="jsbin-embed" href="http://jsbin.com/ubiqex/19/embed?live"></a><script src="http://static.jsbin.com/js/embed.js"></script>

 - Resultado ~ [jsBin](http://jsbin.com/ubiqex/5/edit#preview)
