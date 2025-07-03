import { leerArchivoSql } from '../utils/leerArchivoSql';
import  pool  from '../config/db-config';

async function inicializarBaseDeDatos() {
  try {
    const sql = leerArchivoSql('../../config/base_de_datos_.sql'); 

    const connection = await pool.getConnection();
    await connection.query(sql);
    console.log('Base de datos y tablas creadas correctamente.');
    connection.release();
  } catch (error) {
    console.error(' Error al crear la base de datos:', error);
  } finally {
    pool.end(); 
  }
}

inicializarBaseDeDatos();
