<?php

require '../jwt_helper.php';
include('../config/config.php');
header('Access-Control-Allow-Origin: *');  //I have also tried the * wildcard and get the same response
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Accept, AuthorizationToken');


    $headers = getallheaders();

    $data = json_decode(file_get_contents("php://input"));
    $id = $data->id;
    $idUser = $headers['Authorizationtoken'];

    $today = date("Y-m-d H:i:s");

    $q = "UPDATE `cms_user` SET `user_status_id`='3',`lupdd`='$today',`lupdu`= '$idUser' WHERE `user_id` = $id";

    $r = mysqli_query($abc, $q);   

    $arr = array(
        'kod'=> 0,
        'opis'=> 'Usunięto uzytkownika'
      );

    echo $json_response = json_encode($arr); 

?>