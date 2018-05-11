<?php
require '../jwt_helper.php';
include('../config/config.php');

header('Access-Control-Allow-Origin: *');  //I have also tried the * wildcard and get the same response
    header('Access-Control-Allow-Methods: GET');
    header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Accept');

$data = json_decode(file_get_contents("php://input"));

$login = $data->user;
$haslo = md5($data->psw);

$secret_key = 'kumiSoft';

$q = "SELECT cms_customer.customer_id, cms_customer.customer_name, cms_customer.customer_post_code, cms_customer.customer_city, cms_customer.customer_street, cms_customer.customer_nip, cms_custromer_user.customer_psw
FROM cms_customer
LEFT JOIN cms_custromer_user ON cms_customer.customer_id = cms_custromer_user.customer_id
WHERE cms_custromer_user.customer_login = '$login'";
$r = mysqli_query($abc, $q);

if (mysqli_num_rows($r))
	{
      $w = mysqli_fetch_array($r);
      $hasloBD = $w['customer_psw'];
      $user_name = $w['customer_name'];

      $id_user = $w['customer_id'];
  
      if( $haslo == $hasloBD){
          $arr = array(
            'kod'=>0,
            'iss' => 'kumi20.webd.pl',
            'userId'=> base64_encode($w['0']),
            'name'=> $w['1']
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
  
  echo $json_response = json_encode($arr);
?>