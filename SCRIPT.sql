
CREATE DATABASE CraftYourStyle; 
USE CraftYourStyle; 


CREATE TABLE Usuario (
    id_us INT AUTO_INCREMENT PRIMARY KEY, 
    nombre VARCHAR(100) NOT NULL, 
    apellido VARCHAR(100) NOT NULL, 
    red_social_login VARCHAR(100) 
);


CREATE TABLE Diseño (
    id_dis INT AUTO_INCREMENT PRIMARY KEY, 
    fk_id_du INT, 
    FOREIGN KEY (fk_id_du) REFERENCES Usuario(id_us) 
);


CREATE TABLE DiseñoUsuario (
    id_du INT AUTO_INCREMENT PRIMARY KEY, 
    color_prenda VARCHAR(50), 
    dibujo VARCHAR(255), 
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    tipo ENUM('camiseta', 'camisa', 'camibuso', 'buso', 'saco', 'esqueleto') NOT NULL, 
    visibilidad ENUM('publico', 'privado') DEFAULT 'privado', 

    
    posicion_x FLOAT NOT NULL, 
    posicion_y FLOAT NOT NULL, 
    posicion_z FLOAT NOT NULL, 
    rotacion_x FLOAT DEFAULT 0, 
    rotacion_y FLOAT DEFAULT 0, 
    rotacion_z FLOAT DEFAULT 0, 
    escala_x FLOAT DEFAULT 1, 
    escala_y FLOAT DEFAULT 1, 
    escala_z FLOAT DEFAULT 1, 

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

