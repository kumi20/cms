<?php

require '../../jwt_helper.php';
include('../../config/config.php');
header('Access-Control-Allow-Origin: *');  //I have also tried the * wildcard and get the same response
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Accept, AuthorizationToken');


    $data = json_decode(file_get_contents("php://input"));
    $id = $_GET['id'];

    $q = "SELECT cms_map.map_name, cms_map.map_content, cms_map.map_szer, cms_map.map_dlug
            FROM cms_map
            LEFT JOIN cms_map_group_conn ON cms_map_group_conn.map_id = cms_map.map_id 
            WHERE cms_map_group_conn.map_group_id='$id'";

    $r = mysqli_query($abc, $q);
    
    $arr = array();
    
        while ($row = mysqli_fetch_assoc($r)){
            $arr[] = $row;
        }

    echo $json_response = json_encode($arr);
?>