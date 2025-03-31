import { Router } from "express";
import { colorController } from "../controllers/color.controller";
import { colorSchema } from "../schemas/colorSchema";
import { schemaValidator } from "../middlewares/schemaValidator-middleware";

const router = Router();

router.post("/color", schemaValidator(colorSchema), colorController);

export default router;
