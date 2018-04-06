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
        $lat = $data[0]->lat;
        $lng = $data[0]->lng;
        $title = $data[0]->title;
        $description = $data[0]->description;
        $grupa = $data[0]->grupa;
        
        $id = $_GET['id'];
        
        if($id == 0){
            $q = "INSERT INTO `cms_map`(`map_name`, `map_content`, `map_szer`, `map_dlug`) VALUES ('$title','$description','$lat','$lng')";
            $r = mysqli_query ($abc, $q);
        
            $q2 = "SELECT `map_id` FROM `cms_map` ORDER BY `map_id` DESC LIMIT 1";
            $r2 = mysqli_query($abc, $q2);  

            $w = mysqli_fetch_row($r2);
            $idMap = $w['0'];

           for($j = 0; $j < count($grupa); $j++){
               
                $q = "INSERT INTO `cms_map_group_conn`(`map_id`, `map_group_id`) VALUES ('$idMap','$grupa[$j]')";
                $r = mysqli_query($abc, $q); 
            }
            
            
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
        else{
            $q = "UPDATE `cms_map` SET `map_name`='$title',`map_content`='$description',`map_szer`='$lat',`map_dlug`='$lng' WHERE `map_id`='$id'";
            $r = mysqli_query ($abc, $q);
            
            $q = "DELETE FROM `cms_map_group_conn` WHERE `map_id`= $id";
            $r = mysqli_query($abc, $q);
            
            for($j = 0; $j < count($grupa); $j++){
               
                $q = "INSERT INTO `cms_map_group_conn`(`map_id`, `map_group_id`) VALUES ('$id','$grupa[$j]')";
                $r = mysqli_query($abc, $q); 
            }
            
            if($r){
                    $arr = array(
                        'kod'=> 0,
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
       
    }
        
        

        echo $json_response = json_encode($arr); 

?>