'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    address: DataTypes.STRING,
    bio: DataTypes.STRING
  }, {});
  Users.associate = function(models) {
    Users.belongsTo(models.Role, {foreignKey: 'role_id', targetKey: 'id'});
  };
  return Users;
};