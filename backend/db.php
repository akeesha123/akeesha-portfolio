<?php
// Database settings. These stay on the server and are never sent to the browser.
// Defaults match a fresh XAMPP install. Change them for any other host.
const DB_HOST = 'localhost';
const DB_NAME = 'akeesha_portfolio';
const DB_USER = 'root';
const DB_PASS = '';

function getPDO(): PDO
{
    static $pdo = null;
    if ($pdo === null) {
        $pdo = new PDO(
            'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
            DB_USER,
            DB_PASS,
            [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false, // real prepared statements
            ]
        );
    }
    return $pdo;
}
