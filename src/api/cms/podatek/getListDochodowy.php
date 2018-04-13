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
        
        $year = $_GET['year'];
	
        $q = "SELECT `id`,`rok`,`miesiac`,`suma_kosztow`,`suma_przychodow`,`kwota_zaliczki` FROM `podatek_dochodowy` WHERE `user_id`='$idUser' AND rok='$year';
         ";

        $r = mysqli_query($abc, $q);

        $arr = array();

        while ($row = mysqli_fetch_assoc($r)){
            $arr[] = $row;
        }
        
    }

    echo $json_response = json_encode($arr); 

?>