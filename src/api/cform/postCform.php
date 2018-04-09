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

        $name = $data->name;
        $adresaci = $data->adresaci;
        
        if($id == 0){
            $q = "INSERT INTO `cms_cform`(`cform_name`) VALUES ('$name')";
            $r = mysqli_query ($abc, $q); 
            
            $q = "SELECT `cform_id` FROM `cms_cform` ORDER BY `cform_id` DESC LIMIT 1";
            $r = mysqli_query($abc, $q);  

            $w = mysqli_fetch_row($r);
            $idCform= $w['0'];

           for($j = 0; $j < count($adresaci); $j++){
               
                $q = "INSERT INTO `cms_cform_user_conn`(`cform_id`, `cform_user_id`) VALUES ('$idCform','$adresaci[$j]')";
                $r = mysqli_query($abc, $q); 
            }
                
            }
        else{
            $q = "UPDATE `cms_cform` SET  `cform_name`='$name' WHERE `cform_id`='$id'";
            $r = mysqli_query($abc, $q); 
            
            $q = "DELETE FROM `cms_cform_user_conn` WHERE `cform_id`= $id";
            $r = mysqli_query($abc, $q);
            
            for($j = 0; $j < count($adresaci); $j++){
               
                $q = "INSERT INTO `cms_cform_user_conn`(`cform_id`, `cform_user_id`) VALUES ('$id','$adresaci[$j]')";
                $r = mysqli_query($abc, $q); 
            }
            
        }
        
        $r = mysqli_query ($abc, $q);           
        if($r){
            $arr = array(
                'kod'=> 0,
                'id_event' => $id_event,
                'opis'=> 'Dodano nowy formularz'
            );
        }
        else{
            $arr = array(
                'kod'=> -1,
                'opis'=> 'Błąd dodawania formularza'
            );
        }
       
    }
        
        

        echo $json_response = json_encode($arr); 

?>