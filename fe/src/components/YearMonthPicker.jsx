// YearMonthPicker.jsx - CẬP NHẬT
import { useEffect } from 'react';

function YearMonthPicker({ 
  selectedYear, 
  setSelectedYear, 
  selectedMonth, 
  setSelectedMonth 
}) {
  // Khởi tạo giá trị mặc định nếu chưa có
  useEffect(() => {
    if (!selectedYear) {
      setSelectedYear(new Date().getFullYear());
    }
    if (!selectedMonth) {
      setSelectedMonth(new Date().getMonth() + 1);
    }
  }, []);

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  const years = [];
  const currentYear = new Date().getFullYear();
  for (let i = currentYear - 10; i <= currentYear; i++) {
    years.push(i);
  }

  const months = [
    { value: 1, label: 'Tháng 1' },
    { value: 2, label: 'Tháng 2' },
    { value: 3, label: 'Tháng 3' },
    { value: 4, label: 'Tháng 4' },
    { value: 5, label: 'Tháng 5' },
    { value: 6, label: 'Tháng 6' },
    { value: 7, label: 'Tháng 7' },
    { value: 8, label: 'Tháng 8' },
    { value: 9, label: 'Tháng 9' },
    { value: 10, label: 'Tháng 10' },
    { value: 11, label: 'Tháng 11' },
    { value: 12, label: 'Tháng 12' },
  ];

  return (
    <div className="year-month-picker">
      <select value={selectedYear} onChange={handleYearChange}>
        {years.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>

      <select value={selectedMonth} onChange={handleMonthChange}>
        {months.map(month => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default YearMonthPicker;