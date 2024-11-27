import express from 'express';
import schoolRouter from './routes/schoolRoutes';
import cors from "cors";
import { globalErrorHandler } from './controllers/errorContoller';

const app = express();
app.use(cors({
    origin: "*"
}))
app.use(express.json());
app.use('/api/schools', schoolRouter);
app.use(globalErrorHandler)
export default app;
