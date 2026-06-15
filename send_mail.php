<?php
// ============================================
// Steinmann Melktechnik – Kontaktformular Mail
// SMTP via PHPMailer
// ============================================

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/lib/phpmailer/Exception.php';
require __DIR__ . '/lib/phpmailer/PHPMailer.php';
require __DIR__ . '/lib/phpmailer/SMTP.php';

header('Content-Type: application/json; charset=utf-8');

// Nur POST erlauben
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Methode nicht erlaubt.']);
    exit;
}

// Honeypot-Spamschutz
if (!empty($_POST['_honey'])) {
    echo json_encode(['success' => true, 'message' => 'Nachricht gesendet.']);
    exit;
}

// Formulardaten auslesen & bereinigen
$name    = trim(htmlspecialchars($_POST['name'] ?? '', ENT_QUOTES, 'UTF-8'));
$email   = trim(filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL));
$phone   = trim(htmlspecialchars($_POST['phone'] ?? '', ENT_QUOTES, 'UTF-8'));
$subject = trim(htmlspecialchars($_POST['subject'] ?? '', ENT_QUOTES, 'UTF-8'));
$message = trim(htmlspecialchars($_POST['message'] ?? '', ENT_QUOTES, 'UTF-8'));

// Pflichtfelder prüfen
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Bitte füllen Sie alle Pflichtfelder aus.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Bitte geben Sie eine gültige E-Mail-Adresse ein.']);
    exit;
}

// Betreff
$betreff = !empty($subject) ? $subject : 'Allgemeine Anfrage';

// Datum
$datum = date('d.m.Y \u\m H:i \U\h\r');

// Telefon-Anzeige
$phoneDisplay = !empty($phone) ? $phone : '–';

// HTML E-Mail Body
$htmlBody = '
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:0; background-color:#f4f1eb; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f1eb; padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px; width:100%;">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #2d6a4f 0%, #1b4332 100%); border-radius:16px 16px 0 0; padding:36px 40px; text-align:center;">
              <h1 style="margin:0; font-size:22px; font-weight:700; color:#ffffff; letter-spacing:0.5px;">
                🌾 Steinmann Melktechnik GmbH
              </h1>
              <p style="margin:8px 0 0; font-size:13px; color:rgba(255,255,255,0.75); letter-spacing:0.3px;">
                Neue Kontaktanfrage via Website
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background-color:#ffffff; padding:36px 40px;">

              <!-- Betreff Badge -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:28px;">
                <tr>
                  <td>
                    <span style="display:inline-block; background-color:#52b788; color:#ffffff; font-size:12px; font-weight:600; padding:5px 14px; border-radius:20px; text-transform:uppercase; letter-spacing:0.8px;">
                      ' . $betreff . '
                    </span>
                    <span style="display:inline-block; margin-left:12px; font-size:13px; color:#6b6b6b;">
                      ' . $datum . '
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Kontaktdaten -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f8f7f4; border-radius:12px; padding:24px; margin-bottom:28px;">
                <tr>
                  <td style="padding-bottom:14px; border-bottom:1px solid #e0dcd4;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="100" style="font-size:13px; font-weight:600; color:#2d6a4f; vertical-align:top; padding-right:12px;">Name</td>
                        <td style="font-size:15px; color:#2c2c2c; font-weight:500;">' . $name . '</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:14px; padding-bottom:14px; border-bottom:1px solid #e0dcd4;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="100" style="font-size:13px; font-weight:600; color:#2d6a4f; vertical-align:top; padding-right:12px;">E-Mail</td>
                        <td style="font-size:15px; color:#2c2c2c;">
                          <a href="mailto:' . $email . '" style="color:#2d6a4f; text-decoration:none;">' . $email . '</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:14px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="100" style="font-size:13px; font-weight:600; color:#2d6a4f; vertical-align:top; padding-right:12px;">Telefon</td>
                        <td style="font-size:15px; color:#2c2c2c;">' . $phoneDisplay . '</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Nachricht -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding-bottom:10px;">
                    <h2 style="margin:0; font-size:15px; font-weight:600; color:#2d6a4f; text-transform:uppercase; letter-spacing:0.8px;">Nachricht</h2>
                  </td>
                </tr>
                <tr>
                  <td style="font-size:15px; line-height:1.7; color:#2c2c2c; background-color:#fefcf8; border-left:4px solid #d4a373; padding:20px 24px; border-radius:0 12px 12px 0;">
                    ' . nl2br($message) . '
                  </td>
                </tr>
              </table>

              <!-- Antwort-Button -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:32px;">
                <tr>
                  <td align="center">
                    <a href="mailto:' . $email . '?subject=Re: ' . rawurlencode($betreff) . ' – Steinmann Melktechnik"
                       style="display:inline-block; background: linear-gradient(135deg, #2d6a4f, #52b788); color:#ffffff; font-size:14px; font-weight:600; padding:14px 32px; border-radius:50px; text-decoration:none; letter-spacing:0.3px;">
                      ✉️ Direkt antworten
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#1a1a1a; border-radius:0 0 16px 16px; padding:28px 40px; text-align:center;">
              <p style="margin:0; font-size:13px; color:rgba(255,255,255,0.6); line-height:1.6;">
                Steinmann Melktechnik GmbH · Bernstrasse 7a · 6152 Hüswil LU
              </p>
              <p style="margin:8px 0 0; font-size:12px; color:rgba(255,255,255,0.35);">
                Diese E-Mail wurde automatisch über das Kontaktformular auf steinmann-melktechnik.ch gesendet.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>';

// PHPMailer konfigurieren
try {
    $mail = new PHPMailer(true);

    // SMTP-Einstellungen
    $mail->isSMTP();
    $mail->Host       = 'mail.your-server.de';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'info@steinmannhoftech.ch';
    $mail->Password   = '!LeliBist.1561!';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;
    $mail->CharSet    = 'UTF-8';

    // Absender & Empfänger
    $mail->setFrom('info@steinmannhoftech.ch', 'Steinmann Melktechnik Webseite');
    $mail->addAddress('steinmann.urs@bluewin.ch', 'Urs Steinmann');
    $mail->addReplyTo($email, $name);

    // Inhalt
    $mail->isHTML(true);
    $mail->Subject = '🌾 Neue Anfrage: ' . $betreff . ' – Steinmann Melktechnik';
    $mail->Body    = $htmlBody;
    $mail->AltBody = "Neue Kontaktanfrage von {$name}\n\nE-Mail: {$email}\nTelefon: {$phoneDisplay}\nBetreff: {$betreff}\n\nNachricht:\n{$message}";

    $mail->send();

    echo json_encode(['success' => true, 'message' => 'Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.']);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Leider konnte die Nachricht nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns telefonisch.'
    ]);
}
