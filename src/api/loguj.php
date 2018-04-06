<?php
require 'jwt_helper.php';
include('config/config.php');

$data = json_decode(file_get_contents("php://input"));

$login = $data->user;
$haslo = md5($data->psw);

$secret_key = 'kumiSoft';

$q = "SELECT cms_user.user_id, cms_user_password.user_password, cms_user.user_name FROM cms_user LEFT JOIN cms_user_password ON cms_user.user_id = cms_user_password.user_id WHERE cms_user.user_login='$login' AND cms_user.user_status_id = 1";
$r = mysqli_query($abc, $q);

if (mysqli_num_rows($r))
	{
      $w = mysqli_fetch_array($r);
      $hasloBD = $w['user_password'];
      $user_name = $w['user_name'];

      $id_user = $w['user_id'];
  
      if( $haslo == $hasloBD){
          $arr = array(
            'kod'=>0,
            'iss' => 'kumi20.webd.pl',
            'userId'=> base64_encode($w['0']),
            'name'=> $w['2']
        );

      }
      else{
          $arr = array(
            'kod'=>-1,
            'opis'=>'błędne hasło'
          );

      }
  }
  else{
      $arr = array(
        'kod'=> 404,
        'opis'=> 'brak użytkownika lub konto zablokowane'
      );

  }

  $arr = JWT::encode($arr, $secret_key);
  
  header('Content-Type: application/json');
  header('Access-Control-Allow-Origin: *');
  echo $json_response = json_encode($arr);
?>