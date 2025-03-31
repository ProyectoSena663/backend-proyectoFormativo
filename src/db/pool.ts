import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "craft_your_style",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const verificarConexion = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Conectado a la base de datos correctamente");
    connection.release();
  } catch (error: any) {
    console.error("Error al conectar con la base de datos", error.message);
  }
};

verificarConexion();

export default pool;
