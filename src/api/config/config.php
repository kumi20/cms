<?php
define('DB_US','kuba');
define('DB_PASS','10kumi62');
define('DB_HOST','localhost');
define('DB_NAME','cms');


$abc = @mysqli_connect(DB_HOST, DB_US, DB_PASS, DB_NAME);
mysqli_set_charset($abc, "utf8");
if (!$abc){
	trigger_error('nie mozna polaczyc z baza My SQL:'.mysqli_connect_error());
}

?>