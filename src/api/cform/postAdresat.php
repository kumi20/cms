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
        $name = $data->name;
        $email = $data->email;
        $stanowisko = $data->stanowisko;
        $id = $data->id;

        
        if($id == 0){
            $q = "INSERT INTO `cms_cform_user`(`cform_user_name`, `cform_user_email`, `cform_user_title`) VALUES ('$name','$email','$stanowisko')";
           
                
            }
        else{
            $q = "UPDATE `cms_cform_user` SET  `cform_user_name`='$name',`cform_user_email`='$email',`cform_user_title`='$stanowisko' WHERE `cform_user_id`='$id'";
        }
        
        $r = mysqli_query ($abc, $q);           
        if($r){
            $arr = array(
                'kod'=> 0,
                'id_event' => $id_event,
                'opis'=> 'Dodano nowy punkt'
            );
        }
        else{
            $arr = array(
                'kod'=> -1,
                'opis'=> 'Błąd dodawania punktu'
            );
        }
       
    }
        
        

        echo $json_response = json_encode($arr); 

?>