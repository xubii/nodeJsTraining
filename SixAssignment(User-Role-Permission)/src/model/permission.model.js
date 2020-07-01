const dbContext = require('../commons/dbContext');
const Sequelize = require('Sequelize');


const permissions = dbContext.define(
  'permission',
  {
  id: {
  type: Sequelize.INTEGER,
  primaryKey: true,
  autoIncrement: true,
  field: 'id' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  name: {
  type: Sequelize.STRING,
  field: 'name' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  details: {
  type: Sequelize.STRING,
  field: 'details'
  }
  },
  {
  freezeTableName: true // Model tableName will be the same as the model name
  }
  );
  
  module.exports = permissions;