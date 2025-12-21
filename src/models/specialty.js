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

    image: DataTypes.STRING,
    descriptonHTML: DataTypes.TEXT,


    descriptionMarkdown: DataTypes.TEXT

  }, {
    sequelize,
    modelName: 'Specialty',
    tableName: 'Specialtys',
  });
  return Specialty;
};
