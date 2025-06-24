import { PrismaClient } from '../generated/prisma/client.js';
import express from 'express'
const prisma = new PrismaClient()
const refugeeRouter = express.Router()

refugeeRouter.get('/', (req, res) => {
    res.send('Welcome refugee!');
});

export default refugeeRouter
