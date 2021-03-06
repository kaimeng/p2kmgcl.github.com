---
layout: post
title: MVC I - Reproductor de música HTML5 con Backbone. Parte I - SongModel
image: Reproductor de música
tags: [Backbone, CSS, HTML, Javascript, jQuery, MVC, MVC1, Música, Programación, Reproductor]
---

Llevo unos días probando la librería Backbone.js, una librería que implementa el MVC (Modelo Vista Controlador) en JavaScript para proporcionar una abstracción de la información manejada en una aplicación y no tener que guardar todo en el DOM. Esto es especialmente útil cuando quieres manejar datos en el cliente mediante JavaScript, ya que sin abstracciones como ésta puedes acabar haciendo *código espagueti* sin darte cuenta.

Si no conocías esta librería y quieres aprender como funciona o cual es la idea de esta estructura en general, te recomiendo que le eches un vistazo a [Backbone fundamentals](https://github.com/addyosmani/backbone-fundamentals), un libro completamente gratuito que merece la pena leer.

Para probar definitivamente la librería, he intentado hacer algo distinto a la clásica aplicación de lista de tareas que he visto en todas partes, así que lo que vamos a desarrollar es un reproductor de música que contendrá:
 
 - **SongModel**: Un modelo que guarda la información de una canción y permite reproducirla.
 - **PlayerView**: Un reproductor que mostrará la información de la canción y unos controles para manejar la reproducción. Esta vista además se divide en:
   - **La clase PlayerView**: es la que interactúa con el modelo de canción que creamos.
   - **La plantilla del reproductor**: Esto es básicamente HTML + CSS, pero vamos a dedicarle unos minutos para que veáis como usar plantillas con las vistas.
 - **ApplicationModel (& View)**: Una aplicación que básicamente construye los anteriores elementos y los inserta en el DOM.

## Primera parte: SongModel

Antes de comenzar debo mencionar algo que seguramente notaréis: aunque en teoría usamos esta librería para poder abstraernos del DOM, el modelo SongModel tendrá un atributo domElement. Puede parecer una contradicción, pero vamos a usarlo exclusivamente para reproducir la canción (ni si quiera lo insertaremos en el DOM), así que la abstracción sigue latente ;).

### Estructura de la clase

Primero vamos a definir qué queremos hacer con nuestra canción, creando la estructura de la clase que poco a poco iremos rellenando. Las acciones comunes en una canción son:

 - Reproducir la canción.
 - Pausar la reproducción.
 - Seguir la reproducción por donde iba.
 - Detener la reproducción.
 - Cambiar el volumen.
 - Reproducir un instante concreto.
 - Comprobar si la canción se está reproduciendo.

Ahora creemos la estructura del modelo que nos permitirá hacer todo esto. Para ello creamos diversos métodos para cada una de las acciones que acabamos de mencionar.

    SongModel = Backbone.Model.extend({
        // Soy un constructor ^^
        initialize: function () {},
     
        play: function () {},
        togglePause: function () {},
        stop: function () {},
        setVolume: function () {},
        setTime: function () {},
        isPaused: function () {}
    });

Ahora tenemos que añadir algunos atributos que nos serán útiles para reproducir la canción. Backbone se encarga de almacenarlos cuando son pasados al constructor, pero nosotros vamos a definirlos para asegurarnos de que al menos existen:

    SongModel = Backbone.Model.extend({
        defaults: {
            title: '',
            artist: '',
            albumTitle: '',
            albumCover: '',

            elapsedTime: -1,
            totalTime: -1,
            volume: -1,
     
            songUrl: {},
            domElement: {}
        },
     
        /** Resto del modelo... */
    });

 > Backbone permite crear un método validates que comprueba en la validez de los atributos, pero vamos a obviarlo por sencillez en la aplicación.

### Initialize()

Este método será el primero en ejecutarse cada vez que creemos una instancia de la clase. En nuestro caso lo único que necesitamos es crear un objeto domAudio si no nos lo han pasado:

    initialize: function (params) {
        if (!params.domElement) {
            this.set('domElement',
                document.createElement('audio'));
        }
    }

Como he dicho antes, en caso de que `params.domElement` exista, no necesitamos almacenarlo, Backbone lo hará por nosotros.

#### Nota: Eventos y fin de reproducción

Una de las muchas ventajas que ofrece Backbone, es el manejo de eventos personalizados. Así con el método `trigger()` podemos activar un evento cuando lo creamos oportuno. A lo largo de la aplicación crearemos eventos personalizados que comenzarán por `song:`. Este comienzo no es obligatorio, tan solo nos ayuda a mantener un orden en la aplicación.

Como primer evento vamos a escuchar el evento `ended` del objeto que hemos creado, y relanzarlo como `song:end` para notificar que la canción a finalizado.

    initialize: function (params) {
        /* ... */
     
        // Prepara el evento de fin de reproducción
        var me = this,
            dom = me.get('domElement');
        dom.addEventListener('ended', function () {
            me.setTime(0);
            me.trigger('song:end');
                });
     
        return this;
    }

### Play()

Lo que haremos en este momento será comprobar si la canción ha sido cargada, y en caso de que no lo haya hecho prepararla y empezar la reproducción cuando esté lista.

    play: function () {
        var dom = this.get('domElement');
     
        // La canción ya se está reproduciendo.
        // No hace falta hacer nada.
        if (dom.paused) {
     
            // Empezamos la carga de la cancion
            if (typeof dom.src === 'undefined' ||
                dom.src === '') {
                dom.src = this.get('songUrl');
                dom.preload = 'auto';
     
                // Nuestro volumen será un porcentaje
                // (de 0% a 100%)
                this.set('volume', dom.volume * 100);
            }
            // Mandamos la orden de reproducción
            // al objeto del DOM
            dom.play();
     
            // Lanza el evento de reproduccion
            this.trigger('song:play');
        }
        return this;
    }

