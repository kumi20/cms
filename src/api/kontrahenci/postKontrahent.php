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
        
            $nip = $data->nip;
            $name = $data->name;
            $street = $data->street;
            $postcode= $data->postcode;
            $miejscowosc = $data->miejscowosc;
            $person = $data->person;
            $telephone = $data->telephone;
            $fax = $data->fax;
            $email = $data->email;
            $www = $data->www;
            $dostawca = $data->dostawca;
            $odbiorca = $data->odbiorca;
            $id_kon = $data->id_kon;

            if ($odbiorca == null) $odbiorca = "0";
            if($dostawca == null) $dostawca ="0";

            if ($id_kon == 0){
                $q = "INSERT INTO kontrahenci(NIP, Name, Street, Postcode, miejscowosc, Person_contact, telephone, fax, email, www, dostawca, odbiorca, user_id) 
                VALUES ('$nip','$name', '$street', '$postcode', '$miejscowosc', '$person', '$telephone', '$fax', '$email', '$www', '$dostawca', '$odbiorca','$idUser')";
            }
            else{
                $q = "UPDATE kontrahenci SET NIP='$nip',Name='$name',Street='$street',Postcode='$postcode',miejscowosc='$miejscowosc',Person_contact='$person',
                telephone='$telephone',fax='$fax',email='$email',www='$www',dostawca='$dostawca',odbiorca='$odbiorca' WHERE id='$id_kon'";
            }
        
            $r = mysqli_query ($abc, $q);
            if($r){
                $arr = array(
                    'kod'=> 0,
                    'opis'=> 'Dodano kontrahenta'
                  );
            }
            else{
                $arr = array(
                    'kod'=> -1,
                    'opis'=> 'Błąd dodawania kontrahenta'
                );
            }
        }

        echo $json_response = json_encode($arr); 

?>