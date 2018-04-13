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
        
        $month = $_GET['month'];
        $year = $_GET['year'];

        $q = "SELECT kpir.id, kpir.data_zd, kpir.nr_dow, kontrahenci.name, kpir.razem_przychod, kpir.zakup_towarow, kpir.koszty_uboczne, kpir.wynagrodzenie_gotowka, 
        kpir.pozostale_wydatki, kpir.opis_zdarzenia, kpir.czy_przy FROM kpir
        LEFT JOIN kontrahenci ON kontrahenci.id = kpir.id_kont
        WHERE kpir.miesiac = '$month' AND rok = '$year' AND id_user = '$idUser' ORDER BY kpir.data_zd;
         ";

        $r = mysqli_query($abc, $q);

        $arr = array();

        while ($row = mysqli_fetch_assoc($r)){
            $arr[] = $row;
        }
        
    }

    echo $json_response = json_encode($arr); 

?>