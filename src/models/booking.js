'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Booking extends Model {
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, { foreignKey: 'patientId', targetKey: 'id', as: 'patientData' })
      Booking.belongsTo(models.Allcode, { foreignKey: 'timeType', targetKey: 'keyMap', as: 'patientDataPatient' })


    }
  }
  Booking.init({

    statusId: DataTypes.STRING,
    doctorId: DataTypes.STRING,
    patientId: DataTypes.STRING,
    date: DataTypes.STRING,
    timeType: DataTypes.STRING,
    token: DataTypes.STRING,


  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
