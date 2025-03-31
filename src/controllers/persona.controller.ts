import { Request, Response } from "express";
import pool from "../db/conections";

//crear personalizacion 
export const crearPersonalizacion = async (req: Request, res: Response) => {
    try{
        const {partePrenda,color} = req.body;
        const [result] = await pool.query("insert into Personalizacion (partePrenda,color) values (?,?)",
        [partePrenda,color]);
        res.send({
            id: result,
            partePrenda,
            color
        });
    }catch(err){
        console.error(err);
        res.status(500).send({
            message: "error al crear la personalizacion",
        });
    }
}

//obtener todas las personalizaciones
export const obtenerPersonalizaciones = async (req: Request, res: Response) => {
    try{
        const [result] = await pool.query("select * from Personalizacion");
        res.send(result);
    }catch(err){
        console.error(err);
        res.status(500).send({
            message: "error al obtener las personalizaciones",
        });
    }
}

//obtener una personalizacion por id
export const obtenerPersonalizacionesId = async (req: Request, res: Response) => {
    try{
        const id = await pool.query("select * from Personalizacion where id = ?", [req.params.id])
        res.json(id);
    }catch(err){
        console.error(err);
        res.status(500).send({
            message: "error al obtener la personalizacion por id",
        })
    }
}

//eliminar una personalizacion por id
export const eliminarPersonalizacionesId = async (req: Request, res: Response) => {
    try{
        const eliminar = await pool.query("delete from Personalizacion where id = ? ",[req.params.id])
        res.send(eliminar)
    }catch(err){
        console.error(err);
        res.status(500).send({
            message: "error al eliminar la personalizacion por id",
        })
    }
}

//actualizar una personalizacion por id
export const actualizarPersonalizacionesId = async (req: Request, res: Response) => {
    try{
        const {partePrenda,color} = req.body;
        const [result] = await pool.query("update Personalizacion set partePrenda = ?, color = ? where id = ?",
        [partePrenda,color,req.params.id]);
        res.send(result);
    }catch(err){
        console.error(err);
        res.status(500).send({
            message: "error al actualizar la personalizacion",
        });
    }
}