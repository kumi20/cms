<?php

 header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

$uploads_dir = '/location/for/files';

if ($_FILES["file"]["error"] == UPLOAD_ERR_OK) {
    $tmp_name = $_FILES["file"]["tmp_name"];
    $name = basename($_FILES["file"]["name"]);
    move_uploaded_file($_FILES['file']['tmp_name'],
                  $_SERVER['DOCUMENT_ROOT'].'/source/'.$_FILES['file']['name']);
				  echo $_SERVER['DOCUMENT_ROOT'].'/source/'.$_FILES['file']['name'];
}
?>

