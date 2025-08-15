'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Specialty extends Model {
    static associate(models) {
      // define association here
    }
  }
  Specialty.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'Specialty',
  });
  return Specialty;
};
