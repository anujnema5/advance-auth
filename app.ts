import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import cookieParser = require('cookie-parser');

//For env File 
dotenv.config();

export const app: Application = express();
app.use(express.json()); 
app.use(cookieParser())

// IMPORTS
import userRoute from './routes/user.routes'
import dashboardRoute from './routes/dashboard.routes'

app.use('/api/auth', userRoute)
app.use('/api/dashboard', dashboardRoute)

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

