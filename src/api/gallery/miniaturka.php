<?php
    
    $img = imagecreatefromjpeg('http://kumi20.webd.pl/assets/gallery/13/shutterstock_368543360-e1495187967571.jpg');
    $width  = imagesx($img);
    $height = imagesy($img);

    $procent = 250/$width;

    $width_mini = $width * $procent;
    $height_mini = $height * $procent;
    $img_mini = imagecreatetruecolor($width_mini, $height_mini);

    imagecopyresampled($img_mini, $img, 0, 0, 0, 0, $width_mini , $height_mini, $width  , $height);

    $urlMiniaturki = $_SERVER['DOCUMENT_ROOT'].'/assets/gallery/13/baner_thumb.jpg';
    imagejpeg($img_mini, $urlMiniaturki, 80);
    imagedestroy($img);
    imagedestroy($img_mini);
?>
