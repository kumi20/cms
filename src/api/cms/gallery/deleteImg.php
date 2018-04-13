<?php

    require '../jwt_helper.php';
    include('../config/config.php');
    header('Access-Control-Allow-Origin: *');  //I have also tried the * wildcard and get the same response
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Accept, AuthorizationToken');

    $idImg = $_GET['idImg'];

    $q = "DELETE FROM `cms_gallery_photo` WHERE `gallery_photo_id`='$idImg'";
    $r = mysqli_query($abc, $q);
    
    echo $json_response = json_encode($arr);
?>