<?php

require '../jwt_helper.php';
include('../config/config.php');
header('Access-Control-Allow-Origin: *');  //I have also tried the * wildcard and get the same response
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Accept, AuthorizationToken');


    $data = json_decode(file_get_contents("php://input"));

    $name = $data->name;
    $pageName = $name;
    $idPage = $data->id;

    $name = str_replace("ę","e", $name);
    $name = str_replace("ó","o", $name);
    $name = str_replace("ą","a", $name);
    $name = str_replace("ś","s", $name);
    $name = str_replace("ł","l", $name);
    $name = str_replace("ż","z", $name);
    $name = str_replace("ź","z", $name);
    $name = str_replace("ć","c", $name);
    $name = str_replace("ń","n", $name);
    $name = str_replace(" ","-", $name);
    $name = strtolower($name);


    $q = "UPDATE `cms_page` SET `page_name`='$pageName',`page_name_url`='$name' WHERE `page_id`='$idPage'";
    $r = mysqli_query($abc, $q); 
    
    if($r){
        $arr = array(
            'kod'=> 0,
            'opis'=> 'Zmieniono nazwe'
          );
    }
    else{
        $arr = array(
            'kod'=> -1,
            'opis'=> 'Błąd dodawania strony'
        );
    }


    echo $json_response = json_encode($arr); 
?>