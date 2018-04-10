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

        $q = "SELECT `param_value` FROM `cms_config` WHERE `param_name`='Sender'";
        $r = mysqli_query($abc, $q);
        
        $w = mysqli_fetch_row($r);
        $mailNadawcy= $w['0'];
        
        $idNewsletter = $_GET['id'];
        
        $q = "SELECT `nletter_name`,`nletter_content` FROM `cms_nletter` WHERE `nletter_id`='$idNewsletter'";
        $r = mysqli_query($abc, $q);
        
        $w = mysqli_fetch_row($r);
        
        $temat = $w['0'];
        $tresc = $w['1'];
            
        $naglowki = "Reply-to: $mailNadawcy  <$mailNadawcy>".PHP_EOL;
      // Naglowki mozna sformatowac tez w ten sposob.
           $naglowki .= "MIME-Version: 1.0".PHP_EOL;
           $naglowki .= "Content-type: text/html; charset=utf-8".PHP_EOL; 
        
        $q = "SELECT `nletter_subscription_email` FROM `cms_nletter_subscription`";
        $r = mysqli_query($abc, $q);
        
        $error = false;
        while ($row = mysqli_fetch_assoc($r)){
            $emailOdbiorcy = $row["nletter_subscription_email"];
            $licznik ++;
            if(mail($emailOdbiorcy,  $temat, $tresc, $naglowki)){

                $arr = array(
                    'kod'=> 0,                    
                    'opis'=> 'Wysłano wiadomość'
                );
            }
            else{
                $arr = array(
                        'kod'=> -1,
                        'opis'=> 'błąd wysyłki'
                );
                $error = true;
            }  
            
        }    
       
        if(!$error){
            $q = "UPDATE `cms_nletter` SET `nletter_sent`=true WHERE `nletter_id`='$idNewsletter'";
            $r = mysqli_query($abc, $q);
        }
    }
        
        

        echo $json_response = json_encode($arr); 

?>