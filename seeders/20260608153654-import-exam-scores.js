'use strict';
const fs = require("fs");
const csv = require("csv-parser");
const dataPath = "data/diem_thi_thpt_2024.csv";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let toan = { gte8: 0, gte6: 0, gte4: 0, lt4: 0 };
    let ngu_van = { gte8: 0, gte6: 0, gte4: 0, lt4: 0 };
    let ngoai_ngu = { gte8: 0, gte6: 0, gte4: 0, lt4: 0 };
    let vat_li = { gte8: 0, gte6: 0, gte4: 0, lt4: 0 };
    let hoa_hoc = { gte8: 0, gte6: 0, gte4: 0, lt4: 0 };
    let sinh_hoc = { gte8: 0, gte6: 0, gte4: 0, lt4: 0 };
    let lich_su = { gte8: 0, gte6: 0, gte4: 0, lt4: 0 };
    let dia_li = { gte8: 0, gte6: 0, gte4: 0, lt4: 0 };
    let gdcd = { gte8: 0, gte6: 0, gte4: 0, lt4: 0 };



    let records = [];
    let score_statistics = [];
    let isProcessing = false;
    let tempRecords = [];
    let counter = 0;
    await new Promise((resolve, reject) => {
      const stream = fs.createReadStream(dataPath)

      stream.pipe(csv())
        .on("data", (row) => {
          // skip rows without sbd
          if (!row.sbd || String(row.sbd).trim() === "") {
            console.log(row);
            return;
          };

          // Dòng if này dùng để đảm bảo mảng records không bị tràn khi đọc file quá nhanh mà upload không kịp
          if (records.length >= 6000) {
            stream.pause();
          } else {
            stream.resume();
          }

          // Tính thống kê điểm số cho từng môn học
          if (row.toan || String(row.toan).trim() !== "") {
            const f = parseFloat(row.toan);
            if (f >= 8) toan.gte8++;
            else if (f >= 6 && f < 8) toan.gte6++;
            else if (f >= 4 && f < 6) toan.gte4++;
            else toan.lt4++;
          }

          if (row.ngu_van || String(row.ngu_van).trim() !== "") {
            const f = parseFloat(row.ngu_van);
            if (f >= 8) ngu_van.gte8++;
            else if (f >= 6 && f < 8) ngu_van.gte6++;
            else if (f >= 4 && f < 6) ngu_van.gte4++;
            else ngu_van.lt4++;
          }

          if (String(row.ngoai_ngu).trim() !== "") {
            const f = parseFloat(row.ngoai_ngu);
            if (f >= 8) ngoai_ngu.gte8++;
            else if (f >= 6 && f < 8) ngoai_ngu.gte6++;
            else if (f >= 4 && f < 6) ngoai_ngu.gte4++;
            else ngoai_ngu.lt4++;
          }

          if (row.vat_li || String(row.vat_li).trim() !== "") {
            const f = parseFloat(row.vat_li);
            if (f >= 8) vat_li.gte8++;
            else if (f >= 6 && f < 8) vat_li.gte6++;
            else if (f >= 4 && f < 6) vat_li.gte4++;
            else vat_li.lt4++;
          }

          if (row.hoa_hoc || String(row.hoa_hoc).trim() !== "") {
            const f = parseFloat(row.hoa_hoc);
            if (f >= 8) hoa_hoc.gte8++;
            else if (f >= 6 && f < 8) hoa_hoc.gte6++;
            else if (f >= 4 && f < 6) hoa_hoc.gte4++;
            else hoa_hoc.lt4++;
          }

          if (row.sinh_hoc || String(row.sinh_hoc).trim() !== "") {
            const f = parseFloat(row.sinh_hoc);
            if (f >= 8) sinh_hoc.gte8++;
            else if (f >= 6 && f < 8) sinh_hoc.gte6++;
            else if (f >= 4 && f < 6) sinh_hoc.gte4++;
            else sinh_hoc.lt4++;
          }

          if (row.lich_su || String(row.lich_su).trim() !== "") {
            const f = parseFloat(row.lich_su);
            if (f >= 8) lich_su.gte8++;
            else if (f >= 6 && f < 8) lich_su.gte6++;
            else if (f >= 4 && f < 6) lich_su.gte4++;
            else lich_su.lt4++;
          }

          if (row.dia_li || String(row.dia_li).trim() !== "") {
            const f = parseFloat(row.dia_li);
            if (f >= 8) dia_li.gte8++;
            else if (f >= 6 && f < 8) dia_li.gte6++;
            else if (f >= 4 && f < 6) dia_li.gte4++;
            else dia_li.lt4++;
          }

          if (row.gdcd || String(row.gdcd).trim() !== "") {
            const f = parseFloat(row.gdcd);
            if (f >= 8) gdcd.gte8++;
            else if (f >= 6 && f < 8) gdcd.gte6++;
            else if (f >= 4 && f < 6) gdcd.gte4++;
            else gdcd.lt4++;
          }
          records.push({
            sbd: row.sbd,

            toan: parseFloat(row.toan) >= 0 && parseFloat(row.toan) <= 10 ? parseFloat(row.toan) : null,
            ngu_van: parseFloat(row.ngu_van) >= 0 && parseFloat(row.ngu_van) <= 10 ? parseFloat(row.ngu_van) : null,
            ngoai_ngu: parseFloat(row.ngoai_ngu) >= 0 && parseFloat(row.ngoai_ngu) <= 10 ? parseFloat(row.ngoai_ngu) : null,

            vat_li: parseFloat(row.vat_li) >= 0 && parseFloat(row.vat_li) <= 10 ? parseFloat(row.vat_li) : null,
            hoa_hoc: parseFloat(row.hoa_hoc) >= 0 && parseFloat(row.hoa_hoc) <= 10 ? parseFloat(row.hoa_hoc) : null,
            sinh_hoc: parseFloat(row.sinh_hoc) >= 0 && parseFloat(row.sinh_hoc) <= 10 ? parseFloat(row.sinh_hoc) : null,

            lich_su: parseFloat(row.lich_su) >= 0 && parseFloat(row.lich_su) <= 10 ? parseFloat(row.lich_su) : null,
            dia_li: parseFloat(row.dia_li) >= 0 && parseFloat(row.dia_li) <= 10 ? parseFloat(row.dia_li) : null,
            gdcd: parseFloat(row.gdcd) >= 0 && parseFloat(row.gdcd) <= 10 ? parseFloat(row.gdcd) : null,

            ma_ngoai_ngu: row.ngoai_ngu ? row.ma_ngoai_ngu : null,
            group_a: row.toan && row.vat_li && row.hoa_hoc ? parseFloat(row.toan) + parseFloat(row.vat_li) + parseFloat(row.hoa_hoc) : null,
            group_a1: row.toan && row.vat_li && row.ngoai_ngu ? parseFloat(row.toan) + parseFloat(row.vat_li) + parseFloat(row.ngoai_ngu) : null,
            group_b: row.toan && row.sinh_hoc && row.hoa_hoc ? parseFloat(row.toan) + parseFloat(row.sinh_hoc) + parseFloat(row.hoa_hoc) : null,
            group_c: row.ngu_van && row.lich_su && row.dia_li ? parseFloat(row.ngu_van) + parseFloat(row.lich_su) + parseFloat(row.dia_li) : null,
            group_d: row.toan && row.ngoai_ngu && row.ngu_van ? parseFloat(row.toan) + parseFloat(row.ngoai_ngu) + parseFloat(row.ngu_van) : null,
            created_at: new Date(),
            updated_at: new Date()
          });

          if (records.length >= 5000 && !isProcessing) {
            stream.pause();
            isProcessing = true;
            tempRecords = records.length > 5000 ? records.slice(0, 5000) : records;

            queryInterface.bulkInsert("exam_scores", tempRecords)
              .then(() => {
                records = records.slice(5000);
                console.log("NUMBER OF UPLOADS: ", ++counter);
                console.log("Remaining records after slice: ", records.length, " records");
                isProcessing = false;
                stream.resume();


              })
              .catch((err) => {
                console.error("Error inserting batch: ", err);
                reject(err);
              });
          }
        })
        .on("end", async () => {
          // Chờ tất cả batch đang xử lý xong
          while (isProcessing) {
            await new Promise(r => setTimeout(r, 100));
          }

          if (records.length > 0) {
            try {
              console.log("Uploading final batch: ", records.length, " records");
              await queryInterface.bulkInsert("exam_scores", records);
              records.length = 0;
              console.log("Final batch inserted successfully");
            } catch (err) {
              console.error("Error inserting final batch: ", err);
              reject(err);
              return;
            }
          }
          resolve();
        })
        .on("error", (err) => {
          console.error("Error reading CSV file: ", err);
          reject(err);
        });
    });

    score_statistics[0] = { subject: 'toan', ...toan, };
    score_statistics[2] = { subject: 'ngoai_ngu', ...ngoai_ngu };
    score_statistics[1] = { subject: 'ngu_van', ...ngu_van };
    score_statistics[3] = { subject: 'vat_li', ...vat_li };
    score_statistics[4] = { subject: 'hoa_hoc', ...hoa_hoc };
    score_statistics[5] = { subject: 'sinh_hoc', ...sinh_hoc };
    score_statistics[6] = { subject: 'lich_su', ...lich_su };
    score_statistics[7] = { subject: 'dia_li', ...dia_li };
    score_statistics[8] = { subject: 'gdcd', ...gdcd };

    queryInterface.bulkInsert("score_statistics", score_statistics)
      .then(() => {
        console.log("Up loaded score statistics successfully");
      })
      .catch((err) => {
        console.error("Error inserting batch: ", err);
        reject(err);
      });

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(
      "exam_scores",
      null,
      {}
    );
  }
};
