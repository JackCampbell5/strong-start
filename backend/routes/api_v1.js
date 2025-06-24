// Routes starting with /api/v1
import { PrismaClient } from '../generated/prisma/client.js';
import express from 'express'
import {getNonProfit} from '../utils/nonprofit_utils.js'

// Import routes
import employeeRouter from './nonprofit-employee.js'
import nonprofitRouter from './nonprofit.js'
import refugeeRouter from './refugee.js'

const prisma = new PrismaClient()
const apiRouter = express.Router()

// Default route for /api/v1
apiRouter.get('/', (req, res) => {
    res.send('Welcome to API V1!');
});

// START nonprofit
// Route for /api/v1/nonprofit
apiRouter.use('/nonprofit/', nonprofitRouter)


// START nonprofit-employee
// Route for /api/v1/nonprofit-employee
apiRouter.get('/nonprofit-employee', (req, res) => {
    // DEBUG This endpoint should never return anything but is currently located here for debugging purposes
    res.send('Non Profit employee endpoint!');
});

// Route for /api/v1/nonprofit-employee/:nonprofitname
apiRouter.use('/nonprofit-employee/:nonprofitname',getNonProfit, employeeRouter)


// START refugee
// Route for /api/v1/refugee
apiRouter.get('/refugee', (req, res) => {
    // DEBUG This endpoint should never return anything but is currently located here for debugging purposes
    res.send('Refugee endpoint!');
});

// Route for /api/v1/refugee/:nonprofitname
apiRouter.use('/refugee/:nonprofitname',getNonProfit, refugeeRouter)




export default apiRouter
