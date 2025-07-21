<?php
function log_with_timestamp($message) {
    $timestamp = date("Y-m-d H:i:s");
    file_put_contents("log.txt", "[$timestamp] $message\n", FILE_APPEND);
}

log_with_timestamp("Request received");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "info@greenlights.tech";

    // Check required fields
    if (
        empty($_POST["naam"]) ||
        empty($_POST["email"]) ||
        !isset($_POST["voorwaarden"])
    ) {
        log_with_timestamp("Required fields missing");
        exit("Vul alle verplichte velden in.");
    }

    // Check if reCAPTCHA response exists
    // if (empty($_POST["g-recaptcha-response"])) {
    //     log_with_timestamp("No reCAPTCHA response received");
    //     exit("Bevestig dat je geen robot bent.");
    // }

    // Verify reCAPTCHA with Google
    // $recaptcha_secret = '';
    // $recaptcha_response = $_POST['g-recaptcha-response'];

    // $verify_response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$recaptcha_secret}&response={$recaptcha_response}");
    // $captcha_success = json_decode($verify_response);

    // if (!$captcha_success->success) {
    //     log_with_timestamp("reCAPTCHA verification failed");
    //     exit("Bevestiging mislukt. Probeer het opnieuw.");
    // }

    // Sanitize and validate input
    $naam = strip_tags(trim($_POST["naam"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $telnummer = isset($_POST["tel"]) ? strip_tags(trim($_POST["tel"])) : "";

    log_with_timestamp("Sanitized values: $naam, $email, $telnummer");

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        log_with_timestamp("Validate email check failed");
        exit("Ongeldig e-mailadres.");
    }

    // Prevent header injection in email field
    if (preg_match("/[\r\n]/", $email)) {
        log_with_timestamp("Prevent header injection check failed");
        exit("Ongeldig e-mailadres.");
    }

    // Validate naam
    if (
        !preg_match("/^[\p{L}\p{M}0-9\s'’-]{1,100}$/u", $naam) ||
        preg_match("/[\r\n]/", $naam)
    ) {
        log_with_timestamp("Naam check failed: $naam");
        exit("Ongeldige naam.");
    }

    // Validate telefoonnummer if provided
    if (
        !empty($telnummer) &&
        (
            strlen($telnummer) > 20 ||
            !preg_match("/^\+?[0-9]{1,4}?[\s\-()0-9]{6,}$/", $telnummer) ||
            preg_match("/[\r\n]/", $telnummer)
        )
    ) {
        log_with_timestamp("Telefoon check failed: $telnummer");
        exit("Ongeldig telefoonnummer.");
    }

    // Check voorwaarden value
    $voorwaarden = isset($_POST["voorwaarden"]) ? "Ja" : "Nee";

    // Compose email
    $subject = "$naam wil solliciteren";

    $body = "Naam: $naam\n";
    $body .= "Email: $email\n";
    $body .= "Telefoonnummer: $telnummer\n";
    $body .= "Akkoord met voorwaarden: $voorwaarden\n";

    $headers = "From: no-reply@greenlights.tech\r\nReply-To: $email";

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        log_with_timestamp("Email sent successfully");
        echo "Verzonden!";
    } else {
        log_with_timestamp("Email sending failed");
        echo "Er is iets mis gegaan, probeer het later opnieuw.";
    }

} else {
    log_with_timestamp("No POST request received");
    exit("Geen formulier verzonden.");
}
?>
