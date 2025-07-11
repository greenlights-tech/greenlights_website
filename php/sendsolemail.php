<?php
file_put_contents("log.txt", "Request received\n", FILE_APPEND);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "c.nanninga@qquest.nl";

    // Check required fields
    if (
        empty($_POST["voornaam"]) ||
        empty($_POST["achternaam"]) ||
        empty($_POST["email"]) ||
        !isset($_POST["voorwaarden"])
    ) {
        file_put_contents("log.txt", "Required fields missing\n", FILE_APPEND);
        exit("Vul alle verplichte velden in.");
    }

    // Check if reCAPTCHA response exists
    if (empty($_POST["g-recaptcha-response"])) {
        file_put_contents("log.txt", "No reCAPTCHA response received\n", FILE_APPEND);
        exit("Bevestig dat je geen robot bent.");
    }

    // Verify reCAPTCHA with Google
    $recaptcha_secret = '6LfVWn8rAAAAAK45Zkx9iBPq2Ytl9YM04d1kAXwf';
    $recaptcha_response = $_POST['g-recaptcha-response'];

    $verify_response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$recaptcha_secret}&response={$recaptcha_response}");
    $captcha_success = json_decode($verify_response);

    if (!$captcha_success->success) {
        file_put_contents("log.txt", "reCAPTCHA verification failed\n", FILE_APPEND);
        exit("Bevestiging mislukt. Probeer het opnieuw.");
    }

    // Sanitize and validate input
    $voornaam = strip_tags(trim($_POST["voornaam"]));
    $achternaam = strip_tags(trim($_POST["achternaam"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $telnummer = isset($_POST["tel"]) ? strip_tags(trim($_POST["tel"])) : "";

    file_put_contents("log.txt", "Sanitized values: $voornaam, $achternaam, $email, $telnummer\n", FILE_APPEND);

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        file_put_contents("log.txt", "Validate email check failed\n", FILE_APPEND);
        exit("Ongeldig e-mailadres.");
    }

    // Prevent header injection in email field
    if (preg_match("/[\r\n]/", $email)) {
        file_put_contents("log.txt", "Prevent header injection check failed\n", FILE_APPEND);
        exit("Ongeldig e-mailadres.");
    }

    // Validate voornaam
    if (
        !preg_match("/^[\p{L}\p{M}0-9\s'’-]{1,100}$/u", $voornaam) ||
        preg_match("/[\r\n]/", $voornaam)
    ) {
        file_put_contents("log.txt", "Voornaam check failed: $voornaam\n", FILE_APPEND);
        exit("Ongeldige voornaam.");
    }

    // Validate achternaam
    if (!preg_match("/^[\p{L}\p{M}0-9\s'’-]{1,100}$/u", $achternaam)
        preg_match("/[\r\n]/", $achternaam)
    ) {
        file_put_contents("log.txt", "Achternaam check failed: $achternaam\n", FILE_APPEND);
        exit("Ongeldige achternaam.");
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
        file_put_contents("log.txt", "Telefoon check failed: $telnummer\n", FILE_APPEND);
        exit("Ongeldig telefoonnummer.");
    }


    // Check voorwaarden value
    $voorwaarden = isset($_POST["voorwaarden"]) ? "Ja" : "Nee";

    // Compose email
    $subject = "$voornaam $achternaam wil solliciteren";

    $body = "Voornaam: $voornaam\n";
    $body .= "Achternaam: $achternaam\n";
    $body .= "Email: $email\n";
    $body .= "Telefoonnummer: $telnummer\n";
    $body .= "Akkoord met voorwaarden: $voorwaarden\n";

    $headers = "From: no-reply@greenlights.tech\r\nReply-To: $email";

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
