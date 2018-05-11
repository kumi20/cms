<?php

require '../jwt_helper.php';
include('../config/config.php');
header('Access-Control-Allow-Origin: *');  //I have also tried the * wildcard and get the same response
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Accept, AuthorizationToken');


    $headers = getallheaders();
    
    $data = json_decode(file_get_contents("php://input"));

    $psw = md5($data->psw);

    $secret_key = 'kumiSoft';
    $idUser = $headers['Authorizationtoken'];

    if ($idUser != null){
        
        $idUser = JWT::decode($idUser, $secret_key);
        $idUser = base64_decode($idUser->userId);

        $q = "UPDATE `cms_custromer_user` SET `customer_psw`='$psw' WHERE `customer_id` = '$idUser'";

        $r = mysqli_query($abc, $q);

       if($r){
            $arr = array(
                'kod'=> 0,
                'opis'=> 'Uaktualniono hasło'
            );
        }
        else{
            $arr = array(
                'kod'=> -1,
                'opis'=> 'Błąd aktualizacji hasła'
            );
        }

        
    }

    echo $json_response = json_encode($arr);
?>