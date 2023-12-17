document.addEventListener("DOMContentLoaded", function () {
    var elemento = document.documentElement;

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

    function desactivarPantallaCompleta() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }

    function manejarCambioOrientacion() {
        if (window.orientation === 90 || window.orientation === -90) {
            activarPantallaCompleta();
        } else {
            desactivarPantallaCompleta();
        }
    }

    // Activa el modo de pantalla completa al cargar la página
    activarPantallaCompleta();

    // Escucha el evento de cambio de orientación
    window.addEventListener("orientationchange", manejarCambioOrientacion);
});
