const scoresRepository = require("../repository/scores.repository");
const scoresStatisticsRepository = require("../repository/scoreStatistics.repository");

exports.getScoresBySBD = async (sbd) => {
    try {
        const ScoresRepository = new scoresRepository();
        const result = await ScoresRepository.getScoresBySBD(sbd);

        const subjectMap = {
            toan: "Toán",
            ngu_van: "Ngữ văn",
            ngoai_ngu: "Ngoại ngữ",
            vat_li: "Vật lí",
            hoa_hoc: "Hóa học",
            sinh_hoc: "Sinh học",
            lich_su: "Lịch sử",
            dia_li: "Địa lí",
            gdcd: "GDCD"
        };

        const scores = {};

        Object.entries(result.dataValues).forEach(([key, value]) => {
            if (
                value !== null &&
                Object.hasOwn(subjectMap, key)
            ) {
                scores[subjectMap[key]] = value;
            }
        });

        return scores;

    } catch (error) {
        throw error;
    }

}

exports.getReports = async () => {
    try {
        const ScoresStatisticsRepository = new scoresStatisticsRepository();
        const result = await ScoresStatisticsRepository.getReports();
        return result;
    } catch (error) {
        throw error
    }

}

exports.getListTopGroupByParam = async (group, limit) => {
    let attribute = []
    let subjects = []
    if (group == 'group_a') {
        attribute = ["sbd", "toan", "vat_li", "hoa_hoc", "group_a"]
        subjects = ['Toán', 'Vật lí', 'Hóa học']
    } else if (group == 'group_a1') {
        attribute = ["sbd", "toan", "vat_li", "ngoai_ngu", "group_a1"]
        subjects = ['Toán', 'Vật lí', 'Ngoại ngữ']
    } else if (group == 'group_b') {
        attribute = ["sbd", "toan", "sinh_hoc", "hoa_hoc", "group_b"]
        subjects = ['Toán', 'Sinh học', 'Hóa học']
    } else if (group == 'group_c') {
        attribute = ["sbd", "ngu_van", "lich_su", "dia_li", "group_c"]
        subjects = ['Ngữ Văn', 'Lịch sử', 'Địa lý']
    } else if (group == 'group_d') {
        attribute = ["sbd", "toan", "ngu_van", "ngoai_ngu", "group_d"]
        subjects = ['Toán', 'Ngữ Văn', 'Ngoại ngữ']
    }
    try {
        const ScoresRepository = new scoresRepository();
        const result = await ScoresRepository.getListTopGroup(attribute, group, limit);
        const minScores = Object.values(result).at(-1)[group];
        const buffer = await ScoresRepository.getListScores(attribute, { [group]: minScores })
        const registrationNumber = result.map(item => item.sbd);
        Object.keys(buffer).forEach((key) => {
            if (!registrationNumber.includes(buffer[key].dataValues.sbd)) {
                result.push(buffer[key])
            }
        })
        let data = []
        const scores = []
        Object.keys(result).forEach((key) => {
            let tmp = [
                result[key][attribute[0]],
                result[key][attribute[1]],
                result[key][attribute[2]],
                result[key][attribute[3]],
                result[key][attribute[4]]
            ]

            data.push({ subjects: subjects, data: tmp })

        })

        // console.log(data)
        return data;
    } catch (err) {
        throw err
    }

}

exports.getListTopGroup = async (limit) => {
    try {
        let data = {};
        const groupA = await this.getListTopGroupByParam('group_a', limit)
        data['group_a'] = groupA;
        const groupA1 = await this.getListTopGroupByParam('group_a1', limit)
        data['group_a1'] = groupA1;
        const groupB = await this.getListTopGroupByParam('group_b', limit)
        data['group_b'] = groupB;
        const groupC = await this.getListTopGroupByParam('group_c', limit)
        data['group_c'] = groupC;
        const groupD = await this.getListTopGroupByParam('group_d', limit)
        data['group_d'] = groupD;
        return data
    } catch (error) {
        throw error
    }
}