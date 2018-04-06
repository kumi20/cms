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
        
        $idKon = $_GET['id'];
	
        $q = "SELECT id, NIP, Name, Street, Postcode, miejscowosc, Person_contact, telephone, fax, www, dostawca, odbiorca, email FROM kontrahenci
        WHERE user_id='$idUser' AND id='$idKon';
         ";

        $r = mysqli_query($abc, $q);

        $arr = array();

        while ($row = mysqli_fetch_assoc($r)){
            $arr[] = $row;
	}
    }

    echo $json_response = json_encode($arr); 

?>