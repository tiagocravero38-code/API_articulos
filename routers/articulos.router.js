import { Router } from 'express';
import articulosService from '../services/articulos.service.js';
import validarId from '../middlewares/validar-id.js';

const articulosRouter = Router();

articulosRouter.get('/api/articulos', async (req, res) => {
  const { nombre, pagina, limite } = req.query;
  res.json(await articulosService.listar({ nombre, pagina, limite }));
});

articulosRouter.get('/api/articulos/stock-bajo', async (req, res) => {
  res.json(await articulosService.stockBajo(req.query.minimo));
});

articulosRouter.get('/api/articulos/:id', validarId, async (req, res) => {
  res.json(await articulosService.obtenerPorId(req.idArticulo));
});

articulosRouter.post('/api/articulos', async (req, res) => {
  res.status(201).json(await articulosService.crear(req.body));
});

articulosRouter.put('/api/articulos/:id', validarId, async (req, res) => {
  res.json(await articulosService.actualizar(req.idArticulo, req.body));
});

articulosRouter.delete('/api/articulos/:id', validarId, async (req, res) => {
  await articulosService.eliminar(req.idArticulo);
  res.sendStatus(204);
});

// Ruta de prueba para forzar un error 500
articulosRouter.get('/api/articulos-error', async (req, res) => {
  await articulosService.romper();
});

export default articulosRouter;