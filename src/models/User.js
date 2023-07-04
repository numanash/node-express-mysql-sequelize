const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
      User.belongsToMany(models.permission, {
        through: 'user_permissions',
        foreignKey: 'userId',
        otherKey: 'permissionId',
        as: 'users',
      });

      //  User.belongsTo(models.agency, { foreignKey: 'agency_id', targetKey: 'id' });
    }
  }

  User.init(
    {
      uuid: DataTypes.UUID,
      username: DataTypes.STRING,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      status: DataTypes.INTEGER,
      email_verified: DataTypes.INTEGER,
      address: DataTypes.STRING,
      phone_number: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'user',
      underscored: true,
    },
  );
  return User;
};
