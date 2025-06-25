<?php
session_start();
require 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email']);
    $wachtwoord = $_POST['wachtwoord'];

    $stmt = $conn->prepare("SELECT id, naam, wachtwoord FROM user WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 1) {
        $stmt->bind_result($id, $naam, $hash);
        $stmt->fetch();
        if (password_verify($wachtwoord, $hash)) {
            $_SESSION['user_id'] = $id;
            $_SESSION['naam'] = $naam;
            $_SESSION['email'] = $email;
            header("Location: /");
            exit;
        } else {
            $error = "Ongeldig wachtwoord.";
        }
    } else {
        $error = "Gebruiker niet gevonden.";
    }
    $stmt->close();
}
?>
<!-- HTML loginformulier -->
<form method="post">
    E-mail: <input type="email" name="email"><br>
    Wachtwoord: <input type="password" name="wachtwoord"><br>
    <button type="submit">Inloggen</button>
</form>
<?php if (isset($error)) echo "<p>$error</p>"; ?> 