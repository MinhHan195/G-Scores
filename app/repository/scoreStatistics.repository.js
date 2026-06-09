const db = require("../../models");
const ApiError = require("../api-error");

class scoresStatisticsRepository {
    constructor() {
        // model file is defined as `exam_scores` in models/exam_scores.js
        this.scores = db.score_statistics;
    }

    async getReports() {
        try {
            return await this.scores.findAll();
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Internal Server Errorrr");
        }
    }


}
module.exports = scoresStatisticsRepository;