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
        $miesiac = $data->miesiac;
        $rok = $data->rok;
        $suma_przychodow = $data->przychod;
        $suma_kosztow = $data->koszt;
        $dochod = $data->podatek->przychod - $data->koszt;
        $suma_zdrowotnych = $data->zdrowotne;
        $kwata_zaliczki = $data->zaliczka;

        $q = "INSERT INTO `podatek_dochodowy`(`miesiac`, `rok`, `suma_przychodow`, `suma_kosztow`, `dochod`, `suma_zdrowotnych`, `kwota_zaliczki`, `user_id`) 
        VALUES ('$miesiac ', '$rok','$suma_przychodow','$suma_kosztow', '$dochod','$suma_zdrowotnych','$kwata_zaliczki','$idUser')";
        $r = mysqli_query($abc, $q);

        if($r){
                $arr = array(
                    'kod'=> 0,
                    'opis'=> 'zapisano podatek'
                  );
            }
            else{
                $arr = array(
                    'kod'=> -1,
                    'opis'=> 'Błąd zapisu podatku'
                );
            }
        
    }

    echo $json_response = json_encode($arr); 

?>