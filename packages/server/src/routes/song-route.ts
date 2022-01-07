import { Router } from "express";
import * as controller from "../controllers/song-controller";

const router = Router();

router.get('/', controller.get);
router.get('/:id', controller.getById);
router.get('/folder/:folder', controller.getByFolder);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

export default router;