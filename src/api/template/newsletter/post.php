<?php

require '../../jwt_helper.php';
include('../../config/config.php');
header('Access-Control-Allow-Origin: *');  //I have also tried the * wildcard and get the same response
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

    $email = $_GET['email'];

    $q = "SELECT `nletter_subscription_id` FROM `cms_nletter_subscription` WHERE `nletter_subscription_email`='$email'";    
    $r = mysqli_query($abc, $q);

    if(mysqli_num_rows($r)){
        $arr = array(
                'kod'=> -1,  
                'status'=> 'Podany email jest już w bazie'
        );
    }
    else{
        $q = "INSERT INTO `cms_nletter_subscription`(`nletter_subscription_email`, `nletter_subscription_activ`, `nletter_subscription_code`) VALUES ('$email',1,'')";
        $r = mysqli_query($abc, $q);
        
        $arr = array(
                'kod'=> 0,  
                'status'=> 'Dodano nowy adres'
        );
    }    
           

    echo $json_response = json_encode($arr);
?>