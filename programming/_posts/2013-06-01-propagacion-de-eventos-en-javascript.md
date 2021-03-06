---
layout: post
title: Propagación de eventos en JavaScript
tags: [JavaScript, Eventos, Propagación]
image: Mano pegando un postit sobre un papel
imageOrigin: http://www.flickr.com/photos/29623457@N02/3298390603/
---

Desde JavaScript podemos reaccionar ante eventos como la carga de un elemento en concreto o un click en éste. También sabemos que si un elemento tiene asignado el evento click, hacer click en cualquier elemento que forme parte
del *padre* activará también el evento original. De esta forma:

    <span id="padre">
        <span id="hijo"></span>
    </span>

Si asignamos un evento a `padre` y hacemos click en `hijo`, el evento asignado al padre se lanzará igualmente.

Además sabemos que **los estilos y el comportamiento son conceptos completamente independiente**, es decir, nuestro CSS no afectará al navegador. Debido a esto si aplicando estilos *sacamos* al hijo del padre, los eventos seguirán funcionando perfectamente.

En el siguiente ejemplo `gchild` es hijo de `child` y de `parent`, y aunque con la posición absoluta lo hemos sacado de donde debería estar, los eventos siguen propagándose como si no hubiera pasado nada.

<pre class="_cssdeck_embed" data-pane="output" data-user="p2kmgcl" data-href="propagacion-de-eventos-en-javascript" data-version="0"></pre><script async src="http://cssdeck.com/assets/js/embed.js"></script>

Pero la pregunta es, ¿cómo ocurre esta propagación?, ¿en que orden se ejecutan estas funciones?, ¿puedo distinguir en que *estado* me encuentro?

## Orden de propagación

La explicación a todas estas preguntas se encuentra en los estándares definidos en la W3C, donde **se distinguen tres estados del evento**: `capturing`, `at target` y `bubbling` (se ejecutan en ese orden). La idea es la siguiente:

  1. Al ocurrir cualquier evento, la cadena de ejecución siempre comienza en el padre de todos (en caso del navegador el objeto `window`) y va descenciendo (`capturing`) hasta llegar al elemento en cuestión.
  2. Cuando llega al elemento, se ejecuta su evento (fase `in target`).
  3. Finalmente vuelve a propagarse *hacia arriba* hasta llegar al padre original (fase `bubbling`).

Siguiendo los estándares en el ejemplo anterior un click en el elemento `gchild` desencadenaría la siguiente ejecución:

  1. Evento de `parent` (fase `capturing`).
  2. Evento de `child` (fase `capturing`).
  3. Evento de `gchild` (fase `at target`).
  4. Evento de `child` (fase `bubbling`).
  5. Evento de `parent` (fase `bubbling`).

El problema está en que, como casi siempre en este mundillo, no todos los navegadores cumplen los estándares. Todos implementan la fase `target` y la fase `bubbling`, pero la fase `capturing` ha quedado en el olvido.

## Distinguiendo una fase de otra

Para saber en que fase nos encontramos cuando ejecutamos un evento, podemos comprobar la variable `eventPhase` que puede tener los valores 3 (capturing), 2 (bubbling) o 1 (at target). Además si no queremos recordarlos podemos comparar su valor con el de 3 variables constantes almacenadas en el objeto evento: `CAPTURING_PHASE`, `AT_TARGET` y `BUBBLING_PHASE`.

Además dentro de cada fase podemos distinguir dos objetos:

 - **target**: es el objeto que originó el evento.
 - **currentTarget**: es el objeto cuyos listeners originaron el evento.

La diferencia parece sutil, pero es algo realmente útil cuando necesitamos usar un elemento concreto. Nótese que el objeto `this` será el objeto al que le asignamos la función que soporta el evento (`obj.onclick = function`), así por término general sabemos que coincidirá con `currentTarget`.

Por último cabe destacar que *podemos detener la propagación* ejecutando el método `stopPropagation()` del objeto evento, así evitamos las repeticiones o comportamientos indeseados.

Y esto es todo por hoy, para más información podéis consultar la **referencia en [la web de w3schools](http://www.w3schools.com/jsref/dom_obj_event.asp)** donde se explica más detalladamente cada elemento del objeto event.
