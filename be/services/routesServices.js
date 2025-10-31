// services/routesServices.js
const Region = require("../api/sequelize/models/location/region");
const Area = require("../api/sequelize/models/location/area");
const Npp = require("../api/sequelize/models/location/npp");
const Route = require("../api/sequelize/models/location/route");
const Detail = require("../api/sequelize/models/table/detail");
const TotalDetail = require("../api/sequelize/models/table/totalDetail");
const { Op } = require("sequelize");

class RoutesService {
  static async getRegions() {
    return await Region.findAll({
      attributes: ["region_id", "region_name"],
      order: [["region_name", "ASC"]],
    });
  }

  static async getAreas(regionId) {
    return await Area.findAll({
      where: { region_id: regionId },
      attributes: ["area_id", "area_name"],
      order: [["area_name", "ASC"]],
    });
  }

  static async getNpps(areaId) {
    return await Npp.findAll({
      where: { area_id: areaId },
      attributes: ["npp_id", "npp_name"],
      order: [["npp_name", "ASC"]],
    });
  }

  static async getRoutes(nppId) {
    return await Route.findAll({
      where: { npp_id: nppId },
      attributes: ["route_id", "route_name"],
      order: [["route_name", "ASC"]],
    });
  }

  static async getTableData(routeId, year, month) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);
    const daysInMonth = new Date(year, month, 0).getDate();

    // Lấy tất cả totalDetails với day_formula
    const totalDetails = await TotalDetail.findAll({
      attributes: ["totalDetail_id", "totalDetail_name", "day_formula"],
      order: [["totalDetail_id", "ASC"]],
    });

    // Lấy tất cả details trong tháng cho route này
    const details = await Detail.findAll({
      where: {
        route_id: routeId,
        detail_date: {
          [Op.between]: [startDate, endDate],
        },
      },
      attributes: [
        "detail_id",
        "detail_date",
        "detail_value",
        "totalDetail_id",
      ],
      order: [
        ["totalDetail_id", "ASC"],
        ["detail_date", "ASC"],
      ],
    });

    // Group details theo totalDetail_id
    const detailsByTotalDetail = {};
    details.forEach((detail) => {
      if (!detailsByTotalDetail[detail.totalDetail_id]) {
        detailsByTotalDetail[detail.totalDetail_id] = [];
      }
      detailsByTotalDetail[detail.totalDetail_id].push(detail);
    });

    // Tạo cấu trúc dữ liệu cho bảng
    const rows = [];

    for (let i = 0; i < totalDetails.length; i++) {
      const td = totalDetails[i];
      const days = [];
      const isPercentage = td.day_formula && td.day_formula.includes("* 100");
      // Tạo mảng days cho mỗi totalDetail
      for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(year, month - 1, day);
        const dateKey = currentDate.toISOString().split("T")[0];

        // Lấy detail cho ngày này
        const detailsForTd = detailsByTotalDetail[td.totalDetail_id] || [];
        const detailForDay = detailsForTd.find((d) => {
          const dDate = new Date(d.detail_date);
          return dDate.getDate() === day;
        });

        // Tính giá trị theo day_formula
        const calculatedValue = await this.calculateDayValue(
          td.totalDetail_id,
          td.day_formula,
          day,
          detailForDay,
          rows, // Các rows đã tính trước đó
          totalDetails,
          year,
          month,
          routeId
        );

        days.push({
          dateKey: dateKey,
          metrics: { value: calculatedValue, isPercentage: isPercentage },
        });
      }

      rows.push({
        totalDetail_id: td.totalDetail_id,
        totalDetail_name: td.totalDetail_name,
        isPercentage: isPercentage,
        days: days,
      });
    }

    return rows;
  }

  static async calculateDayValue(
    totalDetailId,
    formula,
    day,
    detailForDay,
    previousRows,
    allTotalDetails,
    year,
    month,
    routeId
  ) {
    if (!formula) {
      return detailForDay ? parseFloat(detailForDay.detail_value) || 0 : 0;
    }

    try {
      // Trường hợp 1: VALUE - lấy giá trị trực tiếp
      if (formula.toUpperCase() === "VALUE") {
        return detailForDay ? parseFloat(detailForDay.detail_value) || 0 : 0;
      }

      // Trường hợp 2: SUM - không áp dụng cho từng ngày
      if (formula.toUpperCase() === "SUM") {
        return detailForDay ? parseFloat(detailForDay.detail_value) || 0 : 0;
      }

      // Trường hợp 3: Công thức tính toán với TD[] hoặc ROW[]
      if (formula.includes("TD[") || formula.includes("ROW[")) {
        let calculatedFormula = formula;

        // Xử lý TD[id] - tham chiếu đến totalDetail_id cụ thể
        const tdMatches = formula.match(/TD\[(\d+)\]/g);
        if (tdMatches) {
          for (const match of tdMatches) {
            const targetId = parseInt(match.match(/\d+/)[0]);

            // Tìm row tương ứng trong previousRows
            const targetRow = previousRows.find(
              (r) => r.totalDetail_id === targetId
            );

            if (targetRow && targetRow.days && targetRow.days[day - 1]) {
              const targetValue = targetRow.days[day - 1].metrics.value;
              calculatedFormula = calculatedFormula.replace(
                match,
                targetValue || 0
              );
            } else {
              calculatedFormula = calculatedFormula.replace(match, 0);
            }
          }
        }

        // Xử lý ROW[offset] - tham chiếu hàng tương đối
        const rowMatches = formula.match(/ROW\[(-?\d+)\]/g);
        if (rowMatches) {
          for (const match of rowMatches) {
            const offset = parseInt(match.match(/-?\d+/)[0]);
            const currentIndex = previousRows.length; // Index của row hiện tại
            const targetIndex = currentIndex + offset;

            if (targetIndex >= 0 && targetIndex < previousRows.length) {
              const targetRow = previousRows[targetIndex];

              if (targetRow && targetRow.days && targetRow.days[day - 1]) {
                const targetValue = targetRow.days[day - 1].metrics.value;
                calculatedFormula = calculatedFormula.replace(
                  match,
                  targetValue || 0
                );
              } else {
                calculatedFormula = calculatedFormula.replace(match, 0);
              }
            } else {
              calculatedFormula = calculatedFormula.replace(match, 0);
            }
          }
        }

        // Tính toán công thức
        try {
          calculatedFormula = calculatedFormula.replace(/\s+/g, "");

          // Kiểm tra chia cho 0
          if (
            calculatedFormula.includes("/0") ||
            calculatedFormula.match(/\/0[^\d]/)
          ) {
            return 0;
          }

          const result = eval(calculatedFormula);

          if (!isFinite(result) || isNaN(result)) {
            return 0;
          }

          let formattedValue;
          if (formula.includes("%") || formula.includes("*100")) {
            formattedValue = `${parseFloat(result.toFixed(2))}%`;
          } else {
            formattedValue = parseFloat(result.toFixed(2));
          }
          return formattedValue;
        } catch (error) {
          console.error("Error evaluating day formula:", {
            formula,
            calculated: calculatedFormula,
            error: error.message,
          });
          return 0;
        }
      }

      // Mặc định trả về detail_value
      return detailForDay ? parseFloat(detailForDay.detail_value) || 0 : 0;
    } catch (error) {
      console.error("Error in calculateDayValue:", error);
      return 0;
    }
  }

  static formatTableData(details, daysInMonth) {
    // Tạo map để group theo totalDetail_id
    const grouped = {};

    details.forEach((detail) => {
      const key = detail.totalDetail_id;

      if (!grouped[key]) {
        // Khởi tạo mảng days với giá trị mặc định
        grouped[key] = {
          totalDetail_id: key,
          days: Array(daysInMonth)
            .fill(null)
            .map(() => ({
              dateKey: null,
              metrics: { value: 0 },
            })),
        };
      }

      // Lấy ngày trong tháng (1-31)
      const dayIndex = new Date(detail.detail_date).getDate() - 1;

      // Gán giá trị vào đúng ngày
      grouped[key].days[dayIndex] = {
        dateKey: detail.detail_date,
        metrics: { value: detail.detail_value },
      };
    });

    // Convert object thành array
    return Object.values(grouped);
  }
}

module.exports = RoutesService;
