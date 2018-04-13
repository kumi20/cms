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

        $id = $_GET['id'];

        $nletter_name = $data->nletter_name;
        $nletter_data = $data->nletter_data;
        $nletter_content = $data->nletter_content;
        
        if($id == 0){
            $q = "INSERT INTO `cms_nletter`(`nletter_name`, `nletter_data`, `nletter_content`, `nletter_sent`) VALUES ('$nletter_name','$nletter_data','$nletter_content', false)";
            
                
            }
        else{
            $q = "UPDATE `cms_nletter` SET `nletter_name`='$nletter_name',`nletter_data`='$nletter_data',`nletter_content`='$nletter_content' WHERE `nletter_id`='$id'";            
        }
        
        $r = mysqli_query ($abc, $q);           
        if($r){
            $arr = array(
                'kod'=> 0,
                'opis'=> 'Dodano nowy newsletter'
            );
        }
        else{
            $arr = array(
                'kod'=> -1,
                'opis'=> 'Błąd dodawania newslettera'
            );
        }
       
    }
        
        

        echo $json_response = json_encode($arr); 

?>