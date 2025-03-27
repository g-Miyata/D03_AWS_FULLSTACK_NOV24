import express from 'express';
import { PrismaClient } from '@prisma/client';
import createPlant from './routes/createPlant';
import getPlants from './routes/getPlants';
import deletePlant from './routes/deletePlant';
import typeRoute from './routes/typeRoute';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = 3000;
const prisma = new PrismaClient();
app.use(express.json());
app.use(cors({ origin: 'https://green-sphere-ivory.vercel.app' }));
// app.get('/', (req, res) => {
//     res.json({ message: 'teste com typescript' })
// })

app.use('/plants', getPlants);
app.use('/register', createPlant);
app.use('/plants', deletePlant);
app.use('/types', typeRoute);

app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});
