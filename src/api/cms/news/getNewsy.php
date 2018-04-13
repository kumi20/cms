<?php

require '../jwt_helper.php';
include('../config/config.php');
header('Access-Control-Allow-Origin: *');  //I have also tried the * wildcard and get the same response
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Accept, AuthorizationToken');


    $q = "SELECT
	cms_news.news_id,
    cms_news.news_lead_img,
    cms_news.news_name,
    cms_news.news_lead,
    cms_news.news_views,
    cms_news_status.news_status_name,
    cms_news.news_pub_date
FROM cms_news
LEFT JOIN cms_news_status ON cms_news_status.news_status_id = cms_news.news_status
ORDER BY insd DESC";

    $r = mysqli_query($abc, $q);
    
    $arr = array();
    
        while ($row = mysqli_fetch_assoc($r)){
            $arr[] = $row;
        }

    echo $json_response = json_encode($arr);
?>