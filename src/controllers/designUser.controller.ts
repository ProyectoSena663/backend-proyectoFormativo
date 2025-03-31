import { Request, Response } from "express";
import pool from "../db/conections";

//crear diseño de usuario
export const crearDesignUser = async (req: Request, res: Response) => {
    try{
        const {colorPrenda,dibujo,fechaCreacion,tipo,visibilidad,posicionX,posicionY,posicionZ,rotacionX,rotacionY,rotacionZ,escalaX,escalaY,escalaZ} = req.body;
        const [result] = await pool.query("insert into DiseñoUsuario (colorPrenda,dibujo,fechaCreacion,tipo,visibilidad,posicionX,posicionY,posicionZ,rotacionX,rotacionY,rotacionZ,escalaX,escalaY,escalaZ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [colorPrenda,dibujo,fechaCreacion,tipo,visibilidad,posicionX,posicionY,posicionZ,rotacionX,rotacionY,rotacionZ,escalaX,escalaY,escalaZ]);
        res.send({
            id: result,
            colorPrenda,
            dibujo,
            fechaCreacion,
            tipo,
            visibilidad,
            posicionX,
            posicionY,
            posicionZ,
            rotacionX,
            rotacionY,
            rotacionZ,
            escalaX,
            escalaY,
            escalaZ
        });
    }catch(err){
        console.error(err);
        res.status(500).send({
            message: "error al crear el diseño de usuario",
        });
    }
}

//obtener todos los diseños de usuario
export const obtenerDesignUser = async (req: Request, res: Response) => {
    try{
        const [result] = await pool.query("select * from DiseñoUsuario");
        res.send(result);
    }catch(err){
        console.error(err);
        res.status(500).send({
            message: "error al obtener los diseños de usuario",
        });
    }
}

//obtener un diseño de usuario por id
export const obtenerDesignUserId = async (req: Request, res: Response) => {
    try{
        const id = await pool.query("select * from DiseñoUsuario where id = ?", [req.params.id])
        res.json(id);
    }catch(err){
        console.error(err);
        res.status(500).send({
            message: "error al obtener el diseño de usuario por id",
        })
    }
}

//eliminar un diseño de usuario por id
export const eliminarDesignUserId = async (req: Request, res: Response) => {
    try{
        const eliminar = await pool.query("delete from DiseñoUsuario where id = ? ",[req.params.id])
        res.send(eliminar)
    }catch(err){
        console.error(err);
        res.status(500).send({
            message: "error al eliminar el diseño de usuario por id",
        })
    }
}

//actualizar un diseño de usuario por id    
export const actualizarDesignUserId = async (req: Request, res: Response) => {
    try{
        const {colorPrenda,dibujo,fechaCreacion,tipo,visibilidad,posicionX,posicionY,posicionZ,rotacionX,rotacionY,rotacionZ,escalaX,escalaY,escalaZ} = req.body;
        const id = await pool.query("update DiseñoUsuario set colorPrenda = ?, dibujo = ?, fechaCreacion = ?, tipo = ?, visibilidad = ?, posicionX = ?, posicionY = ?, posicionZ = ?, rotacionX = ?, rotacionY = ?, rotacionZ = ?, escalaX = ?, escalaY = ?, escalaZ = ? where id = ?",
        [colorPrenda,dibujo,fechaCreacion,tipo,visibilidad,posicionX,posicionY,posicionZ,rotacionX,rotacionY,rotacionZ,escalaX,escalaY,escalaZ,req.params.id])
        res.send(id)
    }catch(err){
        console.error(err);
        res.status(500).send({
            message: "error al actualizar el diseño de usuario por id",
        })
    }
}