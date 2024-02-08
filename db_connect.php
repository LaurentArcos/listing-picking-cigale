<?php

$host = "seagale.fr";
$db_name = "seagale";
$username = "seagale";
$password = "Tz72kp35&";

// connect to mysql server
$mysqli = new mysqli($host, $username, $password, $db_name);

// check if any connection error was encountered
if(mysqli_connect_errno()) {
    echo "Error: Could not connect to database.";
    exit;
}
?>
