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
        
        $idPrzychodu = $_GET['id'];

        $q = "SELECT kpir.miesiac, kpir.rok, kpir.data_zd, kpir.nr_dow, id_kont, kpir.przych, kpir.pozostale_przychody, 
         kpir.opis_zdarzenia, kpir.uwagi FROM kpir
        WHERE kpir.id='$idPrzychodu';
         ";

        $r = mysqli_query($abc, $q);

		$arr = array();

		while ($row = mysqli_fetch_assoc($r)){
			$arr[] = $row;
		}
        
    }

    echo $json_response = json_encode($arr); 

?>