<?php

require '../jwt_helper.php';
include('../config/config.php');
header('Access-Control-Allow-Origin: *');  //I have also tried the * wildcard and get the same response
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Accept, AuthorizationToken');


    $data = json_decode(file_get_contents("php://input"));
    $id = $data->id;

    $q = "SELECT cms_user.user_status_id, cms_user.user_login, cms_user.user_name, cms_user.user_email, cms_user_password.user_password
        FROM cms_user LEFT JOIN cms_user_password ON cms_user_password.user_id = cms_user.user_id WHERE cms_user.user_id = '$id'";

    $r = mysqli_query($abc, $q);
    
    $arr = array();
    
        while ($row = mysqli_fetch_assoc($r)){
            $arr[] = $row;
        }

    echo $json_response = json_encode($arr);
?>