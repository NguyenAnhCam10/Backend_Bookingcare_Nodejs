'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
    class Markdown extends Model {
        static associate(models) {
            // define association here
            Markdown.belongsTo(models.User, { foreignKey: 'doctorId' })

        }
    }
    Markdown.init({
        contentHTML: DataTypes.TEXT('long')
        ,
        contentMarkdown: DataTypes.TEXT('long'),
        description: DataTypes.TEXT('long'),
        doctorId: DataTypes.INTEGER,
        specialtyId: DataTypes.INTEGER,
        clinicId: DataTypes.INTEGER,

    }, {
        sequelize,
        modelName: 'Markdown',
    });
    return Markdown;
};
