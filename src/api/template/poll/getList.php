<?php

require '../../jwt_helper.php';
include('../../config/config.php');
header('Access-Control-Allow-Origin: *');  //I have also tried the * wildcard and get the same response
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Accept, AuthorizationToken');


    $data = json_decode(file_get_contents("php://input"));
    $id = $_GET['id'];
    $today = date("Y-m-d");

    $q = "SELECT cms_poll.poll_name, cms_poll_vote.poll_vote_id, cms_poll_vote.poll_vote_name, cms_poll_vote.poll_vote_votecount
    FROM cms_poll
    LEFT JOIN cms_poll_vote ON cms_poll_vote.poll_id = cms_poll.poll_id
    WHERE cms_poll.poll_id = '$id' AND cms_poll.poll_startdate <='$today' AND cms_poll.poll_enddate >='$today'";

    $r = mysqli_query($abc, $q);
    
    $arr = array();
    
        while ($row = mysqli_fetch_assoc($r)){
            $arr[] = $row;
        }

    echo $json_response = json_encode($arr);
?>