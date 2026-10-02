export default function validarId(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ mensaje: 'El id debe ser un número entero' });
  }
  req.idArticulo = id;
  next();
}