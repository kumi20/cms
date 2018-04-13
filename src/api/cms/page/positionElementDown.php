<?php

require '../jwt_helper.php';
include('../config/config.php');
header('Access-Control-Allow-Origin: *');  //I have also tried the * wildcard and get the same response
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Accept, AuthorizationToken');


    $data = json_decode(file_get_contents("php://input"));
    $id = $data->idPageElement;
    $idKontenera = $data->idKontenera;

    $q = "SELECT `page_element_id` FROM `cms_page_element` WHERE `page_container_id`='$idKontenera' ORDER BY `page_element_order` DESC LIMIT 1";

    $r = mysqli_query($abc, $q);   

    $w = mysqli_fetch_row($r);

    $idPozycji = $w['0'];

    $q = "SELECT `page_element_order` FROM `cms_page_element` WHERE `page_element_id`='$id'";
    $r = mysqli_query($abc, $q);   
    
    $w = mysqli_fetch_row($r);

    $idOrder = $w['0'];

    if ($id != $idPozycji){
        $q = "UPDATE `cms_page_element` SET `page_element_order` = `page_element_order` - 1 WHERE page_element_order = ('$idOrder'+1) AND page_container_id='$idKontenera'";
        $r = mysqli_query($abc, $q);
        
        $q = "UPDATE `cms_page_element` SET `page_element_order` = `page_element_order` + 1 WHERE `page_element_id`='$id'";
        $r = mysqli_query($abc, $q);
    }
    /*$arr = array(
        'kod'=> 0,
        'opis'=> 'Usunięto element'
      );*/

    echo $json_response = json_encode($q); 
?>