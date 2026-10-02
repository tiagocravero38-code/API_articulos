import { DataTypes, Model } from 'sequelize';
import sequelize from '../db.js';

class Articulo extends Model {}

Articulo.init({
  id:     { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(60), allowNull: false },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: { min: { args: [0], msg: 'El precio no puede ser negativo' } }
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: { min: { args: [0], msg: 'El stock no puede ser negativo' } }
  }
}, {
  sequelize,
  modelName: 'Articulo',
  tableName: 'articulos',
  timestamps: false
});

export default Articulo;