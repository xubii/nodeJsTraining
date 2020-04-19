'use strict';
module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define('Permission', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    details: DataTypes.STRING
  }, {});
  Permission.associate = function(models) {
    Permission.hasMany(models.Role, {foreignKey: 'permission_id', sourceKey: 'id'});
  };
  return Permission;
};