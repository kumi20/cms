<?php

    require '../jwt_helper.php';
    include('../config/config.php');
    header('Access-Control-Allow-Origin: *');  //I have also tried the * wildcard and get the same response
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Accept, AuthorizationToken');

    $data = json_decode(file_get_contents("php://input"));
    $idMenu = $_GET['id'];


    $q = "DELETE FROM `cms_menu` WHERE `menu_id`='$idMenu'";
    $r = mysqli_query($abc, $q);
    
     $q = "DELETE FROM `cms_menu_node` WHERE `menu_id`='$idMenu'";
    $r = mysqli_query($abc, $q);
    
    if($r){
        $arr = array(
            'kod'=> 0,
            'opis'=> 'Usunięto menu'
          );
    }
    else{
        $arr = array(
            'kod'=> -1,
            'opis'=> 'Błąd usuwania menu'
        );
    }
    

    echo $json_response = json_encode($arr);
?>