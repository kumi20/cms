<?php

    require '../jwt_helper.php';
    include('../config/config.php');
    header('Access-Control-Allow-Origin: *');  //I have also tried the * wildcard and get the same response
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Accept, AuthorizationToken');

    $data = json_decode(file_get_contents("php://input"));
    $idMenu = $_GET['idMenu'];

    $menuNode = $data->menuNode;

    $q = "DELETE FROM cms_menu_node WHERE menu_id='$idMenu'";
    $r = mysqli_query($abc, $q);
    $error = true;

    if($r){
        $error = false;
    }

    for($i = 0; $i < count($menuNode); $i++){
        $parent_id = $menuNode[$i]->parent_id;
        $pege_level = $menuNode[$i]->page_level;
        $page_order = $menuNode[$i]->page_order;
        $page_name = $menuNode[$i]->page_name;
        $page_name_url = $menuNode[$i]->page_name_url;
        $page_id = $menuNode[$i]->page_id;

        $q = "INSERT INTO `cms_menu_node`(`menu_id`, `menu_node_parent_id`, `menu_node_level`, 
        `menu_node_order`, `menu_node_name`, `menu_node_name_url`, `menu_node_textvisible`, `page_id`, 
        `menu_node_icon`, `menu_node_html_class`) VALUES ('$idMenu','$parent_id',
        '$pege_level','$page_order','$page_name',
        '$page_name_url','','$page_id','','')";
        $r = mysqli_query($abc, $q);
        if($r){
            $error = false;
        }

    }
    
    if($error){
        $arr = array(
            'kod'=> -1,
            'opis'=> 'Błąd dodawania menu'
          );
    }
    else{
        $arr = array(
            'kod'=> 0,
            'opis'=> 'Dodano menu'
        );
    }
    

    echo $json_response = json_encode($arr);
?>