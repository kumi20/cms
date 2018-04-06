<?php

require '../jwt_helper.php';
include('../config/config.php');
header('Access-Control-Allow-Origin: *');  //I have also tried the * wildcard and get the same response
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Accept, AuthorizationToken');


    $data = json_decode(file_get_contents("php://input"));
    $name = $data->name;

    $q = "INSERT INTO `cms_page_container`(`page_template_id`, `page_container_desc`) VALUES ('1','$name')";

    $r = mysqli_query($abc, $q);   

    if($r){
        $arr = array(
            'kod'=> 0,
            'opis'=> 'Dodano kontener'
          );
    }
    else{
        $arr = array(
            'kod'=> -1,
            'opis'=> 'Błąd dodawania kontenera'
        );
    }


    echo $json_response = json_encode($q); 
?>