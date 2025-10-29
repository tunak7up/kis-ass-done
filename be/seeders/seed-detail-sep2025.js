const { Detail } = require("../api/sequelize/index");
const dbInstance = require("../api/sequelize/get-db-instance").getDbInstance();


(async () => {
  try {
    const route_id = 1;
    const totalDetailIds = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const year = 2025;
    const month = 9; // tháng 9 (dễ đọc)
    const daysInMonth = 30;

    const details = [];

    for (const totalDetail_id of totalDetailIds) {
      for (let day = 1; day <= daysInMonth; day++) {
        // ✅ Dùng chuỗi ISO để tránh lệch múi giờ
        const detail_date = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        const detail_value = parseFloat((Math.random() * 100).toFixed(2));

        details.push({
          route_id,
          totalDetail_id,
          detail_date,
          detail_value,
        });
      }
    }

    // đảm bảo bảng đã sync
    await dbInstance.sync();

    // xóa dữ liệu cũ (nếu có)
    await Detail.destroy({ where: {}, truncate: true, restartIdentity: true });

    // chèn mới
    await Detail.bulkCreate(details);

    console.log(`✅ Đã insert ${details.length} dòng (1–30/9/2025) vào bảng detail.`);
  } catch (err) {
    console.error("❌ Lỗi khi insert:", err);
  } finally {
    await dbInstance.close();
  }
})();

