
window.p2kmgcl = window.p2kmgcl || {};

p2kmgcl = {
    /**
     * Crea una navegación moderna (Carga dinámica de páginas)
     * Algunas ideas están sacas de csstricks: http://css-tricks.com/rethinking-dynamic-page-replacing-content/
     */
    modernNavigation: function () {
        var $mainContent = $('#mainContent'),
            $mainMenu = $('#mainMenu'),
            $pageTitle = $('head > title'),
            lastHeight = undefined,

        /**
         * Cambia la página actual a la indicada en _href. Si no se encuentra cargará la página 404.html.
         * @param  {string} _href Dirección que se quiere cargar.
         * @param {boolean} historyNav Si se especifica no se guarda el nuevo estado
         */
        navigate = function (_href, historyNav) {
            // Esconde la sección
            $mainContent.addClass('hidden');

            setTimeout(function () {
                $mainContent
                    .load(_href + ' #mainContent', function (result, status, data) {
                            
                        // Actualiza el menú principal
                        $mainMenu.html($(result).find('#mainMenu').html());
                        // Actualiza el título
                        $pageTitle.html('Pablo Molina | Piensa, inventa, comparte');
                        
                        // Quita el contenido duplicado (#mainContent > #mainContent)
                        $(this).children().unwrap();
                        $mainContent = $('#mainContent').addClass('hidden');

                        // Actualiza el historial
                        if (!historyNav) {
                            history.pushState(null, null, _href);
                        }

                        // Carga disqus
                        window.disqus_shortname = 'p2kmgcl'; 
                        window.disqus_identifier = window.location.path;
                        $.ajax({
                            type: "GET",
                            url: "http://" + disqus_shortname + ".disqus.com/embed.js",
                            dataType: "script",
                            cache: true
                        });

                        // Vuelve a mostrar todo
                        setTimeout(function () {
                            $mainContent.removeClass('hidden');
                        }, 0);
                    });
            }, 300);

            setTimeout(function () {
                $('html, body').animate({ scrollTop: 0 }, 150);
            }, 150);

            return false;
        };

        /**
         * Habilida volver atrás/adelante con un ligero retraso
         * Solución provisional encontrada en: http://dropshado.ws/post/15251622664/ignore-initial-popstate?7c2b3990
         * Solución mejorada y publicada: https://code.google.com/p/chromium/issues/detail?id=63040#c30
         */
        $(window).on('load', function () {
            setTimeout(function () {
                $(window).bind("popstate", function (event) {
                    var _href = location.pathname.replace(/^.*[\\/]/, "");
                    navigate(_href, true);
                });
            }, 0);
        });

        // Si el enlace es interno, carga la página deseada, si no sigue normalmente
        $(document).delegate('a', 'click', function (event) {
            var _href = $(this).attr('href');

            // Enlace interno, hagamos magia :)
            if (!/(http|https):\/\/.*/.test(_href) &&
                _href !== "javascript:void(0)") {

                // Transformamos la cadena
                if (!/.*\.(html|php)/.test(_href)) {
                    _href += '/index.html';
                }
                
                // Navega hasta el destino
                return navigate(_href);

            // Enlace externo :(
            }
        });
    },

    /**
     * Permite crear notificaiones con la clase alert, que se ocultan al pulsar en ellas
     */
    hideAlerts: function () {
        $('body').on('click', '.alert', function () {
            var $this = $(this);
            
            $this.addClass('hidden');
            setTimeout(function () {
                $this.remove();
            }, 300);
        });
    },

    /**
     * Inicializa todos los métodos
     */
    init: function () {
        if (Modernizr.history) {
            // p2kmgcl.modernNavigation();
        }

        p2kmgcl.hideAlerts();
    }
};

$(p2kmgcl.init);
