<?php

require '../../jwt_helper.php';
include('../../config/config.php');
header('Access-Control-Allow-Origin: *');  //I have also tried the * wildcard and get the same response
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Accept, AuthorizationToken');


    $data = json_decode(file_get_contents("php://input"));
    $id = $_GET['id'];

    $temat = $data->subject;
    $name = $data->name;
    $email = $data->email; 

    if($email != null){
         $message = "

          <b>Imie:</b>$name<br>
          <b>E-mail:</b>$email<br><br>
          <b>Treść:</b>$data->message<br><br>
        ";

        $naglowki = "Reply-to: $email  <$email>".PHP_EOL;
          // Naglowki mozna sformatowac tez w ten sposob.
        $naglowki .= "MIME-Version: 1.0".PHP_EOL;
        $naglowki .= "Content-type: text/html; charset=utf-8".PHP_EOL; 

        $q = "SELECT cms_cform_user.cform_user_email 
                FROM cms_cform_user
                LEFT JOIN cms_cform_user_conn ON cms_cform_user_conn.cform_user_id = cms_cform_user.cform_user_id
                WHERE cms_cform_user_conn.cform_id = '$id'";
        $r = mysqli_query($abc, $q);


        while ($row = mysqli_fetch_assoc($r)){
                $emailOdbiorcy = $row["cform_user_email"];
                if(mail($emailOdbiorcy,  $temat, $message, $naglowki)){

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
                }  

            }            
    }

   

    echo $json_response = json_encode($arr);
?>