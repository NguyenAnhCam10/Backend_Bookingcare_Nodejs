'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Allcode extends Model {
    static associate(models) {
      // define association here
    }
  }
  Allcode.init({
    
    key: DataTypes.STRING,
    type: DataTypes.STRING,
    valueEn: DataTypes.STRING,
    valueVi: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'Allcode',
  });
  return Allcode;
};
