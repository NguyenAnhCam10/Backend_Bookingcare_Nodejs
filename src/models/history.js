'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class History extends Model {
    static associate(models) {
      // define association here
    }
  }
  History.init({
    
    patientId: DataTypes.INTEGER,
    doctorId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    file: DataTypes.TEXT
   
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};
