import { socketRoute } from "./socket.router";
import { Router } from "express";

const router = Router();

router.use('/socket', socketRoute)

export {router as applicationRoute}