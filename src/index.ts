import express, { json } from 'express';
import cors from 'cors';
import './setup.js';

const app = express();

app.use(cors());
app.use(json());

export default app;
