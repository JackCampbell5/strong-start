import { PrismaClient } from '#prisma/client.js';
import express from 'express'
const prisma = new PrismaClient()
const employeeRouter = express.Router()

employeeRouter.get('/', (req, res) => {
    res.send('Welcome to employee!');
    console.log(req.params.nonprofitname)
});

export default employeeRouter
