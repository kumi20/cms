<?php

require '../jwt_helper.php';
include('../config/config.php');
header('Access-Control-Allow-Origin: *');  //I have also tried the * wildcard and get the same response
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Accept, AuthorizationToken');


    $data = json_decode(file_get_contents("php://input"));
    $id = $data->id;

    $q = "SELECT page_order, parent_id FROM cms_page WHERE page_id='$id'";
    $r = mysqli_query($abc, $q);  

    $w = mysqli_fetch_row($r);
    $idOrder = $w['0'];
    $idParent = $w['1'];

    $q = "UPDATE `cms_page` SET page_order = page_order - 1 WHERE  page_order>'$idOrder' AND parent_id='$idParent'";
    $r = mysqli_query($abc, $q); 
    
    $q = "DELETE FROM cms_page WHERE page_id = '$id'";

    $r = mysqli_query($abc, $q);   

    $q = "DELETE FROM cms_menu_node WHERE page_id = '$id'";
    $r = mysqli_query($abc, $q);  

    $q = "DELETE FROM `cms_page` WHERE `parent_id` = '$id'";
    $r = mysqli_query($abc, $q); 

    $arr = array(
        'kod'=> 0,
        'opis'=> 'Usunięto stronę'
      );


    echo $json_response = json_encode($q); 
?>