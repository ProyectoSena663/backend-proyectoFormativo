import { Request, Response } from "express";
import pool from "../db/conections";

//obtener todos los diseños
export const obtenerDiseños = async (req: Request, res: Response) => {
    try{
        const [result] = await pool.query("select * from Diseño")
        res.send(result)
    }catch(err){
        console.error(err);
        res.status(500).send({
            message: "error al obtener los diseños",
        })
    }
}

//obtener un diseño por id
export const obtenerDiseñosId = async (req: Request, res: Response) => {
    try{
        const id = await pool.query("select * from Diseño where id = ?", [req.params.id])
        res.json(id);
    }catch(err){
        console.error(err);
        res.status(500).send({
            message: "error al obtener el diseño por id",
        })
    }
}

//eliminar un diseño por id
export const eliminarDiseñosId = async (req: Request, res: Response) => {
    try{
        const eliminar = await pool.query("delete from Diseño where id = ? ",[req.params.id])
        res.send(eliminar)
    }catch(err){
        console.error(err);
        res.status(500).send({
            message: "error al eliminar el diseño por id",
        })
    }
}

//actualizar un diseño por id
export const actualizarDiseñosId = async (req: Request, res: Response) => {
    try{
        const {id} = req.params;
        const actualizar = await pool.query("update Diseño set ? where id = ?", [id, req.body])
        res.send(actualizar)
    }catch(err){
        console.error(err);
        res.status(500).send({
            message: "error al actualizar el diseño por id",
        })
    }
}