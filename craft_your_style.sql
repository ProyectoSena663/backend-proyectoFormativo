CREATE DATABASE craft_your_style;

USE craft_your_style;

CREATE TABLE camisetas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    codigo_hex VARCHAR(10) NOT NULL,
    rgb VARCHAR(40) NULL,
    disponible BOOLEAN DEFAULT 1
);