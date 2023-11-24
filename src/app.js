import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import handlebars from 'express-handlebars';
import { petsService } from "./services/index.js";
import __dirname from './utils/index.js'


const app = express();
const PORT = process.env.PORT || 8080;

const connection = mongoose.connect(process.env.MONGO_URL)

app.use(express.json());
app.use(cookieParser());

// Configuración handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')

app.get('/pets', async (req, res) => {
  let pets = await petsService.getAll();
  pets = pets.map(pet => pet.toObject())
  return res.render('pets', { pets })
})

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
