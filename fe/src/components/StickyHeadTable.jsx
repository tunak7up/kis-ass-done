import { useState, useEffect, useMemo } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";

const API_BASE = "http://localhost:5000/api";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#6A4923",
    color: theme.palette.common.white,
    fontWeight: "bold",
    fontSize: "1rem",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "1rem",
  },
}));

function getDaysInMonth(year, month) {
  const days = [];
  const date = new Date(year, month - 1, 1);
  while (date.getMonth() === month - 1) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

export default function StickyHeadTable({
  selectedRoute,
  selectedYear,
  selectedMonth,
}) {
  const [data, setData] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const days = useMemo(
    () => getDaysInMonth(selectedYear, selectedMonth),
    [selectedYear, selectedMonth]
  );

  useEffect(() => {
    if (selectedRoute && selectedYear && selectedMonth) {
      fetch(
        `${API_BASE}/table-data?routeId=${selectedRoute}&year=${selectedYear}&month=${selectedMonth}`
      )
        .then((res) => res.json())
        .then(setData)
        .catch((err) => console.error("Fetch table data error:", err));
    }
  }, [selectedRoute, selectedYear, selectedMonth]);

  const displayRows = useMemo(
    () =>
      data.slice(
        pageIndex * rowsPerPage,
        pageIndex * rowsPerPage + rowsPerPage
      ),
    [data, pageIndex, rowsPerPage]
  );

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            {/* Row 1: Ngày trong tháng */}
            <TableRow>
              {days.map((day) => (
                <StyledTableCell
                  key={day.getDate()}
                  align="center"
                  style={{
                    backgroundColor: "#6A4923",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {day.getDate()}
                </StyledTableCell>
              ))}
            </TableRow>

            {/* Row 2: Thứ trong tuần */}
            <TableRow>
              {days.map((day, index) => {
                const weekDay = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
                const dayOfWeek = day.getDay();
                const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

                return (
                  <StyledTableCell
                    key={`weekday-${index}`}
                    align="center"
                    style={
                      isWeekend
                        ? {
                            backgroundColor: "rgba(240, 115, 32, 0.6)",
                            fontWeight: "bold",
                            color: "white",
                          }
                        : {
                            backgroundColor: "#6A4923",
                            color: "white",
                            fontWeight: "bold",
                          }
                    }
                  >
                    {weekDay[dayOfWeek]}
                  </StyledTableCell>
                );
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {displayRows.map((row, idx) => (
              <TableRow key={idx}>
                {row.days.map((d, i) => {
                  const date = new Date(d.dateKey);
                  const isWeekend = date.getDay() === 5 || date.getDay() === 6;

                  return (
                    <StyledTableCell
                      key={i}
                      align="center"
                      style={
                        isWeekend
                          ? { backgroundColor: "rgba(253, 241, 203, 1)" }
                          : {}
                      }
                    >
                      {/* Giá trị đã được tính toán từ backend */}
                      <span>
                        {/* {typeof d.metrics.value === "number"
                          ? d.metrics.value.toLocaleString("vi-VN", {
                              maximumFractionDigits: 2,
                            })
                          : d.metrics.value} */}
                        {typeof d.metrics.value === "number"
                          ? d.metrics.isPercentage
                            ? `${d.metrics.value.toLocaleString("vi-VN", {
                                maximumFractionDigits: 0,
                              })}%`
                            : d.metrics.value.toLocaleString("vi-VN", {
                                maximumFractionDigits: 2,
                              })
                          : d.metrics.value}
                      </span>
                    </StyledTableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        count={data.length}
        page={pageIndex}
        rowsPerPage={rowsPerPage}
        onPageChange={(_, newPage) => setPageIndex(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(+e.target.value);
          setPageIndex(0);
        }}
      />
    </Paper>
  );
}
