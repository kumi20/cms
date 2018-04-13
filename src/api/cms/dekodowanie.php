<?php
require 'jwt_helper.php';
include('config/config.php');

header('Access-Control-Allow-Origin: *');  //I have also tried the * wildcard and get the same response
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Accept, Authorization-token, Authorization');

$data = json_decode(file_get_contents("php://input"));

$login ='kumi20';
$haslo = md5('10kumi62');

$secret_key = 'kumiSoft';

$headers = apache_request_headers();

$token = $_SERVER['PHP_AUTH_USER']."<br>";

$token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJrdW1pMjAud2ViZC5wbCIsInVzZXJJZCI6Ik1nPT0iLCJuYW1lIjoiSmFrdWIgS3VtaVx1MDExOWdhIn0.gHDwXY0MawQ4ZFwqDFcJQ66WFrp1EWT8zKUfTHuT-9o';

//$token = JWT::decode($token, $secret_key);

 $user = array('token' => $token);
  echo json_encode($headers);
?>
