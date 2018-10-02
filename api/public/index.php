<?php
if (PHP_SAPI == 'cli-server') {
    // To help the built-in PHP dev server, check if the request was actually for
    // something which should probably be served as a static file
    $url  = parse_url($_SERVER['REQUEST_URI']);
    $file = __DIR__ . $url['path'];
    if (is_file($file)) {
        return false;
    }
}

require __DIR__ . '/../vendor/autoload.php';
require 'dbConn.php';

session_start();

// Instantiate the app
$settings = require __DIR__ . '/../src/settings.php';
$app = new \Slim\App($settings);

// Set up dependencies
require __DIR__ . '/../src/dependencies.php';

// Register middleware
require __DIR__ . '/../src/middleware.php';

// Register routes
require __DIR__ . '/../src/routes.php';


$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

// Run app
$app->run();



function obtenerColonos($response) {
    global $conn;
    $sql = "SELECT * FROM colonos";
    $res = array();
    $acentos = mysqli_query($conn,"SET NAMES 'utf8'");

    if ($result = mysqli_query( $conn, $sql )){
        while ($row = mysqli_fetch_assoc($result)) {
        $row_array['id'] = $row['id'];
        $row_array['nombre'] = $row['nombre'].' '.$row['apellido'];
        $row_array['estado'] = $row['estado'];
        $row_array['semana1'] = $row['semana1'];
        $row_array['semana2'] = $row['semana2'];
        $row_array['grupo'] = 'Grupo '.$row['grupo'];
        $row_array['ingresado'] = $row['ts'];
        array_push($res,$row_array);
       }
     }
    mysqli_close($conn);
    echo json_encode(cleanUpNames($res), JSON_PRETTY_PRINT);
}

function cleanUpNames($res){

        $jsonValues = ['js','jc','null'];
        $newValues = ['Jornada Simple','Jornada Completa','No Asiste'];

        //loop over the array
        foreach ($res as $index => $entry) {

            // loop over every attribute
            foreach ($entry as $entryIndex => $value) {
                // dealing with names
                if($entryIndex == 'nombre'){
                    $value = ucwords(strtolower($value));
                    $res[$index][$entryIndex] = $value;
                }
                // dealing with states
                if($entryIndex == 'estado'){
                    $value = returnStatus($value);
                    $res[$index][$entryIndex] = $value;
                }
                //dealing with weeks
                if($entryIndex == 'semana1' || 'semana2'){
                    //replace the value and save it back to the array
                    $res[$index][$entryIndex] = str_replace($jsonValues, $newValues, $value);
                }

                }
            }

        return $res;
    }

function cleanUpNamesB($res){
    $jsonvalues   = array("js", "jc", "null");
    $newvalues = array("Jornada Simple", "Jornada Completa", "No asiste");

    $res = str_replace($jsonvalues, $newvalues, $res);
    return $res;
}

function returnStatus($value){
    switch ($value) {
        case 0:
            $value = "Pendiente";
        break;
        case 1:
            $value = "Aprobado";
        break;
        case 2:
            $value = "Denegado";
        break;
        case 3:
            $value = "En lista de espera";
        break;
    }
    return $value;
}
