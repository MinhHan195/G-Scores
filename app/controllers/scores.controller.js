const ApiError = require("../api-error");
const scoresService = require("../services/scores.service");

exports.getScoresBySBD = async (req, res, next) => {
    try {
        const sbd = req.query.sbd;
        const scores = await scoresService.getScoresBySBD(sbd);
        return res.send(scores);
    } catch (error) {
        return next(error);
    }
};

exports.getReports = async (req, res, next) => {
    try {
        const scores = await scoresService.getReports();
        return res.send(scores);
    } catch (error) {
        return next(error);
    }
};

exports.getListTopGroup = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit)
        const group = req.query.group
        const result = await scoresService.getListTopGroup(group, limit);
        return res.send(result);
    } catch (error) {
        return next(error);
    }
};