// Routes starting with /api/v1
import { PrismaClient } from '../generated/prisma/client.js';
import express from 'express'
import {getNonProfit} from '../utils/nonprofit_utils.js'

// Import routes
import nonprofitEmployeeRoutes from './nonprofit-employee.js'
import nonprofitRoutes from './nonprofit.js'

const prisma = new PrismaClient()
const apiRouter = express.Router()

// Default route for /api/v1
apiRouter.get('/', (req, res) => {
    res.send('Welcome to API V1!');
});

// START nonprofit
// Route for /api/v1/nonprofit
apiRouter.use('/nonprofit/', nonprofitRoutes)


// START nonprofit-employee
// Route for /api/v1/nonprofit-employee
apiRouter.get('/nonprofit-employee', (req, res) => {
    // DEBUG This endpoint should never return anything but is currently located here for debugging purposes
    res.send('Non Profit employee endpoint!');
});

// Route for /api/v1/nonprofit-employee/:nonprofitname
apiRouter.use('/nonprofit-employee/:nonprofitname',getNonProfit, nonprofitEmployeeRoutes)


export default apiRouter