Como vemos hemos lanzado un evento `song:play` para que cuando usemos este modelo desde fuera sepamos que efectivamente la reproducción ha empezado. Aún falta un pequeño dato, y es que mientras la canción esté en reproducción, necesitamos saber en que instante de ella nos encontramos. Para esto establecemos un intervalo que lo comprobará:

    play: function () {
        if (dom.paused) {
            /* ... */
     
            // Guarda el instante de reproducción
            var me = this;
            function getCurrentTime () {
                // Por si se acaba la reproducción
                if (!dom.paused) {
                    me.set({
                        'elapsedTime': dom.currentTime,
                        // Haremos esta misma comprobación cada
                        // segundo mientras se reproduzcala
                        // canción.
                        'elapsedTimeTimeout':
                            setTimeout(getCurrentTime, 1000)
                    });
     
                    // Si el total esta listo, lo obtiene
                    // Es posible que este dato tarde en cargar
                    // (cagará cuando haya cargado la canción).
                    // Por eso en el bucle vamos comprobando si
                    // está listo o no.
                    if (dom.readyState &&
                        me.get('totalTime') === -1) {
                        me.set('totalTime', dom.duration);
                    }
                }
            }
            getCurrentTime();
     
            /* ... */
        }
    }

### TogglePause()

Con este método podemos y alternando entre pausa y reproducción, pero vamos a añadir un pequeño matiz: una variable booleana `forcePause` que intente hacer siempre una pausa (por si queremos intentar detener la reproducción esté o no esté en ejecución). Lanzamos también un evento de pausa para notificaciones externas.

    togglePause: function (forcePause) {
        if (this.get('domElement').paused && !forcePause) {
            this.play();
        } else {
            this.get('domElement').pause();
            // Evento de pausa
            this.trigger('song:pause');
        }
        return this;
    }

### Stop()

Esto es de lo mas sencillo, nos apoyamos en el método anterior para pausar la reproducción, y luego ponemos la canción en el instante 0, ya que es el comportamiento habitual en los reproductores.

    stop: function () {
        this.togglePause(true);
        this.setTime(0);
        return this;
    }

### SetVolume()

Para cambiar el volumen necesitamos una variable para el nuevo volumen. Aunque el objeto del DOM maneja el volumen con un valor entre 0 y 1, nosotros usaremos un porcentaje, que es bastante más claro de cara al usuario (usaremos algo similar en `setTime`).

    setVolume: function (volume) {
        var dom = this.get('domElement'),
            volume = volume / 100;
     
        // Comprobamos si se ha pasado por arriba o por abajo...
        dom.volume = volume < 0 ? 0
                   : volume > 1 ? 1
                   : volume;
        // Guardamos el volumen final
        this.set('volume', dom.volume * 100);
     
        // Evento de cambio de volumen
        this.trigger('song:changeVolume');
        return this;
    }

#### Opcional: Modificación con `alter`

Es una acción lógica querer subir o bajar el volumen sin conocer que valor exacto tiene, por ello añadimos un parámetro opcional `alter`, el cual provocará el que volumen pasado se sume al actual. He aquí la implementación y un ejemplo:

    setVolume: function (volume, alter) {
        volume = (!alter) ?
                    volume / 100 :
                    dom.volume + volume / 100;

        /* ... */
    }

    // Establecemos el volumen a 50
    setVolume(50);
     
    // Aumentamos el volumen 5 puntos
    setVolume(5, true);
    // Ahora el volumen es 55
     
    // Reducimos el volumen 25 puntos
    setVolume(-25, true);
    // Ahora el volumen es 30

### SetTime()

El cambio de tiempo se comportará de forma similar el cambio de volumen, ya que recibiremos un porcentaje y haremos una regla de tres para determinar a qué segundo se corresponde. También añadimos el parámetro `alter` para avanzar/retroceder en la reproducción.

En caso de que la canción no se haya cargado por completo no podemos determinar que segundo es, así que no haremos nada.

    setTime: function (time, alter) {
        var totalTime = this.get('totalTime');
     
        if (totalTime !== -1) {
            // Transforma el tiempo de porcentaje a segundos
            time = totalTime * time / 100;
     
            var dom = this.get('domElement'),
                time = !alter ? time : dom.currentTime + time;
     
            dom.currentTime = time < 0 ? 0
                            : time > totalTime ? totalTime
                            : time;
            this.set('elapsedTime', time);
     
            // Evento de cambio de tiempo
            this.trigger('song:changeTime');
        }
        return this;
    }

### IsPaused()

Y por último, si el usuario necesita saber si se está reproduciendo, puede usar este método.

    isPaused: function () {
        return this.get('domElement').paused;
    }

### Ejemplo final

Y esto es todo por hoy. Si queréis ver un ejemplo de lo que hemos implementado podéis hacerlo en el [siguiente ejemplo](http://codepen.io/p2kmgcl/full/ipEFL).

En las próximas entradas veremos la implementación de la vista, que hace que el reproductor sea bastante más atractivo. Gracias por vuestra lectura y ¡hasta la próxima!

 - Portada ~ [Flickr](http://www.flickr.com/photos/guidosportaal/4036379423/sizes/z/in/photostream/)
 - Ejemplo completo ~ [Codepen](http://codepen.io/p2kmgcl/full/ipEFL)
