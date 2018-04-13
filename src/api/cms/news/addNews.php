<?php
    require '../jwt_helper.php';
    include('../config/config.php');
    header('Access-Control-Allow-Origin: *');  //I have also tried the * wildcard and get the same response
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Accept, AuthorizationToken');

    $headers = getallheaders();

    $data = json_decode(file_get_contents("php://input"));

    
    $secret_key = 'kumiSoft';

    $idUser = $headers['Authorizationtoken'];
    $idUser = JWT::decode($idUser, $secret_key);
    $idUser = base64_decode($idUser->userId);

    $czyPublikowac = $data->czyPublikowac;
    $news_pub_date = $data->news_pub_date;
    $news_name = $data->news_name;
    $news_lead_img = $data->news_lead_img;
    $news_lead = $data->news_lead;
    $news_content = $data->news_content;
    $idNewsa = $data->idNewsa;
    $grupa = $data->grupa;

    $today = date("Y-m-d H:i:s");
    if($czyPublikowac && $news_pub_date <= $today) $news_status = 3;
    else if ($czyPublikowac && $news_pub_date > $today) $news_status = 2;
    else $news_status = 1;


    if($idNewsa == 0){
        $q = "INSERT INTO `cms_news`(`news_name`, `news_content`, `news_pub_date`, 
            `news_status`, `news_views`, `news_lead`, 
            `news_lead_img`, `gallery_id`, `news_newsletter_daily`, `news_newsletter_weekly`, `insu`, 
            `insd`, `lupdu`, `lupdd`) 
            VALUES ('$news_name','$news_content','$news_pub_date','$news_status','0',
            '$news_lead','$news_lead_img','0','0','0','$idUser','$today',null,null)";
    }
    else{
        $q = "UPDATE `cms_news` SET `news_name`='$news_name',`news_content`='$news_content',
        `news_pub_date`='$news_pub_date',`news_status`='$news_status',`news_lead`='$news_lead',
        `news_lead_img`='$news_lead_img', `lupdu`='$idUser',`lupdd`='$today' WHERE `news_id`='$idNewsa'";
    }
    
    $r = mysqli_query($abc, $q);   

    if($r){
        $arr = array(
            'kod'=> 0,
            'opis'=> 'Dodano newsa'
          );
    }
    else{
        $arr = array(
            'kod'=> -1,
            'opis'=> 'Błąd dodawania newsa'
        );
    }
    
    if($idNewsa == 0){
        $q2 = "SELECT `news_id` FROM `cms_news` ORDER BY `news_id` DESC LIMIT 1";
        $r2 = mysqli_query($abc, $q2);  
 
        $w = mysqli_fetch_row($r2);
        $idNewsa = $w['0'];

       for($j = 0; $j < count($grupa); $j++){
            $q = "INSERT INTO `cms_news_group_conn`(`news_id`, `news_group_id`) VALUES ('$idNewsa','$grupa[$j]')";
            $r = mysqli_query($abc, $q); 
        }
        
    }
    else{
        $q = "DELETE FROM `cms_news_group_conn` WHERE `news_id`= $idNewsa";
        $r = mysqli_query($abc, $q); 

        for($j = 0; $j < count($grupa); $j++){
            //$user = json_encode($idNewsa);
            $gr = json_encode($grupa[$j]);
            $q = "INSERT INTO `cms_news_group_conn`(`news_id`, `news_group_id`) VALUES ('$idNewsa','$grupa[$j]')";
            $r = mysqli_query($abc, $q); 
        }
    }

    echo $json_response = json_encode($idUser); 

?>