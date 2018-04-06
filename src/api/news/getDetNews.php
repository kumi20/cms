<?php

require '../jwt_helper.php';
include('../config/config.php');
header('Access-Control-Allow-Origin: *');  //I have also tried the * wildcard and get the same response
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Accept, AuthorizationToken');


    $data = json_decode(file_get_contents("php://input"));
    $id = $data->id;

    $q = "SELECT `news_id`,`news_name`,`news_status`,`news_content`,`news_pub_date`,`news_lead`,`news_lead_img` FROM `cms_news` WHERE `news_id`= '$id'";

    $r = mysqli_query($abc, $q);
    
    $arr = array();
    
        while ($row = mysqli_fetch_assoc($r)){
            $arr[] = $row;
        }
    echo $json_response = json_encode($arr);
?>