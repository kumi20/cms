<?php
    require '../jwt_helper.php';
    include('../config/config.php');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');



$idKatalogu = $_GET['idKatalog'];
$nameGallery = $_GET['nameGallery'];
$descriptionGallery = $_GET['descriptionGallery'];

if($idKatalogu == '0'){
    
    $q = "SELECT count(*) FROM  `cms_gallery` WHERE gallery_name='$nameGallery'";
    $r = mysqli_query($abc, $q);
    $w = mysqli_fetch_row($r);
    
    $jest = $w[0];
    
    if($w[0] < 1){
        $q = "INSERT INTO `cms_gallery`(`gallery_photo_id`, `gallery_name`, `gallery_desc`, `gallery_photo_thumb_height`, `gallery_photo_thumb_width`, `gallery_photo_height`, `gallery_photo_width`) VALUES ('0','$nameGallery','$descriptionGallery','0','0','0','0')";
        $r = mysqli_query($abc, $q);
    }
    
    
    
    $q = "SELECT `gallery_id`
            FROM  `cms_gallery` 
            ORDER BY  `gallery_id` DESC 
            LIMIT 1";
    $r = mysqli_query($abc, $q);
    $w = mysqli_fetch_row($r);
    
    $idKatalogu = $w[0];    
}

    

$katalog = $_SERVER['DOCUMENT_ROOT'].'/cms/assets/gallery/'.$idKatalogu;
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
    $_SERVER['DOCUMENT_ROOT'].'/cms/assets/gallery/'.$idKatalogu.'/'.$_FILES['file']['name']);
    
    $img = imagecreatefromjpeg($_SERVER['DOCUMENT_ROOT'].'/cms/assets/gallery/'.$idKatalogu.'/'.$_FILES['file']['name']);
    $width  = imagesx($img);
    $height = imagesy($img);

    $procent = 1024/$width;

    $width_mini = $width * $procent;
    $height_mini = $height * $procent;
    $img_mini = imagecreatetruecolor($width_mini, $height_mini);

    imagecopyresampled($img_mini, $img, 0, 0, 0, 0, $width_mini , $height_mini, $width  , $height);
    $urlMiniaturki = $_SERVER['DOCUMENT_ROOT'].'/cms/assets/gallery/'.$idKatalogu.'/'.$_FILES['file']['name'];
    imagejpeg($img_mini, $urlMiniaturki, 80);
    
    $nameImage = $_FILES['file']['name'];
    $galleryPhotoDesc = $_GET['description'];
    if ($galleryPhotoDesc == 'undefined') $galleryPhotoDesc='';
    $size = filesize($_SERVER['DOCUMENT_ROOT'].'/cms/assets/gallery/'.$idKatalogu.'/'.$_FILES['file']['name']);
    
    
    $procent = 250/$width;

    $width_mini = $width * $procent;
    $height_mini = $height * $procent;
    $img_mini = imagecreatetruecolor($width_mini, $height_mini);
    
    
    

    imagecopyresampled($img_mini, $img, 0, 0, 0, 0, $width_mini , $height_mini, $width  , $height);
    
    
    $katalog = $_SERVER['DOCUMENT_ROOT'].'/cms/assets/gallery/'.$idKatalogu.'/thumb';
    if (!file_exists($katalog)) {
        mkdir("$katalog");
        //teraz nadaj prawa katalogowi za pomocom chmod();
        }
        if(is_dir("$katalog")){
        $zawartosc_katalogu = readdir("$katalog");
        }else{
        echo('podany plik nie jest katalogiem');
        }

    $urlMiniaturki = $_SERVER['DOCUMENT_ROOT'].'/cms/assets/gallery/'.$idKatalogu.'/thumb/'.$_FILES['file']['name'];
    imagejpeg($img_mini, $urlMiniaturki, 80);
    imagedestroy($img);
    imagedestroy($img_mini);

    $q = "INSERT INTO `cms_gallery_photo`(`gallery_id`, `gallery_photo_name`, `gallery_photo_desc`, `gallery_photo_copyrights`, `gallery_photo_filesize`) 
    VALUES ('$idKatalogu','$nameImage','$galleryPhotoDesc','','$size')";
    $r = mysqli_query($abc, $q);
    
    $q = "SELECT  `gallery_photo_id` FROM  `cms_gallery_photo` WHERE  `gallery_id` ='$idKatalogu' LIMIT 1";
    $r = mysqli_query($abc, $q);
    $w = mysqli_fetch_row($r);
    
    $q = "DELETE FROM `cms_gallery_photo` WHERE `gallery_photo_name`=''";
    $r = mysqli_query($abc, $q);
    
    $q = "DELETE FROM `cms_gallery_photo` WHERE `gallery_photo_name`=''";
    $r = mysqli_query($abc, $q);
    
    $idPhotoDesc = $w[0];
    
    $q = "UPDATE `cms_gallery` SET `gallery_photo_id`='$idPhotoDesc', `gallery_name`='$nameGallery',`gallery_desc`='$descriptionGallery' WHERE `gallery_id` ='$idKatalogu'";
    $r = mysqli_query($abc, $q);
    
    echo  $nameGallery;
    
    
}
?>
