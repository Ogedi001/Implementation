import express from 'express';
import { socketInitController } from './socket_controller';
const router = express.Router();

router
.route('/')
.get(socketInitController)

export { router as socketRoute };
