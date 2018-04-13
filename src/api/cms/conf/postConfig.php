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
        
        $data = json_decode(file_get_contents("php://input"));
        $page_title_prefix = $data->page_title_prefix;
        $Sender = $data->Sender;
        $analytics = $data->analytics;
        $description = $data->description;
        $keywords = $data->keywords;

        $q = "UPDATE `cms_config` SET `param_value`='$page_title_prefix' WHERE `param_id`=4";
        $r = mysqli_query($abc, $q);
        
        $q = "UPDATE `cms_config` SET `param_value`='$Sender' WHERE `param_id`=6";
        $r = mysqli_query($abc, $q);
        
        $q = "UPDATE `cms_config` SET `param_value`='$analytics' WHERE `param_id`=8";
        $r = mysqli_query($abc, $q);
        
        $q = "UPDATE `cms_config` SET `param_value`='$description' WHERE `param_id`=10";
        $r = mysqli_query($abc, $q);
        
        $q = "UPDATE `cms_config` SET `param_value`='$keywords' WHERE `param_id`=11";
        $r = mysqli_query($abc, $q);

        if($r){
                $arr = array(
                    'kod'=> 0,
                    'opis'=> 'zapisano ustawienia'
                  );
            }
            else{
                $arr = array(
                    'kod'=> -1,
                    'opis'=> 'Błąd zapisu ustawień'
                );
            }
        
    }

    echo $json_response = json_encode($arr); 

?>