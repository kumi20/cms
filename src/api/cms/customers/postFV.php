<?php
require '../jwt_helper.php';
include('../config/config.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');


    $idUser = $_GET['idUser'];
    $fvName = $_GET['name'];

    $mount = $_GET['mounth'];
    $year = $_GET['year'];

    $katalog = $_SERVER['DOCUMENT_ROOT'].'/customersFiles';
    $fvUrl = $_FILES['file']['name'];

    $today = date("Y-m-d");
    $nowa_data = date( 'y-m-d', strtotime( $today.' +7 day' ));


    $q = "INSERT INTO `cms_customer_fv`(`fv_url`, `fv_mounth`, `fv_year`, `customer_id`, `date_insert`, `date_pay`, `fv_name`, `data_term`) VALUES 
         ('$fvUrl', '$mount', '$year', '$idUser', '$today', null , '$fvName', '$nowa_data')";
    $r = mysqli_query($abc, $q);  

    $q = "DELETE FROM `cms_customer_fv` WHERE `fv_url`=''";
    $r = mysqli_query($abc, $q);

    $katalog = $_SERVER['DOCUMENT_ROOT'].'/customersFiles';
    if (!file_exists($katalog)) {
        mkdir("$katalog");
        //teraz nadaj prawa katalogowi za pomocom chmod();
        }
        if(is_dir("$katalog")){
        $zawartosc_katalogu = readdir("$katalog");
        }else{
        echo('podany plik nie jest katalogiem');
        }

    if ($_FILES["file"]["error"] == UPLOAD_ERR_OK) {
        $tmp_name = $_FILES["file"]["tmp_name"];
        $name = basename($_FILES["file"]["name"]);
        move_uploaded_file($_FILES['file']['tmp_name'],
                      $katalog.'/'.$_FILES['file']['name']);
    }

?>