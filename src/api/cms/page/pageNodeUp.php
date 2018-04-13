<?php

require '../jwt_helper.php';
include('../config/config.php');
header('Access-Control-Allow-Origin: *');  //I have also tried the * wildcard and get the same response
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Accept, AuthorizationToken');


    $data = json_decode(file_get_contents("php://input"));
    $id = $data->idPageElement;

    $q = "SELECT parent_id, page_order FROM cms_page WHERE page_id ='$id'";

    $r = mysqli_query($abc, $q);   

    $w = mysqli_fetch_row($r);

    $idParent = $w['0'];
    $idOrder = $w['1'];

    $q = "SELECT parent_id, page_order FROM cms_page WHERE page_id='$idParent'";
    $r = mysqli_query($abc, $q); 

    $w = mysqli_fetch_row($r);
    $idNodaNadrzednego = $w['0'];
    $idNodaOrder = $w['1'];

    $q = "UPDATE cms_page SET page_order = page_order+1 WHERE parent_id='$idNodaNadrzednego' AND page_order >= '$idNodaOrder';";
    $r = mysqli_query($abc, $q);

    $q = "UPDATE cms_page SET page_order = '$idNodaOrder', parent_id = '$idNodaNadrzednego' WHERE page_id = '$id'";
    $r = mysqli_query($abc, $q);

    $q = "UPDATE cms_page SET page_order = page_order-1 WHERE parent_id = '$idParent' AND page_order > '$idOrder'";
    $r = mysqli_query($abc, $q);


    echo $json_response = json_encode($q); 
?>