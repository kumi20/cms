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
        $name = $data->name;
        $poll_startdate = $data->stardate;
        $poll_enddate = $data->enddate;
        $vote = $data->questions;
        $id = $_GET['id'];

        
        if($id == 0){
            $q = "INSERT INTO `cms_poll`(`poll_name`, `poll_votecount`, `poll_startdate`, `poll_enddate`) VALUES ('$name', null, '$poll_startdate','$poll_enddate')";
            $r = mysqli_query ($abc, $q);
            
           $q = "SELECT `poll_id` FROM `cms_poll` ORDER BY `poll_id` DESC LIMIT 1";
           $r = mysqli_query($abc, $q);  

           $w = mysqli_fetch_row($r);
           $idPool = $w['0'];
            
           for($j = 0; $j < count($vote); $j++){
             $v = $vote[$j]->pool_vote_name; 
             $q = "INSERT INTO `cms_poll_vote`(`poll_id`, `poll_vote_name`, `poll_vote_votecount`) VALUES ('$idPool','$v',0)";
             $r = mysqli_query($abc, $q); 
            }
           
                
            }
        else{
            $q = "UPDATE `cms_poll` SET `poll_name`='$name',`poll_startdate`='$poll_startdate',`poll_enddate`='$poll_enddate' WHERE `poll_id`='$id'";
            $r = mysqli_query($abc, $q); 
            
            $q = "DELETE FROM `cms_poll_vote` WHERE `poll_id`='$id'";
            $r = mysqli_query($abc, $q);
            
            for($j = 0; $j < count($vote); $j++){
             $v = $vote[$j]->pool_vote_name; 
             $odp = $vote[$j]->poll_vote_votecount;    
             $q = "INSERT INTO `cms_poll_vote`(`poll_id`, `poll_vote_name`, `poll_vote_votecount`) VALUES ('$id','$v',$odp)";
             $r = mysqli_query($abc, $q); 
            }
        }
                 
        if($r){
            $arr = array(
                'kod'=> 0,
                'opis'=> 'Dodano nowy punkt'
            );
        }
        else{
            $arr = array(
                'kod'=> -1,
                'opis'=> 'Błąd dodawania punktu'
            );
        }
       
    }
        
        

        echo $json_response = json_encode($q); 

?>