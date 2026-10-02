import { appendFile } from 'node:fs/promises';
import path from 'node:path';

const ARCHIVO = path.join(process.cwd(), 'logs', 'error.log');

export function registrarError(err, req) {
  const linea = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}\n${err.stack}\n\n`;
  appendFile(ARCHIVO, linea).catch(() => console.error('No se pudo escribir en logs/error.log'));
}