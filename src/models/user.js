'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.belongsTo(models.Allcode, { foreignKey: 'positionId', targetKey: 'keyMap', as: 'positionData' })
      User.belongsTo(models.Allcode, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData' })
      User.belongsTo(models.Allcode, {
        foreignKey: 'roleId',
        targetKey: 'keyMap',
        as: 'roleData'
      });
      User.hasOne(models.Markdown, { foreignKey: 'doctorId' })
      User.hasOne(models.Doctor_Infor, { foreignKey: 'doctorId' })
      // User.hasMany(models.Schedule, { foreignKey: 'doctorId', as: 'doctorData' })
      User.hasMany(models.Schedule, {
        foreignKey: 'doctorId',
        as: 'schedules'
      });
    }
  }
  User.init({

    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    gender: DataTypes.STRING,
    image: DataTypes.TEXT,
    roleId: DataTypes.STRING,
    positionId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
