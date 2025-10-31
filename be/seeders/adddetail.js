const { Detail } = require("../api/sequelize/index");
const dbInstance = require("../api/sequelize/get-db-instance").getDbInstance();
const { Op, fn, col, where } = require("sequelize");

(async () => {
  try {
    //sửa route muốn add data 
    const route_id = 19;
    const totalDetailIds = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    //sửa year và month muốn thêm add data ở đây 
    const year = 2025;
    const month = 9;
    const daysInMonth = new Date(year, month, 0).getDate();

    const details = [];

    for (const totalDetail_id of totalDetailIds) {
      for (let day = 1; day <= daysInMonth; day++) {
        // ✅ Dùng chuỗi ISO để tránh lệch múi giờ
        const detail_date = `${year}-${String(month).padStart(2, "0")}-${String(
          day
        ).padStart(2, "0")}`;
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
    // Xóa tất cả dữ liệu cũ
    // await Detail.destroy({ where: {}, truncate: true, restartIdentity: true });


    // Xóa các bản ghi có cùng route_id, năm và tháng
    await Detail.destroy({
      where: {
        route_id,
        [Op.and]: [
          where(fn("YEAR", col("detail_date")), year),
          where(fn("MONTH", col("detail_date")), month),
        ],
      },
    });

    // chèn mới
    await Detail.bulkCreate(details);

    console.log(
      `✅ Đã insert ${details.length} data cho tháng ${month} năm ${year} route ${route_id} vào bảng detail.`
    );
  } catch (err) {
    console.error("❌ Lỗi khi insert:", err);
  } finally {
    await dbInstance.close();
  }
})();
