const scoresRepository = require("../repository/scores.repository");
const scoresStatisticsRepository = require("../repository/scoreStatistics.repository");

exports.getScoresBySBD = async (sbd) => {
    const ScoresRepository = new scoresRepository();
    return await ScoresRepository.getScoresBySBD(sbd);
}

exports.getReports = async () => {
    const ScoresStatisticsRepository = new scoresStatisticsRepository();
    return await ScoresStatisticsRepository.getReports();
}

exports.getListTopGroupA = async (limit) => {
    const ScoresRepository = new scoresRepository();
    const result = await ScoresRepository.getListTopGroupA(limit);
    const minScores = Object.values(result).at(-1).group_a
    const buffer = await ScoresRepository.getListScores(["sbd", "toan", "vat_li", "hoa_hoc", "group_a"], { group_a: minScores })
    console.log(buffer)
    return [...result, ...buffer];
}