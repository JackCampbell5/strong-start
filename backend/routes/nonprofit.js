import { PrismaClient } from '#prisma/client.js';
import express from 'express'
const prisma = new PrismaClient()
const nonprofitRouter = express.Router()

nonprofitRouter.get('/', (req, res) => {
    res.send('Welcome nonprofit!');
});

export default nonprofitRouter
