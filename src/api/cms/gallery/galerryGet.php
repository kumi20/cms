<?php

    require '../jwt_helper.php';
    include('../config/config.php');
    header('Access-Control-Allow-Origin: *');  //I have also tried the * wildcard and get the same response
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Accept, AuthorizationToken');


    $q = "SELECT cms_gallery.gallery_id, cms_gallery.gallery_name, cms_gallery.gallery_desc, cms_gallery_photo.gallery_photo_name
    FROM cms_gallery 
    LEFT JOIN cms_gallery_photo ON cms_gallery_photo.gallery_photo_id = cms_gallery.gallery_photo_id";

    $r = mysqli_query($abc, $q);
    
    $arr = array();
    
        while ($row = mysqli_fetch_assoc($r)){
            $arr[] = $row;
        }

    echo $json_response = json_encode($arr);
?>