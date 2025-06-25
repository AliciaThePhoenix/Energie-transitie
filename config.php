<?php
$host = 'localhost';
$user = 'jouw_db_gebruiker';
$pass = 'jouw_db_wachtwoord';
$db   = 'energie-transitie';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Verbinding mislukt: " . $conn->connect_error);
}
?> 