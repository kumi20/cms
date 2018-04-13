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
	
        $q = "SELECT cms_cform.cform_id, cms_cform.cform_name, cms_cform_user.cform_user_name, cms_cform_user.cform_user_id
            FROM cms_cform
            LEFT JOIN cms_cform_user_conn ON cms_cform_user_conn.cform_id = cms_cform.cform_id
            LEFT JOIN cms_cform_user ON cms_cform_user.cform_user_id = cms_cform_user_conn.cform_user_id
            WHERE cms_cform.cform_id='$id'";

        $r = mysqli_query($abc, $q);

        $arr = array();

        while ($row = mysqli_fetch_assoc($r)){
            $arr[] = $row;
        }
        
    }

    echo $json_response = json_encode($arr); 

?>