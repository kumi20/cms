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

        $termin_platnosci = $data->termin_platnosci;

        $skladka_spoleczne = $data->skladka_spoleczne;

        $data_spoleczne = $data->data_spoleczne;

        $skladka_zdrowotne = $data->skladka_zdrowotne;

        $data_zdrowotne = $data->data_zdrowotne;

        $skladka_fundusz_pracy = $data->skladka_fundusz_pracy;

        $data_fundusz_pracy = $data->data_fundusz_pracy;

        $q = "INSERT INTO `skladki_zus`(`rok`, `miesiac`, `termin_platnosci`, `skladka_spoleczne`, `data_spoleczne`, `skladka_zdrowotne`, 
        `data_zdrowotne`, `skladka_fundusz_pracy`, `data_fundusz_pracy`, `user_id`) 
        VALUES ('$rok','$miesiac','$termin_platnosci','$skladka_spoleczne','$data_spoleczne','$skladka_zdrowotne','$data_zdrowotne','$skladka_fundusz_pracy','$data_fundusz_pracy','$idUser')";

        $r = mysqli_query($abc, $q);

            if($r){
                $arr = array(
                    'kod'=> 0,
                    'opis'=> 'zapisano składke'
                  );
            }
            else{
                $arr = array(
                    'kod'=> -1,
                    'opis'=> 'Błąd zapisu składki'
                );
            }
        
    }

    echo $json_response = json_encode($arr); 

?>