<?php

require '../jwt_helper.php';
include('../config/config.php');
header('Access-Control-Allow-Origin: *');  //I have also tried the * wildcard and get the same response
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Accept, AuthorizationToken');


    $q = "SELECT cms_user.user_id, cms_user.user_name, cms_user.user_login, cms_user.user_email, cms_user_status.user_status_name 
    FROM cms_user 
    LEFT JOIN cms_user_status ON cms_user.user_status_id = cms_user_status.user_status_id";

    $r = mysqli_query($abc, $q);
    
    $arr = array();
    
        while ($row = mysqli_fetch_assoc($r)){
            $arr[] = $row;
        }

    echo $json_response = json_encode($arr);
?>