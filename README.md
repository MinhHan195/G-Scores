# G-Scores

HƯỚNG DẪN CÀI ĐẶT

B1: Clone code qua link github: 'https://github.com/MinhHan195/G-Scores.git'.

B2: Chạy lệnh "npm install" trên terminal để cài đặt thư viện.

B3: Tạo database "GScores_development" trên mysql.

B4: Cập nhập thông tin kết nối database tại config/config.json và app/config/index.js.

B5: Chạy lệnh "npx sequelize-cli db:migrate" để tạo các bảng. Nếu gặp lỗi thì chạy lệnh
"npx sequelize-cli db:migrate:undo:all" để rollback sau đó thực hiện lại B5.

B6: Chạy lệnh "npx sequelize-cli db:seed:all" để tải dữ liệu từ file .csv lên database.
Nếu gặp lỗi thì chạy lệnh "npx sequelize-cli db:seed:undo:all" để rollback và thực hiện lại B6.

B7: Khởi chạy Backend bằng câu lệnh "npm start".

Lưu ý: Dự án được xây dựng trên Nodejs verion 20.19.1 và NPM version 10.8.2
