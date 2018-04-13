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
        $idPrzychodu = $data->idPrzychodu;

        $miesiac = $data->miesiac;
        $rok = $data->rok;
        $dataZd = $data->dataZd;
        $nr_dow = $data->nr_dow;
        $opis_zdarzenia = $data->opis_zdarzenia;
        $id_kont = $data->id_kont;
        $przych = $data->przych;
        $pozostale_przychody = $data->pozostale_przychody;
        $uwagi = $data->uwagi;
        $razem_przychod = $przych + $pozostale_przychody;
        
        if ($idPrzychodu != 0)
            {
                $q = "UPDATE kpir SET 
                    nr_dow='$nr_dow',
                    id_kont='$id_kont',
                    przych='$przych',
                    pozostale_przychody='$pozostale_przychody',
                    razem_przychod='$razem_przychod',
                    opis_zdarzenia='$opis_zdarzenia',
                    rok='$rok', 
                    miesiac= '$miesiac',
                    uwagi='$uwagi',
                    data_zd='$dataZd' 
                    WHERE id = '$idPrzychodu';
                ";
            }
            else{
                $q = "INSERT INTO kpir(nr_dow, id_kont, przych, pozostale_przychody, razem_przychod, zakup_towarow, koszty_uboczne, wynagrodzenie_gotowka, pozostale_wydatki,
                  razem_wydatki, opis_zdarzenia, rok, miesiac, uwagi, data_zd, czy_przy, id_user) 
                  VALUES (
                    '$nr_dow',
                    '$id_kont',
                    '$przych',
                    '$pozostale_przychody',
                    '$razem_przychod',
                    '0.00',
                    '0.00',
                    '0.00',
                    '0.00',
                    '0.00',
                    '$opis_zdarzenia',
                    '$rok',
                    '$miesiac',
                    '$uwagi',
                    '$dataZd',
                    1,
                    '$idUser'
                  )";
                
            }
        
            $r = mysqli_query ($abc, $q);
            if($r){
                $arr = array(
                    'kod'=> 0,
                    'opis'=> 'Dodano newsa'
                  );
            }
            else{
                $arr = array(
                    'kod'=> -1,
                    'opis'=> 'Błąd dodawania przychodu'
                );
            }
        }

        echo $json_response = json_encode($arr); 

?>