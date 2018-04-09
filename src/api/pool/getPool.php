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
        $id = $_GET['id'];
	
        $q = "SELECT cms_poll.poll_name, cms_poll.poll_startdate, cms_poll.poll_enddate, cms_poll_vote.poll_vote_name, cms_poll_vote.poll_vote_votecount
            FROM cms_poll
            LEFT JOIN cms_poll_vote ON cms_poll_vote.poll_id = cms_poll.poll_id
            WHERE cms_poll.poll_id='$id'";

        $r = mysqli_query($abc, $q);

        $arr = array();

        while ($row = mysqli_fetch_assoc($r)){
            $arr[] = $row;
        }
        
    }

    echo $json_response = json_encode($arr); 

?>