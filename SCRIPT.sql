-- Crear la base de datos
CREATE DATABASE CraftYourStyle; -- Base de datos principal del sistema
USE CraftYourStyle; -- Seleccionar la base de datos para trabajar

-- Tabla de usuarios (Almacena la información de los usuarios del sistema)
CREATE TABLE Usuario (
    id_us INT AUTO_INCREMENT PRIMARY KEY, -- Identificador único del usuario
    nombre VARCHAR(100) NOT NULL, -- Nombre del usuario
    apellido VARCHAR(100) NOT NULL, -- Apellido del usuario
    red_social_login VARCHAR(100) -- Método de autenticación con redes sociales
);

-- Tabla de diseños (Guarda los diseños creados por los usuarios)
CREATE TABLE Diseño (
    id_dis INT AUTO_INCREMENT PRIMARY KEY, -- Identificador único del diseño
    fk_id_du INT, -- Relación con el usuario que creó el diseño
    FOREIGN KEY (fk_id_du) REFERENCES Usuario(id_us) -- Llave foránea que enlaza con la tabla Usuario
);

-- Tabla de diseños personalizados por usuario (Almacena detalles de cada diseño)
CREATE TABLE DiseñoUsuario (
    id_du INT AUTO_INCREMENT PRIMARY KEY, -- Identificador único del diseño del usuario
    color_prenda VARCHAR(50), -- Color principal de la prenda
    dibujo VARCHAR(255), -- Guarda la URL o ruta de la imagen
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha y hora de creación del diseño
    tipo ENUM('camiseta', 'camisa', 'camibuso', 'buso', 'saco', 'esqueleto') NOT NULL, -- Tipo de prenda
    visibilidad ENUM('publico', 'privado') DEFAULT 'privado', -- Nivel de visibilidad del diseño

    -- Propiedades para modelado 3D
    posicion_x FLOAT NOT NULL, -- Posición X en el espacio 3D
    posicion_y FLOAT NOT NULL, -- Posición Y en el espacio 3D
    posicion_z FLOAT NOT NULL, -- Posición Z en el espacio 3D
    rotacion_x FLOAT DEFAULT 0, -- Rotación en eje X
    rotacion_y FLOAT DEFAULT 0, -- Rotación en eje Y
    rotacion_z FLOAT DEFAULT 0, -- Rotación en eje Z
    escala_x FLOAT DEFAULT 1, -- Escala en eje X
    escala_y FLOAT DEFAULT 1, -- Escala en eje Y
    escala_z FLOAT DEFAULT 1, -- Escala en eje Z

    fk_id_usuario INT, -- Relación con el usuario que hizo el diseño
    FOREIGN KEY (fk_id_usuario) REFERENCES Usuario(id_us) -- Llave foránea que enlaza con la tabla Usuario
);

-- Tabla de personalización de prendas (Define modificaciones aplicadas a los diseños)
CREATE TABLE Personalizacion (
    id_per INT AUTO_INCREMENT PRIMARY KEY, -- Identificador único de la personalización
    parte_prenda ENUM('Cuello', 'Brazalete', 'Dobladillo inferior', 'Mangas', 'Interior', 'Fondo') NOT NULL, -- Parte de la prenda a modificar
    color VARCHAR(7) DEFAULT '#ffffff', -- Código de color en formato hexadecimal
    fk_id_du INT, -- Relación con el diseño del usuario
    FOREIGN KEY (fk_id_du) REFERENCES DiseñoUsuario(id_du) -- Llave foránea que enlaza con la tabla DiseñoUsuario
);

