Title: Sublime Text - Un editor de texto sublime
Cover: http://1.bp.blogspot.com/-QGeI-P_WA7A/T7kAAH9G4TI/AAAAAAAAZQs/1cf2S_yIQXo/s1600/sublimetext.jpg
CoverName: SublimeText con los temas claro y oscuro
Tags: CSS, Herramientas, HTML, Javascript, Programación

Como programador que soy, me gusta explorar en busca de nuevas herramientas que hagan la tarea de crear un programa o una web más fácil o más entretenida. Pues bien, hace ya unos meses que uso esta herramienta, y creo que es algo digno de mención.

# Descripción

A grandes rasgos es un editor de texto multiplataforma escrito en python, pero cuando lo hayáis probado este programa veréis que la ligereza que tiene no está reñida con su potencia. Y es que en Sublime Text puede personalizarse cada milímetro de la interfaz para hacer el que sea la herramienta la que se adapte a su dueño, y no al revés.

Esta personalización va desde snippets (atajos que hacen que programar sea más automático) hasta plugins, temas y la personalización de todas las combinaciones de teclas del programa. Podemos crear nuestras propias herramientas y publicarlas para compartir nuestra forma de trabajar. Si googleáis un poco no es difícil encontrar como configurarlo, pero os dejo un enlace al final de la web que tenéis que visitar para saber como instalar plugins y demás.

Más allá de la personalización, el programa cuenta con cosas tan fascinantes como multiselección (que si encima no sabes lo que es como me pasaba a mí alucinarás), reordenación de código, comprobación de ortografía, capacidad de crear proyectos o un minimapa del documento actual.

En cuanto a la descarga e instalación, al final de la entrada podéis ver un enlace con la web donde podéis descargarlo. El autor concede una prueba gratuita por tiempo indefinido para uso personal pero si deseáis recibir las actualizaciones más frecuentemente o queréis usarlo en una empresa tendréis que comprar la licencia por unos 46€ (el precio se reduce conforme compráis un mayor número). Una vez comprada tenéis derecho a instalar el programa en todos los equipos y plataformas que deseéis (cumpliendo la promesa de que una licencia es para un solo usuario).

# Mi configuración

Por último dejo una lista de plugins y temas que uso tras haberlo probado en profundidad. Tengo que decir que tras haberlos instalado todos y haber visto como quedaba la carpeta de configuración con todos los plugins tan sólo ocupa 13MB (incluídos los paquetes de serie) y el programa se abre en apenas una fracción de segundo. Dicho esto la lista de plugins es:

 - **Abacus**: Este plugin permite seleccionar un bloque de texto y tabular el contenido para que se quede bien nivelado. En este caso creo que un ejemplo lo explica perfectamente:

```
:::js
// Texto original
var uno = 0;
var dieciocho = 0;

// Texto nivelado
var uno       = 0;
var dieciocho = 0;
```

 - **Colorpicker**: Creo que el nombre lo dice por sí solo: abre una ventana para que seleccionemos un color e inserta el código del color correspondiente.
 - **DocBlockr**: Este plugin facilita escribir documentación tipo Doxygen creando los bloques de comentario automáticamente (añade parámetros, valores devueltos por funciones...).
 - **Livereload**: Este plugin me ha dado la vida. Combinado con una extensión para chrome o firefox (no estoy seguro de si está para más plataformas) y con un servidor local correctamente configurado, recarga automáticamente la vista de lo que estamos editando sin que tengamos que refrescar la página, tan sólo guardando el archivo. Además cuando editamos un archivo css sólo recarga la hoja de estilos, no la web entera, por lo que editar y ver como queda se hace coser y cantar.
 - **SidebarEnhancements**: De serie la barra lateral tiene muy pocas funcionalidades (en las próximas versiones el autor tiene pendiente optimizar este aspecto), pero este plugin añade varias opciones como crear y eliminar archivos/carpetas, abrir la carpeta de un archivo o abrir archivos con una aplicación concreta.
 - **SideBarGit**: Integra la barra lateral con un repositorio git mostrando la rama en la que estamos y permitiendo hacer todas las operaciones disponibles así como abrir gitk, gitgui o el programa que tengamos configurado para mostrar las diferencias entre archivos.
 - **SublimeTODO**: Con una llamada a este plugin muestra todas las tareas de los archivos abiertos o del proyecto con enlaces a ellas. Se puede configurar para que busque la etiqueta que deseemos (TODO, FIXME...).
 - **Theme Soda**: No es más que un tema para sublime text, pero los que quieran tener una interfaz sin colores oscuros instalarán esta extensión y darán gracias a su creador.
 - **YUICompressor**: Para quien no lo conozca, este programa convertido en plugin es un compresor de archivos JavaScript y CSS que nos permite minimizar el tamaño de estos archivos eliminando espacios, saltos de línea, comentarios y, en el caso de javascript, sustituyendo los nombres de las variables por nombres cortos (a,b,c...). Es la "compilación" que se utiliza para estos archivos.
 - **Zen Coding**: Eso es, los chicos de Zen Coding también tienen una extensión para Sublime Text que nos permite adoptar este estilo de generación de HTML tan potente.

-----
 - Enlace ~ [Sublime Text](http://www.sublimetext.com/2)
 - Configuración ~ [wbond.net](http://wbond.net/sublime_packages/package_control)
