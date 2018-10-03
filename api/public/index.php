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



function obtenerColonos($request) {
    global $conn;
    $emp = json_decode($request->getBody());
    $estado = $request->getAttribute('estado');
    $grupo = $request->getAttribute('grupo');
    $sql = filterByStatusOrGroup($sql,$estado,$grupo);
    $res = array();
    $acentos = mysqli_query($conn,"SET NAMES 'utf8'");

    if ($result = mysqli_query( $conn, $sql )){
        while ($row = mysqli_fetch_assoc($result)) {
        $row_array['id'] = $row['id'];
        $row_array['nombre'] = $row['nombre'].' '.$row['apellido'];
        $row_array['estado'] = $row['estado'];
        $row_array['semana1'] = $row['semana1'];
        $row_array['semana2'] = $row['semana2'];
        $row_array['grupo'] = $row['grupo'];
        $row_array['ingresado'] = $row['ts'];
        array_push($res,$row_array);
       }
     }
    mysqli_close($conn);
    echo json_encode(cleanUp($res), JSON_PRETTY_PRINT);
}

function obtenerColono($request) {
    global $conn;
    $emp = json_decode($request->getBody());
    $id = $request->getAttribute('id');

    //Chequear si es un ID o un nombre
    if(is_numeric($id)){
        $sql = "SELECT id, nombre, apellido, estado, grupo, semana1, semana2, ts FROM colonos WHERE id=".$id;
    } else{
        $search = str_replace(' ','[.]*',$id)."[.]*";
        $sql = "SELECT id, nombre, apellido, estado, grupo, semana1, semana2, ts FROM colonos WHERE nombre REGEXP'".$search."' OR apellido REGEXP'".$search."'";
    }
    $res = array();
    $acentos = mysqli_query($conn,"SET NAMES 'utf8'");

    if ($result = mysqli_query( $conn, $sql )){
        while ($row = mysqli_fetch_assoc($result)) {
        $row_array['id'] = $row['id'];
        $row_array['nombre'] = $row['nombre'].' '.$row['apellido'];
        $row_array['estado'] = $row['estado'];
        $row_array['semana1'] = $row['semana1'];
        $row_array['semana2'] = $row['semana2'];
        $row_array['grupo'] = $row['grupo'];
        $row_array['ingresado'] = $row['ts'];
        array_push($res,$row_array);
       }
     }

    if ($res != null){
    mysqli_close($conn);
    echo json_encode(cleanUp($res), JSON_PRETTY_PRINT);
    }else{
        echo 'No existe';
    }
}

// Filtering
function filterByStatusOrGroup($sql,$estado,$grupo){
    $toAdd = '';
    if($estado == 'todos')
        {
            $foo = true;
        }
    else
        {
            $foo = false;
            $toAdd = ' WHERE estado='.$estado;
        }
    //Si ya filtramos por estado
    if($foo)
    {
        if($grupo != 'todos')
        {
            $toAdd = ' WHERE grupo='.$grupo;
        }
    }else{
        if($grupo != 'todos')
        {
            $toAdd = ' AND grupo='.$grupo;
        }
    }
    return $sql = "SELECT id, nombre, apellido, estado, grupo, semana1, semana2, ts FROM colonos".$toAdd;
}

//Cleaning

function cleanUp($res){
    //loop over the array
    foreach ($res as $index => $entry) {

        // loop over every attribute
        foreach ($entry as $entryIndex => $value) {
            // preparing data
            $res[$index][$entryIndex] = byField($entryIndex, $value);
            }
        }
    return $res;
}

function byField($entryIndex,$value){
    // Dealing with names
    if($entryIndex == 'nombre'){
        $value = ucwords(strtolower($value));
    }
    // Dealing with states
    if($entryIndex == 'estado'){
        $value = returnStatus($value);
    }
    // Dealing with groups
    if($entryIndex == 'grupo'){
        $value = returnGroup($value);
    }
    // Dealing with weeks
    if($entryIndex == 'semana1' || 'semana2'){
        $jsonValues = ['js','jc','null'];
        $newValues = ['Jornada Simple','Jornada Completa','No Asiste'];
        $value = str_replace($jsonValues, $newValues, $value);
    }
    return $value;
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
            $value = "En Espera";
        break;
    }
    return $value;
}

function returnGroup($value){
    switch ($value){
        default:
            $value = 'Grupo '.$value;
        break;
        case 0:
            $value = 'No Asignado';
        break;
        }
        return $value;
}