import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import articulosRouter from './routers/articulos.router.js';
import { registrarError } from './middlewares/registrar-error.js';

const app = express();
const PORT = process.env.PORT ?? 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5500'] }));
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${new Date().toLocaleTimeString('es-AR')}  ${req.method} ${req.url}`);
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(articulosRouter);

app.use((req, res) => {
  res.status(404).json({ mensaje: `No existe la ruta ${req.method} ${req.url}` });
});

app.use((err, req, res, next) => {
  if (err.name === 'SequelizeValidationError')
    return res.status(400).json({ mensaje: err.errors.map((e) => e.message).join(', ') });
  if (err.type === 'entity.parse.failed')
    return res.status(400).json({ mensaje: 'El cuerpo no es un JSON válido' });

  const status = err.status ?? 500;
  if (status === 500) {
    console.error(err);
    registrarError(err, req);
  }
  res.status(status).json({ mensaje: status === 500 ? 'Error interno del servidor' : err.message });
});

app.listen(PORT, () => console.log(`API escuchando en http://localhost:${PORT}`));

process.on('uncaughtException', (error, origen) => {
  console.error('Excepción no capturada:', origen, error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.error('Promesa rechazada sin catch:', error);
});