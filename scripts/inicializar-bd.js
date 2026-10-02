import { readFile } from 'node:fs/promises';
import sequelize from '../db.js';
import articulosModel from '../models/articulos.model.js';

const articulos = JSON.parse(await readFile('data/articulos.json', 'utf-8'));

await sequelize.sync({ force: true });
await articulosModel.bulkCreate(articulos);

console.log(`✔ ${await articulosModel.count()} artículos cargados`);
await sequelize.close();