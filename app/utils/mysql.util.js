const { Sequelize } = require('sequelize');
require('dotenv').config({ override: true });
const db = require("../../models")


class MYSQL {
    static connect = async () => {
        if (this.sequelize) return this.sequelize;
        this.sequelize = db.sequelize;
        return this.sequelize;
    };
}

module.exports = MYSQL;