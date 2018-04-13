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
        
        
        $rok = $_GET['year'];
        
        $q = "SELECT razem_przychod, razem_wydatki FROM kpir
        WHERE rok = '$rok' AND id_user='$idUser';
        ";

        $r = mysqli_query($abc, $q);

        $przychod_rok = 0;
        $wydatki_rok = 0;

        while ($row = mysqli_fetch_assoc($r)){
                $przychod_rok += $row['razem_przychod'];
                $wydatki_rok += $row['razem_wydatki'];
        }

        $arr = array(
            "przychod_rok" => $przychod_rok,
            "wydatki_rok" => $wydatki_rok,
            "dochod_rok" => $przychod_rok - $wydatki_rok
        );

    }

    echo $json_response = json_encode($arr); 

?>