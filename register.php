<?php
session_start();
require 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $naam = trim($_POST['naam']);
    $email = trim($_POST['email']);
    $wachtwoord = $_POST['wachtwoord'];

    if (empty($naam) || empty($email) || empty($wachtwoord)) {
        $error = "Vul alle velden in.";
    } else {
        $stmt = $conn->prepare("SELECT id FROM user WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            $error = "E-mailadres is al geregistreerd.";
        } else {
            $hash = password_hash($wachtwoord, PASSWORD_DEFAULT);
            $stmt = $conn->prepare("INSERT INTO user (naam, email, wachtwoord) VALUES (?, ?, ?)");
            $stmt->bind_param("sss", $naam, $email, $hash);
            if ($stmt->execute()) {
                header("Location: login.php");
                exit;
            } else {
                $error = "Registratie mislukt.";
            }
        }
        $stmt->close();
    }
}
?>
<!-- HTML registratieformulier -->
<form method="post">
    Naam: <input type="text" name="naam"><br>
    E-mail: <input type="email" name="email"><br>
    Wachtwoord: <input type="password" name="wachtwoord"><br>
    <button type="submit">Registreren</button>
</form>
<?php if (isset($error)) echo "<p>$error</p>"; ?> 