<?php

    $data = json_decode(file_get_contents("php://input"));
    $tresc = $data->tresc;
    
    $imie = $data->imie;
    $ulica = $data->ulica;
    $miejscowosc = $data->miejscowosc;
    $kod = $data->kod;
    $email = $data->email;
    $telefon = $data->telefon;
    $kwotaCalosc = $data->kwota;
    $platnosci = $data->platnosc;

    // Naglowki mozna sformatowac tez w ten sposob.
    $naglowki .= "From: 'dietoterapia@trixo.com.pl'  <dietoterapia@trixo.com.pl>".PHP_EOL;
    $naglowki .= "MIME-Version: 1.0".PHP_EOL;
    $naglowki .= "Content-type: text/html; charset=utf-8".PHP_EOL; 
    $text = "

    <b>Zamówienie:</b><br>
    $tresc<br><br>

    metoda płatnosci: $platnosci<br><br>

    <b>Imie i nazwisko:</b>$imie<br>
    <b>ulica: </b> $ulica<br>
    <b>miejscowosc: </b> $miejscowosc<br>
    <b>kod: </b>$kod<br>
    <b>email: </b>$email<br>
    <b>telefon: </b>$telefon<br><br>

    <b>Wartosc zamowienia z przesylka:<b>$kwotaCalosc zł<br>
  ";
  mail('kumi.muscle@gmail.com', 'Wiadomosc ze strony', $text, $naglowki);

  if($platnosci != 'pobranie'){
    $text = "
    <div style=\"width:600px; margin:0 auto; border-bottom: 3px solid black;\">
        <center><a href=\"http://warzywkubek.pl/sklep/\"><img src=\"http://warzywkubek.pl/img/warzyw-kubek.png\" style=\"width:190px;  margin-bottom:5px;\"></a></center>
    </div>
    <div style=\"width:600px; margin:0 auto; border-bottom: 3px solid black;\">
        <center><p style=\"font-weight:bold; font-size:22px;\">Witaj </p></center>
        <p>DZIĘKUJEMY ZA ZAKUPY</p><br>
        <p>ZAMÓWIENIE - OCZEKIWANIE NA PRZELEW</p>
        <p>Twoje zamówienie zostało przyjęte do realizacji i jego wysyłka nastąpi po otrzymaniu Twojej płatności.</p><br>
        <p><b>WYBRAŁEŚ PRZELEW BANKOWY JAKO ZAPŁATĘ</b></p>
        <p>Oto dane bankowe do przelewu:</p>
        <p><b>Kwota:</b> $kwotaCalosc</p>
        <p><b>Właściciel konta:</b> Warzyw Kubek Monika Rybka</p>
        <p><b>Dane konta:</b> 22 1320 1537 3040 1925 3000 0001</p>
        <p><b>Adres banku:</b> Bank Pocztowy SA</p>
    </div>";

    mail('sheldon86@wp.pl', 'Warzyw Kubek Zamówienie', $text, $naglowki);
  }
  

  $arr = 'wyslana';
  echo $json_response = json_encode($arr); 
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
?>