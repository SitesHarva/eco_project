<?php

session_start();
header('Content-Type: application/json');

if(isset($_SESSION['log']) && $_SESSION['log'] === true) {
    echo json_encode(['log' => true]);
} else {
    echo json_encode(['log' => false]);
}



?>