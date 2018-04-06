<?php

    require '../jwt_helper.php';
    include('../config/config.php');
    header('Access-Control-Allow-Origin: *');  //I have also tried the * wildcard and get the same response
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Accept, AuthorizationToken');

    $idGallery = $_GET['idGallery'];

    $q = "SELECT cms_gallery_photo.gallery_photo_id, cms_gallery_photo.gallery_photo_name, cms_gallery_photo.gallery_photo_desc, cms_gallery.gallery_name, cms_gallery.gallery_desc FROM cms_gallery_photo
         LEFT JOIN cms_gallery ON cms_gallery.gallery_id = cms_gallery_photo.gallery_id WHERE cms_gallery_photo.gallery_id='$idGallery'";

    $r = mysqli_query($abc, $q);
    
    $arr = array();
    
        while ($row = mysqli_fetch_assoc($r)){
            $arr[] = $row;
        }

    echo $json_response = json_encode($arr);
?>