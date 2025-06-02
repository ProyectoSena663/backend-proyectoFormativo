import {OutfitDTO} from "../DTO/outfitDto" //"
import pool from "../config/db-config"; 

export class OutfitRepository {
   static async getOutfitsById(id: number) {
    const query = "SELECT * FROM Outfit WHERE id_du = ?";
    const value = [id];
    const [result]: any = await pool.query(query, value);
    if (result.length === 0) {
      return null;
    }
    return result[0];
  }

    static async getOutfits() {
        const query = "SELECT * FROM Outfit";
        const [result]: any = await pool.query(query, []);
        if (result.length === 0) {
        return null;
        }
        return result;
    }

    static async createOutfit(outfit: OutfitDTO) {
        const query = "INSERT INTO Outfit (fk_id_per) VALUES (?)";
        const values = [outfit.fk_id_per];
        const [result]: any = await pool.query(query, values);
        if (result.affectedRows > 0) {
        return {
            ...outfit,
            id_ou: result.insertId,
        }
        }else{
            throw new Error("Error al crear la outfit");
        }
    } 
    
    static async deleteOutfit(id: number) {
        const query = "DELETE FROM Outfit WHERE id_ou = ?";
        const values = [id];
        const [result]: any = await pool.query(query, values);
        if (result.affectedRows > 0) {
            return true;
        } else {
            throw new Error("Error al eliminar la outfit");
        }
    }

    static async updateOutfit(id: number, outfit: OutfitDTO) {
        const query = "UPDATE Outfit SET fk_id_per = ? WHERE id_ou = ?";
        const values = [outfit.fk_id_per, id];
        const [result]: any = await pool.query(query, values);
        if (result.affectedRows > 0) {
            return {
                ...outfit,
                id_ou: id,
            };
        } else {
            throw new Error("Error al actualizar la outfit");
        }
    }
}