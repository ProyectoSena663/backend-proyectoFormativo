import {OutfitDTO} from "../DTO/outfitDto" //"
import pool from "../config/db-config"; 

export class OutfitRepository {
    static async getOutfits() {
        try {
            const sql = `
            SELECT 
                o.id_ou AS id_outfit,
                u.nombre AS nombre_usuario,
                u.id_us AS id_usuario,
                du.id_du AS id_disenousuario,
                du.dibujo,
                du.fecha_creacion AS fecha_creacion_diseno,
                du.visibilidad,
                per.id_per AS id_personalizacion,
                per.color AS color_personalizacion,
                per.parte_prenda_camisa,
                per.parte_prenda_pantalon,
                per.parte_prenda_gorra
            FROM Outfit o
            JOIN Personalizacion per ON o.fk_id_per = per.id_per
            JOIN DisenoUsuario du ON per.fk_id_du = du.id_du
            JOIN Usuario u ON du.fk_id_usuario = u.id_us
            WHERE u.id_us = 1
            ORDER BY o.id_ou DESC;
            `;
            
            const [rows]: any = await pool.query(sql);
            return rows;
        } catch (error) {
            console.error("Error en getOutfits:", error);
            throw error;
        }
    }
}