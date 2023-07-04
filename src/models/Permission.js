const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    static associate(models) {
      Permission.belongsToMany(models.user, {
        through: 'user_permissions',
        foreignKey: 'permissionId',
        otherKey: 'userId',
        as: 'users',
      });
    }
  }

  Permission.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'permission',
    },
  );

  return Permission;
};
