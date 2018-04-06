<?php

require '../jwt_helper.php';
include('../config/config.php');
header('Access-Control-Allow-Origin: *');  //I have also tried the * wildcard and get the same response
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Accept, AuthorizationToken');


    $headers = getallheaders();
    
    $data = json_decode(file_get_contents("php://input"));
    $user_login = $data->user_login;
    $user_password = md5($data->user_password);
    $user_name = $data->user_name;
    $user_status = $data->user_status;
    $user_email = $data->user_email;
    $user_id = $data->user_id;

    $secret_key = 'kumiSoft';

    $idUser = $headers['Authorizationtoken'];
    $idUser = JWT::decode($idUser, $secret_key);
    $idUser = base64_decode($idUser->userId);

    $today = date("Y-m-d H:i:s");


    if($user_id == 0){
        $q = "INSERT INTO `cms_user`(`user_status_id`, `user_login`, `user_name`, `user_email`, 
       `insd`, `insu`, `lupdd`, `lupdu`) 
        VALUES ('$user_status','$user_login','$user_name','$user_email','$today','$idUser',null,null)";
    }
    else{
        $q = "UPDATE `cms_user` SET `user_status_id`='$user_status',`user_login`='$user_login',
        `user_name`='$user_name',`user_email`='$user_email',`lupdd`='$today',`lupdu`='$idUser' WHERE `user_id`='$user_id'";
    }
    
    $r = mysqli_query($abc, $q);   

    if($r){
        $arr = array(
            'kod'=> 0,
            'opis'=> 'Dodano uzytkownika'
          );
    }
    else{
        $arr = array(
            'kod'=> -1,
            'opis'=> 'Błąd dodawania uzytkownika'
        );
    }
    
    if($user_id == 0){
        $q2 = "SELECT `user_id` FROM `cms_user` ORDER BY `user_id` DESC LIMIT 1";
        $r2 = mysqli_query($abc, $q2);  
 
        $w = mysqli_fetch_row($r2);
        $user_id = $w['0'];

        $q = "INSERT INTO `cms_user_password`(`user_id`, `user_password`, `user_password_expirationdate`, `insd`, `insu`) 
        VALUES ('$user_id','$user_password',null,null,null)";
        $r = mysqli_query($abc, $q); 
        
    }
    else{
        $q = "DELETE FROM `cms_user_password` WHERE `user_id`= $user_id";
        $r = mysqli_query($abc, $q); 

        $q = "INSERT INTO `cms_user_password`(`user_id`, `user_password`, `user_password_expirationdate`, `insd`, `insu`) 
        VALUES ('$user_id','$user_password',null,null,null)";
        $r = mysqli_query($abc, $q); 

    }
    echo $json_response = json_encode($arr); 

?>