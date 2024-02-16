// Función para mostrar u ocultar el segundo combo
export function mostrarSegundoCombo() {
    var primerCombo = document.getElementById("primerCombo");
    var segundoCombo = document.getElementById("segundoCombo");
    
    if (primerCombo.value === "opcion2") {
      segundoCombo.disabled = false;
    } else {
      segundoCombo.disabled = true;
    }
  }
  
  // Función para imprimir "Hola" en un alert
  export function imprimeHola() {
    alert("Hola");
  }
  
  // Función para manejar la selección de la opción C en el segundo combo
  export function opcionCElegida() {
    // Obtener el valor seleccionado del segundo combo
    var seleccion = document.getElementById("segundoCombo").value;
    
    // Si se selecciona la opción C, mostrar un alert
    if (seleccion === "opcionC") {
      alert("Opción C elegida");
    }
  }
  