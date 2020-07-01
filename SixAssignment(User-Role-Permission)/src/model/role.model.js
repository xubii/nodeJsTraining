const dbContext = require('../commons/dbContext');
const Sequelize = require('Sequelize');
const permission = require('./permission.model');


const role = dbContext.define(
  'role',
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
  role_details: {
  type: Sequelize.STRING,
  field: 'role_details'
  },
  permission_id: {
    type: Sequelize.INTEGER,
    field: 'permission_id',
    references: {
      // This is a reference to another model
      model: permission,
      // This is the column name of the referenced model
      key: 'id',
      // This declares when to check the foreign key constraint. PostgreSQL only.
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
        // Will result in an attribute that is firstName when user facing but first_name in the database
    }
  },
  {
  freezeTableName: true // Model tableName will be the same as the model name
  }
  );
  
  module.exports = role;