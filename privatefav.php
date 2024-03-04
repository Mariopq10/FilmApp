<?php

require_once('./apiClasses/fav.php');

$api_utils = new ApiUtils();
$api_utils->setHeaders($api_utils::ALL_HEADERS);
$api_utils->displayErrors();

$authorization = new Authorization();
$authorization->comprobarToken();

$request = json_decode(file_get_contents("php://input"), true);

$favorito = new Favorito();

// Comprobacion de parametros
if (isset($_GET["id_usuario"])) {
    $id_usuario = $_GET["id_usuario"];
} else {
    $id_usuario = 0;
}

if(isset($_GET["id_pelicula"])){
   $id_pelicula = $_GET["id_pelicula"];
} else {
   $id_pelicula = 0;
}

    switch ($_SERVER['REQUEST_METHOD']) {
        case $api_utils::GET:
            $favorito->get($id_usuario);
            break;

        case $api_utils::POST:
            $favorito->create($id_usuario, $id_pelicula);
            break;

        case $api_utils::PUT:
            $favorito->update($request);
            break;

        case $api_utils::DELETE:
            $favorito->delete($id_usuario, $id_pelicula);
            break;

        default:
    }

$api_utils->response($favorito->status, $favorito->message, $favorito->data, $authorization->permises);
echo json_encode($api_utils->response, JSON_PRETTY_PRINT);

?>