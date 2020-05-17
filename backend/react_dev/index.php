<?php


header('Access-Control-Allow-Origin: *');
$data = file_get_contents('http://localhost/api/plotting?ch1=HDR-T&ch2=FSC-A');

echo ($data);
