<?php

require '../jwt_helper.php';
include('../config/config.php');
header('Access-Control-Allow-Origin: *');  //I have also tried the * wildcard and get the same response
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Accept, AuthorizationToken');


    $data = json_decode(file_get_contents("php://input"));
    $module_id = $data->elementModel->module_id;
    $page_container_id = $data->elementModel->page_container_id;
    $page_id = $data->elementModel->page_id;
    $page_element_elemid = $data->elementModel->page_element_elemid;
    $module_view_id = $data->elementModel->module_view_id;
    $today = date("Y-m-d H:i:s");

    $q = "SELECT page_element_order FROM cms_page_element WHERE page_container_id = '$page_container_id' ORDER BY page_element_order DESC LIMIT 1";

    $r = mysqli_query($abc, $q);  
    $w = mysqli_fetch_row($r);
    
    $idOrder = $w['0']+1; 

    $q = "INSERT INTO `cms_page_element`(`module_id`, `page_container_id`, `page_id`, `page_element_elemid`, `module_view_id`, `page_element_order`, `insd`, `insu`) 
    VALUES ('$module_id','$page_container_id','$page_id','$page_element_elemid','$module_view_id','$idOrder','$today',null)";

    $r = mysqli_query($abc, $q); 
    if($r){
        $arr = array(
            'kod'=> 0,
            'opis'=> 'Dodano nowy element'
          );
    }
    else{
        $arr = array(
            'kod'=> -1,
            'opis'=> 'Błąd dodawania nowego elementu'
        );
    }

    echo $json_response = json_encode($arr); 
?>