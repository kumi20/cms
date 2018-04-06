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

        $data_nabycia = $data->data_nabycia;

        $numer_dokumentu = $data->numer_dokumentu;
        $nazwa = $data->nazwa;
        $miejsce_uzytkowania = $data->miejsce_uzytkowania;
        $warotsc_poczatkowa = $data->warotsc_poczatkowa;
        $zlikwidowane = $data->zlikwidowane;
        $data_likwidacj= $data->data_likwidacji;
        $data_likwidacji = $data->data_likwidacji;
        $id = $data->id;

        $przyczyna_likwidacji = $data->przyczyna_likwidacji;

        if ($id ==  0){
            $q = "INSERT INTO `wyposazenie`(`data_nabycia`, `numer_dokumentu`, `nazwa`, `miejsce_uzytkowania`, `warotsc_poczatkowa`, `zlikwidowane`, 
              `data_likwidacji`, `przyczyna_likwidacji`, `id_user`) 
              VALUES ('$data_nabycia','$numer_dokumentu','$nazwa','$miejsce_uzytkowania','$warotsc_poczatkowa','$zlikwidowane ','$data_likwidacji','$przyczyna_likwidacji','$idUser')";
        }
        else{
            $q = "UPDATE `wyposazenie` SET `data_nabycia`='$data_nabycia',`numer_dokumentu`='$numer_dokumentu',
              `nazwa`='$nazwa',`miejsce_uzytkowania`='$miejsce_uzytkowania',`warotsc_poczatkowa`='$warotsc_poczatkowa',`zlikwidowane`='$zlikwidowane',
              `data_likwidacji`='$data_likwidacji',`przyczyna_likwidacji`='$przyczyna_likwidacji' WHERE `id`='$id'
             ";

            
        }
        
        $r = mysqli_query($abc, $q);
        
        if($r){
                $arr = array(
                    'kod'=> 0,
                    'opis'=> 'Dodano wyposazenie'
                  );
            }
            else{
                $arr = array(
                    'kod'=> -1,
                    'opis'=> 'Błąd dodawania wyposazenia'
                );
            }
        
    }

    echo $json_response = json_encode($arr); 

?>