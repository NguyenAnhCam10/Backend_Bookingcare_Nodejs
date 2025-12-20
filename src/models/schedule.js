'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Schedule extends Model {
    static associate(models) {
      Schedule.belongsTo(models.Allcode, { foreignKey: 'timeType', targetKey: 'keyMap', as: 'timeTypeData' })
      Schedule.belongsTo(models.User, { foreignKey: 'doctorId', targetKey: 'id', as: 'doctorData' })

    }
  }
  Schedule.init({

    currentNumber: DataTypes.INTEGER,
    maxNumber: DataTypes.INTEGER,
    date: DataTypes.STRING,

    timeType: DataTypes.STRING,

    doctorId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Schedule',

    tableName: 'Schedule',
    timestamps: true
  });
  return Schedule;
};
