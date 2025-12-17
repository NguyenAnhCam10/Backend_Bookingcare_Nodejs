'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
    class Doctor_Infor extends Model {
        static associate(models) {
            // define association here
        }
    }
    Doctor_Infor.init({


        doctorId: DataTypes.INTEGER,
        priceId: DataTypes.STRING,
        provinceId: DataTypes.STRING,
        paymentId: DataTypes.STRING,
        addressClinic: DataTypes.STRING,
        nameClinic: DataTypes.STRING,
        note: DataTypes.STRING,
        count: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Doctor_Infor',
        freezeTableName: true,
        timestamps: true

    });
    return Doctor_Infor;
};
