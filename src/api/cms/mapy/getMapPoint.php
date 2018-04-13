<?php
    require '../jwt_helper.php';
    include('../config/config.php');
    header('Access-Control-Allow-Origin: *');  //I have also tried the * wildcard and get the same response
    header('Access-Control-Allow-Methods: GET');
    header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Accept, AuthorizationToken');

    $headers = getallheaders();

    $secret_key = 'kumiSoft';

    $idUser = $headers['Authorizationtoken'];
    if ($idUser != null){
        $idUser = JWT::decode($idUser, $secret_key);
        $idUser = base64_decode($idUser->userId);
        
        $id = $_GET['id'];
	
        $q = "SELECT cms_map.map_name, cms_map.map_content, cms_map.map_szer, cms_map.map_dlug, cms_map_group_conn.map_group_id 
            FROM cms_map
            LEFT JOIN cms_map_group_conn ON cms_map_group_conn.map_id = cms_map.map_id 
            WHERE cms_map.map_id='$id'";

        $r = mysqli_query($abc, $q);

        $arr = array();

        while ($row = mysqli_fetch_assoc($r)){
            $arr[] = $row;
        }
        
    }

    echo $json_response = json_encode($arr); 

?>