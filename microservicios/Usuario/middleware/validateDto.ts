// middleware/validateDto.ts
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export const validateDto = (DtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const dtoInstance = plainToInstance(DtoClass, req.body);

    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      res.status(400).json({
        message: 'Datos inválidos',
        errors: errors.map(err => ({
          campo: err.property,
          errores: Object.values(err.constraints || {}),
        })),
      });
    }

    // Reemplaza el body con la instancia ya transformada (con tipos correctos)
    req.body = dtoInstance;
    next();
  };
};
