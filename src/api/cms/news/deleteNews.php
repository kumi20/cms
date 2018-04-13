<?php

require '../jwt_helper.php';
include('../config/config.php');
header('Access-Control-Allow-Origin: *');  //I have also tried the * wildcard and get the same response
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Accept, AuthorizationToken');


    $data = json_decode(file_get_contents("php://input"));
    $id = $data->id;

    $q = "DELETE FROM cms_news WHERE news_id = $id";

    $r = mysqli_query($abc, $q);   

    $arr = array(
        'kod'=> 0,
        'opis'=> 'Usunięto newsa'
      );

    echo $json_response = json_encode($q); 

?>