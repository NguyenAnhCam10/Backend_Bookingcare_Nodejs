'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Clinic extends Model {
    static associate(models) {
      // define association here
    }
  }
  Clinic.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'Clinic',
  });
  return Clinic;
};
