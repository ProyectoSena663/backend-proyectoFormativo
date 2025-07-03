import { readFileSync } from 'fs';
import { join } from 'path';

export const leerArchivoSql = (archivo: string) => readFileSync(join(__dirname,".." ,archivo), 'utf-8');