<?php
/*
En este formulario, el usuario puede seleccionar un archivo de imagen local para cargarlo
en el servidor. El formulario enviará los datos al archivo upload.php utilizando el 
método POST y el tipo de codificación enctype="multipart/form-data" para permitir la 
carga de archivos.

Ahora, necesitas escribir el script PHP (upload.php) que manejará la carga de la imagen y 
el almacenamiento del nombre de la imagen en la base de datos MySQL. Asegúrate de tener una 
tabla llamada nombrefoto en una base de datos llamada demo con al menos dos columnas: 
id y nombre.

Aquí está el contenido del archivo upload.php:

*/

$servername = "localhost"; // Cambia esto si tu servidor MySQL está en una dirección diferente
$username = "usuario"; // Cambia esto por tu nombre de usuario de MySQL
$password = "contraseña"; // Cambia esto por tu contraseña de MySQL
$dbname = "demo"; // Cambia esto por el nombre de tu base de datos MySQL

// Conexión a la base de datos
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Procesamiento del archivo cargado
if(isset($_POST["submit"])) {
    $target_dir = "uploads/"; // Directorio donde se almacenarán las imágenes cargadas
    $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

    // Verificar si el archivo es una imagen real o un archivo falso
    if(isset($_POST["submit"])) {
        $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
        if($check !== false) {
            echo "El archivo es una imagen - " . $check["mime"] . ".";
            $uploadOk = 1;
        } else {
            echo "El archivo no es una imagen.";
            $uploadOk = 0;
        }
    }

    // Verificar si el archivo ya existe
    if (file_exists($target_file)) {
        echo "Lo siento, el archivo ya existe.";
        $uploadOk = 0;
    }

    // Verificar el tamaño del archivo
    if ($_FILES["fileToUpload"]["size"] > 500000) {
        echo "Lo siento, el tamaño del archivo es demasiado grande.";
        $uploadOk = 0;
    }

    // Permitir ciertos formatos de archivo
    if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
    && $imageFileType != "gif" ) {
        echo "Lo siento, solo se permiten archivos JPG, JPEG, PNG y GIF.";
        $uploadOk = 0;
    }

    // Verificar si $uploadOk está configurado en 0 por algún error
    if ($uploadOk == 0) {
        echo "Lo siento, su archivo no fue cargado.";
    // Si todo está bien, intentar cargar el archivo
    } else {
        if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
            echo "El archivo ". htmlspecialchars( basename( $_FILES["fileToUpload"]["name"])). " ha sido cargado.";

            // Insertar el nombre de la imagen en la base de datos
            $nombre_imagen = basename( $_FILES["fileToUpload"]["name"]);
            $sql = "INSERT INTO nombrefoto (nombre) VALUES ('$nombre_imagen')";
            if ($conn->query($sql) === TRUE) {
                echo "Nombre de la imagen almacenado en la base de datos.";
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }

        } else {
            echo "Lo siento, hubo un error al cargar su archivo.";
        }
    }
}

$conn->close();
/*
Este script PHP realiza las siguientes acciones:

Establece los parámetros de conexión a la base de datos MySQL.
Verifica la conexión con la base de datos.
Procesa el archivo cargado y lo mueve al directorio de carga uploads/.
Verifica si el archivo es una imagen válida y si cumple con ciertos criterios de tamaño y formato.
Almacena el nombre de la imagen en la tabla nombrefoto de la base de datos demo.

Asegúrate de cambiar los valores de $servername, $username, $password y $dbname 
por los adecuados para tu entorno de MySQL. Además, asegúrate de que el directorio 
de carga uploads/ tenga permisos de escritura adecuados para que PHP pueda mover los 
archivos cargados.

*/

?>
