import http, { createServer } from "http";
import express from "express";
import dotenv from "dotenv";
import Transaction from "./routers/index.js";
dotenv.config();

const router = express();

router.use(express.json());
// router.use(formidable());
router.use(express.urlencoded({extended:true}));



/**
 * Create server and running server
 */
const httpServer = http.createServer(router);
httpServer.listen(process.env.SERVER_PORT, () => console.log(`Server running on port ${process.env.SERVER_PORT}`));

router.use('/transaction', Transaction);

