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

CREATE TABLE Diseno (
    id_dis INT AUTO_INCREMENT PRIMARY KEY, 
    fk_id_du INT, 
    FOREIGN KEY (fk_id_du) REFERENCES Usuario(id_us) 
);


CREATE TABLE DisenoUsuario (
    id_du INT AUTO_INCREMENT PRIMARY KEY, 
    color_prenda VARCHAR(50), 
    dibujo boolean null default 0, 
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    tipo ENUM('camiseta', 'camisa', 'camibuso', 'buso', 'saco', 'esqueleto') NOT NULL, 
    visibilidad ENUM('publico', 'privado') DEFAULT 'privado', 

    fk_id_usuario INT, 
    FOREIGN KEY (fk_id_usuario) REFERENCES Usuario(id_us) 
);

CREATE TABLE Personalizacion (
    id_per INT AUTO_INCREMENT PRIMARY KEY, 
    parte_prenda_camisa ENUM('Cuello', 'Brazalete', 'Dobladillo inferior', 'Mangas', 'Interior', 'Fondo') NULL, 
    parte_prenda_pantalon enum("zona inferior", "entubado", "parches", "bota corta", "bota larga") null,
    parte_prenda_gorra enum("maya", "gorra plana", "gorra ovalada", "correa"),
    color VARCHAR(7) DEFAULT '#ffffff', 
    fk_id_du INT, 
    FOREIGN KEY (fk_id_du) REFERENCES DisenoUsuario(id_du) 
);

create table Outfit (
	id_ou int auto_increment primary key,
    fk_id_per int,
    foreign key (fk_id_per) references personalizacion(id_per)
);