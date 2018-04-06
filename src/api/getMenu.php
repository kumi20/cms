<?php

require 'jwt_helper.php';
include('config/config.php');
header('Access-Control-Allow-Origin: *');  //I have also tried the * wildcard and get the same response
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Accept, AuthorizationToken');


    $q = "SELECT `module_id`,`module_full_name` FROM `cms_module`";

    $r = mysqli_query($abc, $q);
    
    $arr = array();
    
        while ($row = mysqli_fetch_assoc($r)){
            $arr[] = $row;
        }
    echo $json_response = json_encode($arr);
?>