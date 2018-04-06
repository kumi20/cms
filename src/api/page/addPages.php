<?php

require '../jwt_helper.php';
include('../config/config.php');
header('Access-Control-Allow-Origin: *');  //I have also tried the * wildcard and get the same response
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Accept, AuthorizationToken');


    $data = json_decode(file_get_contents("php://input"));
    $name = $data->name;
    $number = $data->number;

    $pageName = $name;

    $wykonana = true;

    $name = str_replace("ę","e", $name);
    $name = str_replace("ó","o", $name);
    $name = str_replace("ą","a", $name);
    $name = str_replace("ś","s", $name);
    $name = str_replace("ł","l", $name);
    $name = str_replace("ż","z", $name);
    $name = str_replace("ź","z", $name);
    $name = str_replace("ć","c", $name);
    $name = str_replace("ń","n", $name);
    $name = str_replace(" ","-", $name);
    $name = strtolower($name);

    $q = "SELECT * FROM `cms_page` WHERE `page_id`='$number'";
    $r = mysqli_query($abc, $q); 

    if(!$r) $wykonana = false;

    $w = mysqli_fetch_row($r);
    $idOrder = $w['3'];
    $idParent = $w['1'];
    $pageLevel = $w['2'];

    $q = "UPDATE `cms_page` SET  `page_order` = `page_order`+1 WHERE `page_order`>'$idOrder' AND `parent_id`='$idParent'";
    $r = mysqli_query($abc, $q); 

    if(!$r) $wykonana = false;

    $idOrder = $w['3']+1;
    
    $q = "INSERT INTO `cms_page`(`parent_id`, `page_level`, `page_order`, `page_template_id`, `page_name`, `page_name_alias`, `page_name_url`, `page_home`, `page_static_count`, `page_system`) 
    VALUES ('$idParent', '$pageLevel', '$idOrder','1','$pageName','','$name','0','0','0')";
    $r = mysqli_query($abc, $q); 
   
    if(!$r) $wykonana = false;
    
    if($wykonana){
        $arr = array(
            'kod'=> 0,
            'opis'=> 'Dodano stronę'
          );
    }
    else{
        $arr = array(
            'kod'=> -1,
            'opis'=> 'Błąd dodawania strony'
        );
    }

    echo $json_response = json_encode($arr); 
?>