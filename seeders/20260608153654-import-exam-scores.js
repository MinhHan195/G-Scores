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

    let records = [];
    let isProcessing = false;
    let tempRecords = [];
    let counter = 0;
    await new Promise((resolve, reject) => {
      const stream = fs.createReadStream(dataPath)

      stream.pipe(csv())
        .on("data", (row) => {
          if (!row.sbd && row.sbd) return;

          // Dòng if này dùng để đảm bảo records không bị tràn khi đọc file quá nhanh mà upload không kịp
          if (records.length >= 6000) {
            stream.pause();
          } else {
            stream.resume();
          }

          records.push({
            sbd: row.sbd,

            toan: parseFloat(row.toan) > 0 && parseFloat(row.toan) <= 10 ? parseFloat(row.toan) : null,
            ngu_van: parseFloat(row.ngu_van) > 0 && parseFloat(row.ngu_van) <= 10 ? parseFloat(row.ngu_van) : null,
            ngoai_ngu: parseFloat(row.ngoai_ngu) > 0 && parseFloat(row.ngoai_ngu) <= 10 ? parseFloat(row.ngoai_ngu) : null,

            vat_li: parseFloat(row.vat_li) > 0 && parseFloat(row.vat_li) <= 10 ? parseFloat(row.vat_li) : null,
            hoa_hoc: parseFloat(row.hoa_hoc) > 0 && parseFloat(row.hoa_hoc) <= 10 ? parseFloat(row.hoa_hoc) : null,
            sinh_hoc: parseFloat(row.sinh_hoc) > 0 && parseFloat(row.sinh_hoc) <= 10 ? parseFloat(row.sinh_hoc) : null,

            lich_su: parseFloat(row.lich_su) > 0 && parseFloat(row.lich_su) <= 10 ? parseFloat(row.lich_su) : null,
            dia_li: parseFloat(row.dia_li) > 0 && parseFloat(row.dia_li) <= 10 ? parseFloat(row.dia_li) : null,
            gdcd: parseFloat(row.gdcd) > 0 && parseFloat(row.gdcd) <= 10 ? parseFloat(row.gdcd) : null,

            ma_ngoai_ngu: row.ngoai_ngu ? row.ma_ngoai_ngu : null,

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
        .on("end", () => {
          // Chờ xử lý cuối cùng nếu còn
          while (isProcessing) {
            new Promise(r => setTimeout(r, 100));
          }
          if (records.length > 0) {
            stream.pause();
            // console.log(`Inserting final batch: ${records.length} records`);
            queryInterface.bulkInsert("exam_scores", records)
              .then(() => {
                records = [];
                stream.resume();
              })
              .catch((err) => {
                console.error("Error inserting batch: ", err);
                reject(err);
              });
          }
          resolve();
        })
        .on("error", (err) => {
          console.error("Error reading CSV file: ", err);
          reject(err);
        });
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
