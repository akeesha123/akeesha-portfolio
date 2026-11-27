<?php
declare(strict_types=1);
require __DIR__ . '/db.php';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function respond(int $status, bool $success, string $message, array $errors = []): void
{
    http_response_code($status);
    echo json_encode(['success' => $success, 'message' => $message, 'errors' => $errors]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, false, 'Method not allowed.');
}

// Honeypot: real visitors never fill this hidden field.
if (!empty($_POST['website'])) {
    respond(200, true, 'Thank you! Your message has been sent.');
}

// Trim and remove control characters.
function field(string $key): string
{
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', (string)($_POST[$key] ?? ''));
    return trim($value ?? '');
}

$data = [
    'full_name' => field('full_name'),
    'email'     => field('email'),
    'subject'   => field('subject'),
    'message'   => field('message'),
];

$errors = [];
if (mb_strlen($data['full_name']) < 2 || mb_strlen($data['full_name']) > 100) {
    $errors['full_name'] = 'Please enter your full name (2-100 characters).';
}
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL) || mb_strlen($data['email']) > 150) {
    $errors['email'] = 'Please enter a valid email address.';
}
if (mb_strlen($data['subject']) < 3 || mb_strlen($data['subject']) > 150) {
    $errors['subject'] = 'Please enter a subject (3-150 characters).';
}
if (mb_strlen($data['message']) < 10 || mb_strlen($data['message']) > 2000) {
    $errors['message'] = 'Please write a message (10-2000 characters).';
}
if ($errors) {
    respond(422, false, 'Please correct the highlighted fields.', $errors);
}

try {
    $stmt = getPDO()->prepare(
        'INSERT INTO contact_messages (full_name, email, subject, message) VALUES (:full_name, :email, :subject, :message)'
    );
    $stmt->execute($data);
    respond(200, true, 'Thank you! Your message has been sent.');
} catch (PDOException $e) {
    error_log('Contact form DB error: ' . $e->getMessage()); // details go to the server log only
    respond(500, false, 'Sorry, your message could not be saved. Please try again later.');
}
