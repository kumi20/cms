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
        $mounth = $_GET['month'];


        $q = "SELECT skladka_spoleczne, skladka_zdrowotne FROM skladki_zus WHERE rok='$rok' AND miesiac < '$mounth' AND user_id='$idUser';
         ";

        $r = mysqli_query($abc, $q);


                $skladki_spoleczne = 0;
                $skladki_zdrowotne = 0;

                while($w = mysqli_fetch_assoc($r)) {
                    $skladki_spoleczne += $w['skladka_spoleczne'];
                    $pom = $w['skladka_zdrowotne']/9*7.75;
                    $pom = round($pom,2);
                    $skladki_zdrowotne += $pom;
                }

                //obliczanie wysokości zapłaconych składek społecznych i zdrowotnych na ZUS
                $q = "SELECT skladka_spoleczne, skladka_zdrowotne FROM skladki_zus WHERE rok =$rok-1 && miesiac ='12';";

                $r = mysqli_query ($abc, $q);
                $w = mysqli_fetch_row($r);
                $skladki_spoleczne += $w['0'];

                //$skladki_zdrowotne = $skladki_zdrowotne/9 *7.75;
                $pom = $w['1']/9*7.75;
                $pom = round($pom,2);
                $skladki_zdrowotne += $pom;
                $skladki_zdrowotne = round($skladki_zdrowotne,1);


                //pobieranie informacji o przychodach i kosztach uzyskania przychodu

                $q = "SELECT razem_przychod, razem_wydatki FROM kpir WHERE id_user='$idUser' && rok='$rok' && miesiac <='$mounth';";
                $r = mysqli_query ($abc, $q);
                $przychod = 0;
                $koszt_uzyskania = 0;
                while($w = mysqli_fetch_assoc($r)) {
                    $przychod += $w['razem_przychod'];
                    $koszt_uzyskania += $w['razem_wydatki'];
                }

                $dochod = $przychod - $koszt_uzyskania;
                //pobieranie informacji o zapłaconych zaliczkach na podatek
                $kowta_do_opodatkowania = $dochod - $skladki_spoleczne;
                $kowta_do_opodatkowania = round($kowta_do_opodatkowania,0);

                $q = "SELECT kwota_zaliczki FROM podatek_dochodowy WHERE rok ='$rok' && miesiac <'$mounth';";
                $r = mysqli_query ($abc, $q);
                $zaliczki = 0;

                while($w = mysqli_fetch_assoc($r)) {
                    $zaliczki += $w['kwota_zaliczki'];

                }

                if ($rok <=2016){

                    if ($kowta_do_opodatkowania < 85528){
                    $podatek = 0.18*$kowta_do_opodatkowania - 556.02;
                    if ($podatek <=0 ) $podatek = 0;

                    $zaliczka_na_podatek = round($podatek - $skladki_zdrowotne,2);
                    if ($zaliczka_na_podatek <=0) $zaliczka_na_podatek = 0;
                    else{
                        $zaliczka_na_podatek = round($zaliczka_na_podatek - $zaliczki,2);
                        if ($zaliczka_na_podatek <= 0) $zaliczka_na_podatek = 0;
                    }

                    }
                    else{
                        $podatek = 14839.02 + ($dochod - 85528)*0.32;
                        if ($podatek <=0 ) $podatek = 0;
                        echo 'Podatek od początku roku: '.$podatek.'<br/>';

                        $zaliczka_na_podatek = round($podatek - $skladki_zdrowotne,2);
                        if ($zaliczka_na_podatek <=0) $zaliczka_na_podatek = 0;
                        else{
                            $zaliczka_na_podatek = round($zaliczka_na_podatek - $zaliczki,2);
                            if ($zaliczka_na_podatek <= 0) $zaliczka_na_podatek = 0;
                        }
                    }
                }
                //od stycznia 2017 nowa kwota wolna od podatku i nowe zasady wyliczania podatku
                else{ 
                    if ($kowta_do_opodatkowania < 85528){
                    $podatek = 0.18*$kowta_do_opodatkowania - 556.02;
                    if ($podatek <=0 ) $podatek = 0;

                    $zaliczka_na_podatek = round($podatek - $skladki_zdrowotne,2);
                    if ($zaliczka_na_podatek <=0) $zaliczka_na_podatek = 0;
                    else{
                        $zaliczka_na_podatek = round($zaliczka_na_podatek - $zaliczki,2);
                        if ($zaliczka_na_podatek <= 0) $zaliczka_na_podatek = 0;
                    }

                    }
                    else{
                        $podatek = 15395.04 + ($dochod - 85528)*0.32;
                        if ($podatek <=0 ) $podatek = 0;
                        echo 'Podatek od początku roku: '.$podatek.'<br/>';

                        $zaliczka_na_podatek = round($podatek - $skladki_zdrowotne,2);
                        if ($zaliczka_na_podatek <=0) $zaliczka_na_podatek = 0;
                        else{
                            $zaliczka_na_podatek = round($zaliczka_na_podatek - $zaliczki,2);
                            if ($zaliczka_na_podatek <= 0) $zaliczka_na_podatek = 0;
                        }
                    }

                }


        $arr = array(
            'rok'=>$rok,
            'miesiac'=>$mounth,
            'spoleczne'=>$skladki_spoleczne,
            'zdrowotne'=>$skladki_zdrowotne,
            'przychod'=>$przychod,
            'koszt'=>$koszt_uzyskania,
            'podatek'=>$podatek,
            'zaliczka'=>$zaliczka_na_podatek
        );
        
    }

    echo $json_response = json_encode($arr); 

?>