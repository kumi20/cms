<?php
require 'jwt_helper.php';
include('config/config.php');


$data = json_decode(file_get_contents("php://input"));

$login ='kumi20';
$haslo = md5('10kumi62');

$secret_key = 'kumiSoft';

$q = "SELECT cms_user.user_id, cms_user_password.user_password, cms_user.user_name FROM cms_user LEFT JOIN cms_user_password ON cms_user.user_id = cms_user_password.user_id WHERE cms_user.user_login='$login' AND cms_user.user_status_id = 1";
$r = mysqli_query($abc, $q);

$w = mysqli_fetch_array($r);

$user = array(
      'iss' => 'kumi20.webd.pl',
      'userId'=> base64_encode($w['0']),
      'name'=> $w['2']
);

$token = JWT::encode($user, $secret_key);

//$token2 = JWT::decode($user, $secret_key);

 $user = array('token' => $token);
  header('Content-Type: application/json');
  header('Access-Control-Allow-Origin: *');
  
  
 // echo json_encode($user).'<br>';

  //odszyfrowanie otrzymanego tokena
  //$token = JWT::decode($user, $secret_key);
  echo json_encode($user);
?>