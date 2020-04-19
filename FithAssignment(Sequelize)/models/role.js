'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    role_details: DataTypes.STRING
  }, {});
  Role.associate = function(models) {
    Role.hasMany(models.Users, {foreignKey: 'role_id', sourceKey: 'id'});
    Role.belongsTo(models.Permission, {foreignKey: 'permission_id', targetKey: 'id'});
  };
  return Role;
};