import { readFileSync } from 'fs';
import { join } from 'path';

export const leerArchivoSql = (archivo: string) => {
  try {
    return readFileSync(join(__dirname, '..', archivo), 'utf-8');
  } catch (err) {
    console.error('Error leyendo el archivo SQL:', err);
    throw err;
  }
}
