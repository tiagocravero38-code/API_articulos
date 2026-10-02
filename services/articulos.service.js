import { Op } from 'sequelize';
import articulosModel from '../models/articulos.model.js';

function errorHttp(status, mensaje) {
  const error = new Error(mensaje);
  error.status = status;
  return error;
}

function enteroQuery(valor, porDefecto, nombre) {
  if (valor === undefined) return porDefecto;
  const n = Number(valor);
  if (!Number.isInteger(n) || n < 1) throw errorHttp(400, `${nombre} debe ser un entero mayor a 0`);
  return n;
}

function validar(datos = {}) {
  const { nombre, precio, stock } = datos;
  if (typeof nombre !== 'string' || nombre.trim().length < 3 || nombre.trim().length > 60)
    throw errorHttp(400, 'El nombre es obligatorio (entre 3 y 60 caracteres)');
  if (typeof precio !== 'number' || precio < 0)
    throw errorHttp(400, 'El precio debe ser un número mayor o igual a 0');
  if (!Number.isInteger(stock) || stock < 0)
    throw errorHttp(400, 'El stock debe ser un entero mayor o igual a 0');
  return { nombre: nombre.trim(), precio, stock };
}

async function listar({ nombre, pagina, limite } = {}) {
  const p = enteroQuery(pagina, 1, 'pagina');
  const l = enteroQuery(limite, 5, 'limite');
  const { count, rows } = await articulosModel.findAndCountAll({
    where: nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : {},
    order: [['nombre', 'ASC']],
    limit: l,
    offset: (p - 1) * l
  });
  return { total: count, pagina: p, limite: l, items: rows };
}

async function stockBajo(minimo) {
  const m = enteroQuery(minimo, 5, 'minimo');
  return articulosModel.findAll({
    where: { stock: { [Op.lt]: m } },
    order: [['stock', 'ASC']]
  });
}

async function obtenerPorId(id) {
  if (!Number.isInteger(id)) throw errorHttp(400, 'El id debe ser un número entero');
  const articulo = await articulosModel.findByPk(id);
  if (!articulo) throw errorHttp(404, `Artículo ${id} no encontrado`);
  return articulo;
}

async function crear(datos) {
  return articulosModel.create(validar(datos));
}

async function actualizar(id, datos) {
  const articulo = await obtenerPorId(id);
  return articulo.update(validar(datos));
}

async function eliminar(id) {
  const articulo = await obtenerPorId(id);
  await articulo.destroy();
}

// Función para probar el registro de errores
async function romper() {
  return articulosModel.findAll({ attributes: ['ColumnaQueNoExiste'] });
}

export default { listar, stockBajo, obtenerPorId, crear, actualizar, eliminar, romper };