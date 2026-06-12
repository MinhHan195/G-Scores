# G-Scores

## Link deploy

Bạn có thể truy cập trang web qua link sau: [https://g-scores-fe-pied.vercel.app/](https://g-scores-fe-pied.vercel.app/)

## HƯỚNG DẪN CÀI ĐẶT

B1: Clone code qua link github: 'https://github.com/MinhHan195/G-Scores.git'.

B2: Chạy lệnh "npm install" trên terminal để cài đặt thư viện.

B3: Tạo database "GScores_development" trên MySQL (hoặc PostgreSQL).

B4: Cập nhật lại URL của Frontend tại file .env

B5: Cập nhập thông tin kết nối database tại config/config.json và app/config/index.js. (Chú ý bật tắt SSL tùy theo db local hay host)

B6: Chạy lệnh "npx sequelize-cli db:migrate" để tạo các bảng. Nếu gặp lỗi thì chạy lệnh
"npx sequelize-cli db:migrate:undo:all" để rollback sau đó thực hiện lại B6.

B7: Chạy lệnh "npx sequelize-cli db:seed:all" để tải dữ liệu từ file .csv lên database.
Nếu gặp lỗi thì chạy lệnh "npx sequelize-cli db:seed:undo:all" để rollback và thực hiện lại B7. (Do có cài đặt indexin cho các cột điểm thuộc các khối nên thời gian upload sẽ bị chậm một xíu)

B7: Khởi chạy Backend bằng câu lệnh "npm start".

### Lưu ý:

Dự án được xây dựng trên Nodejs verion 20.19.1 và NPM version 10.8.2
