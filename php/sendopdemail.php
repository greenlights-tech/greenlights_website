<?php
file_put_contents("log.txt", "Request received\n", FILE_APPEND);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "info@greenlights.tech";

    // Check required fields
    if (
        empty($_POST["naam"]) ||
        empty($_POST["email"]) ||
        !isset($_POST["voorwaarden"])
    ) {
        file_put_contents("log.txt", "Required fields missing\n", FILE_APPEND);
        exit("Vul alle verplichte velden in.");
    }

    // Check if reCAPTCHA response exists
    // if (empty($_POST["g-recaptcha-response"])) {
    //     file_put_contents("log.txt", "No reCAPTCHA response received\n", FILE_APPEND);
    //     exit("Bevestig dat je geen robot bent.");
    // }

    // Verify reCAPTCHA with Google
    // $recaptcha_secret = '6LfVWn8rAAAAAK45Zkx9iBPq2Ytl9YM04d1kAXwf';
    // $recaptcha_response = $_POST['g-recaptcha-response'];

    // $verify_response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$recaptcha_secret}&response={$recaptcha_response}");
    // $captcha_success = json_decode($verify_response);

    // if (!$captcha_success->success) {
    //     file_put_contents("log.txt", "reCAPTCHA verification failed\n", FILE_APPEND);
    //     exit("Bevestiging mislukt. Probeer het opnieuw.");
    // }

    // Sanitize and validate input
    $naam = strip_tags(trim($_POST["naam"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $telnummer = isset($_POST["tel"]) ? strip_tags(trim($_POST["tel"])) : "";
    $opmerkingen = strip_tags(trim($_POST["opmerkingen"]));

    file_put_contents("log.txt", "Sanitized values: $naam, $email, $telnummer\n", FILE_APPEND);

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        file_put_contents("log.txt", "Validate email check failed\n", FILE_APPEND);
        exit("Ongeldig e-mailadres.");
    }

    // Voorkom header injection op rest van velden
    foreach ([$naam, $telnummer, $opmerkingen] as $veld) {
    if (preg_match("/[\r\n]/", $veld)) {
        file_put_contents("log.txt", "Header injection poging\n", FILE_APPEND);
        exit("Ongeldige invoer gedetecteerd.");
        }
    }

    // Prevent header injection in email field
    if (preg_match("/[\r\n]/", $email)) {
        file_put_contents("log.txt", "Prevent header injection check failed\n", FILE_APPEND);
        exit("Ongeldig e-mailadres.");
    }

    // Validate Naam
    if (!preg_match("/^[\p{L}\p{M}0-9\s'’-]{1,100}$/u", $naam)) {
        file_put_contents("log.txt", "Naam check failed: $naam\n", FILE_APPEND);
        exit("Ongeldige naam.");
    }

    // Validate telefoonnummer if provided
    if (!empty($telnummer) && !preg_match("/^[0-9+\-\s()]{7,20}$/", $telnummer)) {
        file_put_contents("log.txt", "Telefoon check failed: $telnummer\n", FILE_APPEND);
        exit("Ongeldig telefoonnummer.");
    }

    if (!empty($opmerkingen) && !preg_match("/^[\p{L}\p{M}0-9\s.,!?:;\"'()\[\]\-\/\n]{1,400}*$/u", $opmerkingen)) {
        file_put_contents("log.txt", "Opmerkingen check failed: $opmerkingen\n", FILE_APPEND);
        exit("Ongeldige opmerkingen.");
    }

    // Check voorwaarden value
    $voorwaarden = isset($_POST["voorwaarden"]) ? "Ja" : "Nee";
    

    // Compose email
    $subject = "$naam heeft een aanvraag";

    $body = "Naam: $naam\n";
    $body .= "Email: $email\n";
    $body .= "Telefoonnummer: $telnummer\n";
    $body .= "Akkoord met voorwaarden: $voorwaarden\n";
    $body .= "Opmerkingen: $opmerkingen\n";

    $headers = [
    'From' => 'no-reply@greenlights.tech',
    'Reply-To' => $email
    ];

    $headers_string = "";
    foreach ($headers as $key => $value) {
        $headers_string .= "$key: $value\r\n";
    }


    // Send email
    if (mail($to, $subject, $body, $headers)) {
        file_put_contents("log.txt", "Email sent successfully\n", FILE_APPEND);
        echo "Verzonden!";
    } else {
        file_put_contents("log.txt", "Email sending failed\n", FILE_APPEND);
        echo "Er is iets mis gegaan, probeer het later opnieuw.";
    }

} else {
    file_put_contents("log.txt", "No POST request received\n", FILE_APPEND);
    exit("Geen formulier verzonden.");
}
?>
