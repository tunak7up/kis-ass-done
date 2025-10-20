import { useState, useMemo } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import data from "../data/data.json";
import { styled } from "@mui/material/styles";

const rowsLength = data.rows.length;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#6A4923",
    color: theme.palette.common.white,
    fontWeight: "bold",
    fontSize: "1rem",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "1rem",
    maxHeight: '1vh',
  },
}));

function getDayInMonth(year, month) {
  let date = new Date(year, month, 1);
  let days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}
const daysIn2025Sep = getDayInMonth(2025, 8); 

export default function StickyHeadTable() {
  const [pageIndex, setPageIndex] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsLength);

  const displayRows = useMemo(
    () =>
      data.rows.slice(
        pageIndex * rowsPerPage,
        pageIndex * rowsPerPage + rowsPerPage
      ),
    [ pageIndex, rowsPerPage]
  );

  const handleChangePage = (event, newPage) => {
    setPageIndex(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPageIndex(0);
  };

  return ( 
    <div className="sticky-head-table">
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead style={{ maxHeight: '112px' }}>
            <TableRow>
              {daysIn2025Sep.map((day) => (
                <StyledTableCell style={{backgroundColor:"#6A4923", color: "white", fontWeight: "bold"}} key={day.getDate()} align="center" colSpan={1}>
                  {day.getDate()}
                </StyledTableCell>
              ))}
            </TableRow>
            <TableRow>
              {daysIn2025Sep.map((day) => {
                const weekDay = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
                return (
                  <StyledTableCell key={day.getDay()} align="center"
                  style={day.getDay() === 0 || day.getDay() === 6 ? {backgroundColor: 'rgba(240, 115, 32, 0.6)', fontWeight: "bold"} : {backgroundColor: "#6A4923", color: "white", fontWeight: "bold"}}
                    >
                    {weekDay[day.getDay()]}
                  </StyledTableCell>
                );
              })}
              </TableRow>
          </TableHead>
          <TableBody>
            {displayRows.map((row) => (
              <TableRow>
                {row.days.map((day, index) => { 
                  const date = new Date(day.dateKey);
                  return (
                  <StyledTableCell 
                    key={index} 
                    style={date.getDay() === 0 || date.getDay() === 6 ? {backgroundColor: 'rgba(253, 241, 203, 1)'} : {}}
                  >
                    {day.metrics.value} 
                  </StyledTableCell>
                )})}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.rows.length}
        rowsPerPage={rowsPerPage}
        page={pageIndex}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </div>
    
  );
}
