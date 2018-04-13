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
        $start = $data->start;
        $endEvent = $data->endEvent;
        $title = $data->title;
        $id = $data->id;
        
        if($id == 0){
            $q = "INSERT INTO `cms_callendar`(`start`, `end`, `title`, `user_id`) VALUES ('$start','$endEvent','$title','$idUser')";
            $r = mysqli_query ($abc, $q);
        
            $q = "SELECT `id` FROM `cms_callendar` ORDER BY id DESC LIMIT 1";
            $r = mysqli_query ($abc, $q);
            $w = mysqli_fetch_row($r);
            $id_event = $w['0'];

                if($r){
                    $arr = array(
                        'kod'=> 0,
                        'id_event' => $id_event,
                        'opis'=> 'Dodano wydarzenie'
                      );
                }
                else{
                    $arr = array(
                        'kod'=> -1,
                        'opis'=> 'Błąd dodawania wydarzenia'
                    );
                }
            }
        else{
            $q = "UPDATE `cms_callendar` SET `start`='$start',`end`='$endEvent',`title`='$title',`user_id`='$idUser' WHERE `id`='$id'";
            $r = mysqli_query ($abc, $q);
            if($r){
                    $arr = array(
                        'kod'=> 0,
                        'opis'=> 'Zaktualizowano wydarzenie'
                      );
                }
                else{
                    $arr = array(
                        'kod'=> -1,
                        'opis'=> 'Błąd dodawania wydarzenia'
                    );
                }
        } 
       
    }
        
        

        echo $json_response = json_encode($q); 

?>