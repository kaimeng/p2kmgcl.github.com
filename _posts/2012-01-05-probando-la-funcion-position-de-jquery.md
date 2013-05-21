---
layout: post
title: Probando la función "position" de jQuery UI
Cover: http://3.bp.blogspot.com/-LSFtjMtQnU8/TxrH_qzeS6I/AAAAAAAAKfs/vrSl6XBAvcQ/s320/2510326188_2d113eb317_b.jpg
image: Conferencia de jQuery en Tokio
tags: [Javascript, jQuery, jQuery UI, Programación]
---

Esta nueva función de jQuery UI permite posicionar un elemento junto a otro de la forma más sencilla posible. Para ver la sencillez no hay más que ver la sintaxis:

 > Mi izquierda a la derecha del objeto (my left at right of object).

Además permite posicionar en las esquinas (left top, right bottom...), dejar una separación en un determinado lado y especificar si queremos que el objeto sufra algún tipo de colisión durante su posicionado.

Aquí dejo un ejemplo sencillo:

    var o1 = $("selector1"),
        o2 = $("selector2");

    o1.position({
        my: "left",
        at: "right",
        of: o2
    });

Con esto dejaría al primer objeto a la derecha del segundo.

Para probarlo he creado la siguiente animación en JavaScript. Los objetos Box y Square están fijos y cuando se pase el ratón por encima el objeto Tip! se pondrá a su derecha. Para ver el código y unas pocas modificaciones que lo hacen más vistoso pinchad en le link a jsbin de más abajo.

 - Código fuente ~ [jsBin](http://jsbin.com/ogenom/6/edit)
 - Imagen ~ [Flickr](http://www.flickr.com/photos/iandeth/2510326188/)
 - Enlace ~ [jQuery UI Position](http://jqueryui.com/demos/position/)
