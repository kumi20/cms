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

    $pozycjaNaStronie = $w['0'];
    $parentID = $w['1'];

    if ($pozycjaNaStronie != '0'){
        $q = "UPDATE `cms_page` SET `page_order` = `page_order` + 1 WHERE page_order = ('$pozycjaNaStronie'-1) AND parent_id='$parentID'";
        $r = mysqli_query($abc, $q);
        
        $q = "UPDATE `cms_page` SET `page_order` = `page_order` - 1 WHERE `page_id`='$id'";
        $r = mysqli_query($abc, $q);
    }
    /*$arr = array(
        'kod'=> 0,
        'opis'=> 'Usunięto element'
      );*/

    echo $json_response = json_encode($q); 
?>