<?php

require '../../jwt_helper.php';
include('../../config/config.php');
header('Access-Control-Allow-Origin: *');  //I have also tried the * wildcard and get the same response
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');


    $data = json_decode(file_get_contents("php://input"));
    $vote = $_GET['id'];

    if($vote != null){
         
        $q = "UPDATE `cms_poll_vote` SET `poll_vote_votecount`=poll_vote_votecount+1 WHERE `poll_vote_id`='$vote'";
        $r = mysqli_query($abc, $q);


        
        if($r ){

            $arr = array(
                'kod'=> 0,                    
                'opis'=> 'Oddano głos'
            );
        }
        else{
            $arr = array(
                    'kod'=> -1,
                    'opis'=> 'Błąd oddawania głosu'
            );
        }  
          
    }

   

    echo $json_response = json_encode($arr);
?>