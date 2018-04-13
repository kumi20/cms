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
        $idRozchodu = $data->idRozchodu;

        $miesiac = $data->miesiac;
        $rok = $data->rok;
        $dataZd = $data->dataZd;
        $nr_dow = $data->nr_dow;
        $opis_zdarzenia = $data->opis_zdarzenia;
        $id_kont = $data->id_kont;
        $zakup_towarow = $data->zakup_towarow;
        $wynagrodzenie_gotowka = $data->wynagrodzenie_gotowka;
        $koszty_uboczne = $data->koszty_uboczne;
        $pozostale_wydatki = $data->pozostale_wydatki;
        $uwagi = $data->uwagi;
        $razem_wydatki = $zakup_towarow + $wynagrodzenie_gotowka + $koszty_uboczne + $pozostale_wydatki;
        
        if ($idRozchodu != 0)
	{
		$q = "UPDATE kpir SET 
				nr_dow='$nr_dow',
				id_kont='$id_kont',
				zakup_towarow='$zakup_towarow',
				koszty_uboczne='$koszty_uboczne',
				wynagrodzenie_gotowka='$wynagrodzenie_gotowka',
				pozostale_wydatki = '$pozostale_wydatki',
				razem_wydatki = '$razem_wydatki',
				opis_zdarzenia='$opis_zdarzenia',
				rok='$rok', 
				miesiac= '$miesiac',
				uwagi='$uwagi',
				data_zd='$dataZd' 
			WHERE id = '$idRozchodu';
	 	";
        }
        else{
            $q = "INSERT INTO kpir(nr_dow, id_kont, przych, pozostale_przychody, razem_przychod, zakup_towarow, koszty_uboczne, wynagrodzenie_gotowka, pozostale_wydatki,
              razem_wydatki, opis_zdarzenia, rok, miesiac, uwagi, data_zd, czy_przy, id_user) 
              VALUES (
                '$nr_dow',
                '$id_kont',
                '0.00',
                '0.00',
                '0.00',
                '$zakup_towarow',
                '$koszty_uboczne',
                '$wynagrodzenie_gotowka',
                '$pozostale_wydatki',
                '$razem_wydatki',
                '$opis_zdarzenia',
                '$rok',
                '$miesiac',
                '$uwagi',
                '$dataZd',
                0,
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
                    'opis'=> 'Błąd dodawania rozchodu'
                );
            }
        }

        echo $json_response = json_encode($arr); 

?>