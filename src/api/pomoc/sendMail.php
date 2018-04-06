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
        $imie = $data->imie;
        $email = $data->email;
        $telefon = $data->telefon;
        $firma = $data->firma;
        $wiadomosc = $data->wiadomosc;
        
         $naglowki = "Reply-to: $email  <$email>".PHP_EOL;
      // Naglowki mozna sformatowac tez w ten sposob.
           $naglowki .= "MIME-Version: 1.0".PHP_EOL;
           $naglowki .= "Content-type: text/html; charset=utf-8".PHP_EOL; 
            $text = "

              <b>Imie:</b>$imie<br>
              <b>Email:</b>$email<br>
              <b>Telefon</b>$telefon<br>
              <b>Firma:</b>$firma<br>
              <b>Wiadomość:</b>$wiadomosc<br>
            ";
            
        if (mail('kumi.muscle@gmail.com', 'Wiadomosc ze strony', $text, $naglowki)){
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
        

        $naglowki = "Reply-to: no-reply@qumi-soft.pl  <no-reply@qumi-soft.pl>".PHP_EOL;  
        $naglowki .= "MIME-Version: 1.0".PHP_EOL;
        $naglowki .= "Content-type: text/html; charset=utf-8".PHP_EOL; 
        $text = "
            <p>Szanowni Państwo!<br /><br />
            Dziękujemy za przesłaną wiadomość. Nasi pracownicy z uwagą zapoznają się z Państwa korespondencją. Dołożymy starań, aby uzyskali Państwo odpowiedź w jak najkrótszym terminie.<br /><br />
            Uprzejmie prosimy nie odpowiadać na tę wiadomość, ponieważ została ona wygenerowana automatycznie przez system obsługi poczty elektronicznej.<br />
            W związku z powyższym, nasi specjaliści nie będą mieli możliwości zapoznania się z Państwa odpowiedzią.<br /><br />
            Pozdrawiamy,<br />Dział Obsługi Klienta<br /></p>
        ";
        
        mail($email, 'Wiadomosc ze strony', $text, $naglowki);
    }

    echo $json_response = json_encode($arr); 

?>