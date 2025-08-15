'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Booking extends Model {
    static associate(models) {
      // define association here
    }
  }
  Booking.init({
    
    statusId: DataTypes.STRING,
    doctorId: DataTypes.STRING,
    patientId: DataTypes.STRING,
    date: DataTypes.DATE,
    timeType: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
