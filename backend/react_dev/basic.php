<?php


header('Access-Control-Allow-Origin: *');
$data = file_get_contents('http://localhost/api/basic');

echo ($data);
