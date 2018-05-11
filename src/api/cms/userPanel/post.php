<?php

require '../jwt_helper.php';
include('../config/config.php');
header('Access-Control-Allow-Origin: *');  //I have also tried the * wildcard and get the same response
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Accept, AuthorizationToken');


    $headers = getallheaders();
    
    $data = json_decode(file_get_contents("php://input"));

    $customer_name = $data->customer_name;
    $customer_post_code = $data->customer_post_code;
    $customer_city = $data->customer_city;
    $customer_street = $data->customer_street;
    $customer_nip = $data->customer_nip;

    $secret_key = 'kumiSoft';
    $idUser = $headers['Authorizationtoken'];

    if ($idUser != null){
        
        $idUser = JWT::decode($idUser, $secret_key);
        $idUser = base64_decode($idUser->userId);

        $q = "UPDATE `cms_customer` SET `customer_name`='$customer_name',`customer_post_code`='$customer_post_code',`customer_city`='$customer_city',`customer_street`='$customer_street',`customer_nip`='$customer_nip' WHERE `customer_id` = '$idUser'";

        $r = mysqli_query($abc, $q);

       if($r){
            $arr = array(
                'kod'=> 0,
                'opis'=> 'Uaktualniono dane'
            );
        }
        else{
            $arr = array(
                'kod'=> -1,
                'opis'=> 'Błąd aktualizacji'
            );
        }

        
    }

    echo $json_response = json_encode($arr);
?>