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
	
        $q = "DELETE FROM `cms_poll` WHERE `poll_id`='$id'";

        $r = mysqli_query($abc, $q);
        
        $q = "DELETE FROM `cms_poll_vote` WHERE `poll_id`='$id'";

        $r = mysqli_query($abc, $q);

        if($r){
                $arr = array(
                    'kod'=> 0,
                    'opis'=> 'Usunięto sondę'
                  );
            }
            else{
                $arr = array(
                    'kod'=> -1,
                    'opis'=> 'Błąd usuwania sondy'
                );
            }
        
    }

    echo $json_response = json_encode($arr); 

?>