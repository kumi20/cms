<?php

require '../jwt_helper.php';
include('../config/config.php');
header('Access-Control-Allow-Origin: *');  //I have also tried the * wildcard and get the same response
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Accept, AuthorizationToken');


    

    $headers = getallheaders();

    $secret_key = 'kumiSoft';

    $idUser = $headers['Authorizationtoken'];
    $idUser = JWT::decode($idUser, $secret_key);
    $idUser = base64_decode($idUser->userId);
    
    $data = json_decode(file_get_contents("php://input"));
    $tytul = $data->tytul;
    $tresc = $data->tresc;
    $idTresci = $data->idTresci;

    $today = date("Y-m-d");


    if($idTresci == 0){
        $q = "INSERT INTO `cms_static`(`static_name`, `static_lead`, `static_content`, `static_pub_date`, `page_id`, `insu`, `insd`, `lupdu`, `lupdd`) 
        VALUES ('$tytul','','$tresc','$today','0','$idUser','$today','','')";
    }
    else{
        $q = "UPDATE `cms_static` SET `static_name`='$tytul',`static_content`='$tresc',`lupdu`='$idUser',`lupdd`='$today' WHERE `static_id`='$idTresci'";
    }
    
    $r = mysqli_query($abc, $q);   

    if($r){
        $arr = array(
            'kod'=> 0,
            'opis'=> 'Dodano treść'
          );
    }
    else{
        $arr = array(
            'kod'=> -1,
            'opis'=> 'Błąd dodawania treść'
        );
    }

    echo $json_response = json_encode($arr); 

?>