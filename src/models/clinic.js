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
    image: DataTypes.STRING,
    descriptionHTML: DataTypes.TEXT,
    descriptionMarkdown: DataTypes.TEXT

  }, {
    sequelize,
    modelName: 'Clinic',
    tableName: 'Clinic',
  });
  return Clinic;
};
