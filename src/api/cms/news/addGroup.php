<?php

require '../jwt_helper.php';
include('../config/config.php');
header('Access-Control-Allow-Origin: *');  //I have also tried the * wildcard and get the same response
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Accept, AuthorizationToken');


    $data = json_decode(file_get_contents("php://input"));

    $news_group_name = $data->news_group_name;
    $news_group_perpage = $data->news_group_perpage;
    $idGroup = $data->idGroup;

    $today = date("Y-m-d H:i:s");

    if($idGroup == 0){
        $q = "INSERT INTO `cms_news_group`(`news_group_name`, `news_group_perpage`, `news_group_newscount`) VALUES ('$news_group_name','$news_group_perpage','0')";
    }
    else{
        $q = "UPDATE `cms_news_group` SET `news_group_name`='$news_group_name',`news_group_perpage`='$news_group_perpage' WHERE news_group_id ='$idGroup'";
    }
    
    $r = mysqli_query($abc, $q);   

    if($r){
        $arr = array(
            'kod'=> 0,
            'opis'=> 'Dodano newsa'
          );
    }
    else{
        $arr = array(
            'kod'=> -1,
            'opis'=> 'Błąd dodawania newsa'
        );
    }

    echo $json_response = json_encode($arr); 

?>