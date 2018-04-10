<?php

require '../../jwt_helper.php';
include('../../config/config.php');
header('Access-Control-Allow-Origin: *');  //I have also tried the * wildcard and get the same response
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Accept, AuthorizationToken');


    $data = json_decode(file_get_contents("php://input"));
    $id = $_GET['id'];
    $node = $_GET['node'];
    $parent = $_GET['parent'];

    $q = "SELECT `page_id`,`menu_node_name_url`,`menu_node_name` FROM `cms_menu_node` WHERE `menu_id`='$id' AND menu_node_level='$node' AND menu_node_parent_id='$parent'";

    $r = mysqli_query($abc, $q);
    
    $arr = array();
    
        while ($row = mysqli_fetch_assoc($r)){
            $arr[] = $row;
        }

    echo $json_response = json_encode($arr);
?>