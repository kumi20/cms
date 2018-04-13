<?php

require '../jwt_helper.php';
include('../config/config.php');
header('Access-Control-Allow-Origin: *');  //I have also tried the * wildcard and get the same response
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Accept, AuthorizationToken');


    $data = json_decode(file_get_contents("php://input"));
    $id = $data->idPageElement;

    $q = "SELECT `page_order`, parent_id FROM `cms_page` WHERE `page_id`='$id'";

    $r = mysqli_query($abc, $q);   

    $w = mysqli_fetch_row($r);

    $idPozycji = $w['0'];

    if ($idPozycji != '0'){

        $idPozycji = $w['0']-1;
        $idParent = $w['1'];

        $q = "SELECT page_id FROM cms_page WHERE page_order ='$idPozycji' AND parent_id='$idParent'";
        $r = mysqli_query($abc, $q);  

        $w = mysqli_fetch_row($r);
        $idNoda = $w['0'];

        $q = "UPDATE cms_page SET page_order = page_order - 1 WHERE page_order > '$idPozycji' AND parent_id='$idParent'";
        $r = mysqli_query($abc, $q);  

        $q = "UPDATE cms_page SET page_order = page_order + 1 WHERE parent_id = '$idNoda'";
        $r = mysqli_query($abc, $q); 

        $q = "UPDATE cms_page SET parent_id='$idNoda', page_order='0', page_level = page_level + 1 WHERE page_id='$id'";
        $r = mysqli_query($abc, $q); 

        $q = "UPDATE cms_page SET page_level = page_level + 1 WHERE parent_id = '$id'";
        $r = mysqli_query($abc, $q); 
    }


    echo $json_response = json_encode($idPozycji); 
?>