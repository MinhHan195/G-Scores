'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class exam_scores extends Model {
        static associate(models) {
            // define association here
        }
    }
    exam_scores.init({
        subject: {
            type: DataTypes.STRING(20),
            primaryKey: true,
            unique: true
        },
        gte8: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        gte6: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        gte4: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },

        lt4: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        sequelize,
        modelName: 'score_statistics',
        timestamps: false,
    });
    return exam_scores;
};