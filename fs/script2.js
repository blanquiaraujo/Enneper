document.addEventListener("DOMContentLoaded", function() {
    var elemento = document.documentElement;
    var pantallaCompletaBtn = document.getElementById("pantallaCompletaBtn");

    // Verifica si la API de pantalla completa está disponible
    if (document.fullscreenEnabled ||
        document.webkitFullscreenEnabled ||
        document.mozFullScreenEnabled ||
        document.msFullscreenEnabled) {

        pantallaCompletaBtn.style.display = "block"; // Muestra el botón solo si la API de pantalla completa es compatible

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

        // Asigna la función al hacer clic en el botón
        pantallaCompletaBtn.addEventListener("click", activarPantallaCompleta);

        // Función para activar el modo de pantalla completa al tocar la pantalla
        function verificarTocarPantalla() {
            activarPantallaCompleta();
        }

        // Asigna la función al evento de tocar la pantalla
        document.addEventListener("touchstart", verificarTocarPantalla);
    }
});
