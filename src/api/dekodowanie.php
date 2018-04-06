<?php
require 'jwt_helper.php';
include('config/config.php');

header('Access-Control-Allow-Origin: *');  //I have also tried the * wildcard and get the same response
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Accept, Authorization, AuthorizationToken');


$data = json_decode(file_get_contents("php://input"));

$login ='kumi20';
$haslo = md5('10kumi62');

$secret_key = 'kumiSoft';

$headers = getallheaders();

//$token = $_SERVER['PHP_AUTH_USER'];

$token = $headers['Authorization'];



$token = JWT::decode($token, $secret_key);


 $user = array('token' => $token);

  echo json_encode($user);
?>