import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './datos/articulos.sqlite',
  logging: false
});

export default sequelize;