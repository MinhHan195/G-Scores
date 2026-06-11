const express = require("express");
const scoresController = require("../controllers/scores.controller");

const router = express.Router();

router.route("/check").get(scoresController.getScoresBySBD);

router.route("/getReports").get(scoresController.getReports);

router.route("/getListTopGroup").get(scoresController.getListTopGroup);

module.exports = router;
