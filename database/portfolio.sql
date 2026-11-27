CREATE DATABASE IF NOT EXISTS akeesha_portfolio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE akeesha_portfolio;

CREATE TABLE IF NOT EXISTS contact_messages (
    id         INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    full_name  VARCHAR(100) NOT NULL,
    email      VARCHAR(150) NOT NULL,
    subject    VARCHAR(150) NOT NULL,
    message    TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
