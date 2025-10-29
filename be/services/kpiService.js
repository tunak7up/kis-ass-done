// services/kpiService.js
// const Content = require('../api/sequelize/models/table/content');
// const Kpi = require('../api/sequelize/models/table/kpi');
// const TotalDetail = require('../api/sequelize/models/table/totalDetail');
// const Detail = require('../api/sequelize/models/table/detail');
const {Content, Kpi, TotalDetail, Detail} = require ('../api/sequelize/index')
const { Op } = require('sequelize');

class KpiService {
  // Lấy danh sách KPI với cấu trúc phân cấp
  static async getKpiStructure(routeId, year, month) {
    // Lấy tất cả totalDetails với relations
    const totalDetails = await TotalDetail.findAll({
      include: [
        {
          model: Kpi,
          as: 'Kpi',
          required: true,
          include: [
            {
              model: Content,
              as: 'Content',
              required: true,
              attributes: ['content_id', 'content_name']
            }
          ],
          attributes: ['kpi_id', 'kpi_name']
        }
      ],
      attributes: ['totalDetail_id', 'totalDetail_name', 'total_formula', 'day_formula'],
      order: [
        [{ model: Kpi }, { model: Content }, 'content_id', 'ASC'],
        [{ model: Kpi }, 'kpi_id', 'ASC'],
        ['totalDetail_id', 'ASC']
      ]
    });

    // Tính toán lũy kế tháng cho từng totalDetail
    const results = await Promise.all(
      totalDetails.map(async (td) => {
        const luyKe = await this.calculateLuyKe(
          td.totalDetail_id,
          td.total_formula,
          routeId,
          year,
          month,
          totalDetails
        );

        return {
          totalDetail_id: td.totalDetail_id,
          content_name: td.Kpi.Content.content_name,
          kpi_name: td.Kpi.kpi_name,
          totalDetail_name: td.totalDetail_name,
          luyKe: luyKe,
          content_id: td.Kpi.Content.content_id,
          kpi_id: td.Kpi.kpi_id
        };
      })
    );

    return results;
  }

  // Tính toán lũy kế tháng theo công thức
  static async calculateLuyKe(totalDetailId, formula, routeId, year, month, allTotalDetails) {
    if (!formula) {
      return 0;
    }

    try {
      // Trường hợp 1: Tổng các ngày trong tháng
      if (formula.toLowerCase().includes('sum') || formula.toLowerCase().includes('tong')) {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59);

        const details = await Detail.findAll({
          where: {
            totalDetail_id: totalDetailId,
            route_id: routeId,
            detail_date: {
              [Op.between]: [startDate, endDate]
            }
          },
          attributes: ['detail_value']
        });

        return details.reduce((sum, d) => sum + (d.detail_value || 0), 0);
      }

      // Trường hợp 2: Công thức tham chiếu đến hàng khác
      // Ví dụ: "ROW[-1] / ROW[-2]" hoặc "TD[5] / TD[3]"
      const rowRefMatch = formula.match(/ROW\[(-?\d+)\]/g);
      const tdRefMatch = formula.match(/TD\[(\d+)\]/g);

      if (rowRefMatch || tdRefMatch) {
        // Parse công thức và tính toán
        let calculatedFormula = formula;
        
        // Xử lý tham chiếu ROW (hàng tương đối)
        if (rowRefMatch) {
          for (const ref of rowRefMatch) {
            const offset = parseInt(ref.match(/-?\d+/)[0]);
            const currentIndex = allTotalDetails.findIndex(td => td.totalDetail_id === totalDetailId);
            const targetIndex = currentIndex + offset;
            
            if (targetIndex >= 0 && targetIndex < allTotalDetails.length) {
              const targetTd = allTotalDetails[targetIndex];
              const targetValue = await this.calculateLuyKe(
                targetTd.totalDetail_id,
                targetTd.total_formula,
                routeId,
                year,
                month,
                allTotalDetails
              );
              calculatedFormula = calculatedFormula.replace(ref, targetValue);
            }
          }
        }

        // Xử lý tham chiếu TD (totalDetail_id cụ thể)
        if (tdRefMatch) {
          for (const ref of tdRefMatch) {
            const targetId = parseInt(ref.match(/\d+/)[0]);
            const targetTd = allTotalDetails.find(td => td.totalDetail_id === targetId);
            
            if (targetTd) {
              const targetValue = await this.calculateLuyKe(
                targetTd.totalDetail_id,
                targetTd.total_formula,
                routeId,
                year,
                month,
                allTotalDetails
              );
              calculatedFormula = calculatedFormula.replace(ref, targetValue);
            }
          }
        }

        // Thực thi công thức (cẩn thận với eval!)
        try {
          return eval(calculatedFormula);
        } catch (error) {
          console.error('Error evaluating formula:', error);
          return 0;
        }
      }

      return 0;
    } catch (error) {
      console.error('Error calculating luy ke:', error);
      return 0;
    }
  }
}

module.exports = KpiService;