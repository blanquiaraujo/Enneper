document.addEventListener("DOMContentLoaded", function() {
    var elemento = document.documentElement;
    var pantallaCompletaBtn = document.getElementById("pantallaCompletaBtn");

    // Verifica si la API de pantalla completa está disponible
    if (document.fullscreenEnabled ||
        document.webkitFullscreenEnabled ||
        document.mozFullScreenEnabled ||
        document.msFullscreenEnabled) {

        // Función para activar el modo de pantalla completa
        function activarPantallaCompleta() {
            if (elemento.requestFullscreen) {
                elemento.requestFullscreen();
            } else if (elemento.mozRequestFullScreen) {
                elemento.mozRequestFullScreen();
            } else if (elemento.webkitRequestFullscreen) {
                elemento.webkitRequestFullscreen();
            } else if (elemento.msRequestFullscreen) {
                elemento.msRequestFullscreen();
            }
        }

        // Función para ocultar el botón de pantalla completa
        function ocultarBoton() {
            pantallaCompletaBtn.style.display = "none";
        }

        // Función para mostrar el botón de pantalla completa
        function mostrarBoton() {
            pantallaCompletaBtn.style.display = "block";
        }

        // Asigna la función al hacer clic en el botón
        pantallaCompletaBtn.addEventListener("click", function() {
            activarPantallaCompleta();
            ocultarBoton();
        });

        // Asigna la función para mostrar el botón al salir del modo de pantalla completa
        document.addEventListener("fullscreenchange", function() {
            if (!document.fullscreenElement) {
                mostrarBoton();
            }
        });

        document.addEventListener("webkitfullscreenchange", function() {
            if (!document.webkitFullscreenElement) {
                mostrarBoton();
            }
        });

        document.addEventListener("mozfullscreenchange", function() {
            if (!document.mozFullScreenElement) {
                mostrarBoton();
            }
        });

        document.addEventListener("MSFullscreenChange", function() {
            if (!document.msFullscreenElement) {
                mostrarBoton();
            }
        });
    }
});
