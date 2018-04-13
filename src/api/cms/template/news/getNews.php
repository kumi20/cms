<?php

require '../../jwt_helper.php';
include('../../config/config.php');
header('Access-Control-Allow-Origin: *');  //I have also tried the * wildcard and get the same response
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Accept, AuthorizationToken');


    $id = $_GET['id'];

    $today = date("Y-m-d");

    $q = "SELECT cms_news.news_id, cms_news.news_pub_date, cms_news.news_name, cms_news.news_lead, cms_news.news_content, cms_news_group.news_group_name,
    cms_news.news_lead_img, cms_news_group.news_group_name, cms_news_group.news_group_perpage 
    FROM `cms_news` 
    LEFT JOIN cms_news_group_conn ON cms_news.news_id = cms_news_group_conn.news_id 
    LEFT JOIN cms_news_group ON cms_news_group.news_group_id = cms_news_group_conn.news_group_id 
    WHERE cms_news_group.news_group_id = '$id' AND cms_news.news_status != '1' AND cms_news.news_pub_date<='$today' ORDER BY cms_news.news_pub_date DESC";

    $r = mysqli_query($abc, $q);
    
    $arr = array();
    
        while ($row = mysqli_fetch_assoc($r)){
            $arr[] = $row;
        }

    echo $json_response = json_encode($arr);
?>