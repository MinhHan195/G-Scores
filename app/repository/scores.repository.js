const { NOT } = require("sequelize/lib/deferrable");
const db = require("../../models");
const ApiError = require("../api-error");
const { Op } = require("sequelize");

class scoresRepository {
    constructor() {
        // model file is defined as `exam_scores` in models/exam_scores.js
        this.scores = db.exam_scores;
    }

    async getScoresBySBD(sbd) {
        try {
            return await this.scores.findOne({
                attributes: ["toan", "ngu_van", "ngoai_ngu", "vat_li", "hoa_hoc", "sinh_hoc", "lich_su", "dia_li", "gdcd"],
                where: { sbd: sbd }
            });
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Internal Server Error");
        }
    }

    async getListScores(attributes, query) {
        try {
            return await this.scores.findAll({
                attributes: attributes,
                where: query
            });
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Internal Server Error");
        }
    }

    async getListTopGroup(attributes, group, limit) {
        try {
            const result = await this.scores.findAll({
                attributes: attributes,
                where: { [group]: { [Op.ne]: null } },
                order: [[group, "DESC"]],
                limit: limit,
            });
            return result;
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Internal Server Error");
        }
    }
}

module.exports = scoresRepository;