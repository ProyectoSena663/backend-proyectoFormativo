drop database craftyourstyle;


CREATE DATABASE CraftYourStyle; 
USE CraftYourStyle; 


CREATE TABLE Usuario (
    id_us INT AUTO_INCREMENT PRIMARY KEY, 
    nombre VARCHAR(100) NULL, 
    apellido VARCHAR(100) NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    fecha_nacimiento date null,
    red_social_login VARCHAR(100),
    password varchar(250) NOT NULL
);

CREATE TABLE Diseño (
    id_dis INT AUTO_INCREMENT PRIMARY KEY, 
    fk_id_du INT, 
    FOREIGN KEY (fk_id_du) REFERENCES Usuario(id_us) 
);


CREATE TABLE DiseñoUsuario (
    id_du INT AUTO_INCREMENT PRIMARY KEY, 
    color_prenda VARCHAR(50), 
    dibujo boolean null default 0, 
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    tipo ENUM('Camiseta', 'Camisa', 'Camibuso', 'Buso', 'Saco', 'Esqueleto') NOT NULL, 
    visibilidad ENUM('Publico', 'Privado') DEFAULT 'privado', 

    fk_id_usuario INT, 
    FOREIGN KEY (fk_id_usuario) REFERENCES Usuario(id_us) 
);


CREATE TABLE Personalizacion (
    id_per INT AUTO_INCREMENT PRIMARY KEY, 
    parte_prenda ENUM('Cuello', 'Brazalete', 'Dobladillo inferior', 'Mangas', 'Interior', 'Fondo') NOT NULL, 
    color VARCHAR(7) DEFAULT '#ffffff', 
    fk_id_du INT, 
    FOREIGN KEY (fk_id_du) REFERENCES DiseñoUsuario(id_du) 
);

