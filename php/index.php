<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enlaces desde Archivo de Texto</title>
</head>
<body>

<?php
$archivo = 'enlaces.txt';

// Verificar si el archivo existe
if (file_exists($archivo)) {
    // Leer el archivo línea por línea
    $lineas = file($archivo, FILE_IGNORE_NEW_LINES);

    // Generar enlaces HTML
    foreach ($lineas as $linea) {
        $nombre_archivo = trim($linea); // Eliminar espacios en blanco
        echo '<a href="' . $nombre_archivo . '.html">' . $nombre_archivo . '</a><br>';
    }
} else {
    echo 'El archivo no existe.';
}
?>

</body>
</html>
