import { useState, useEffect, useMemo } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";

const API_BASE = 'http://localhost:5000/api';

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

export default function StickyHeadTable({ selectedRoute, selectedYear, selectedMonth }) {
  const [data, setData] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const days = useMemo(() => getDaysInMonth(selectedYear, selectedMonth), [selectedYear, selectedMonth]);

  useEffect(() => {
    if (selectedRoute && selectedYear && selectedMonth) {
      fetch(`${API_BASE}/table-data?routeId=${selectedRoute}&year=${selectedYear}&month=${selectedMonth}`)
        .then(res => res.json())
        .then(setData)
        .catch(err => console.error("Fetch table data error:", err));
    }
  }, [selectedRoute, selectedYear, selectedMonth]);

  const displayRows = useMemo(
    () => data.slice(pageIndex * rowsPerPage, pageIndex * rowsPerPage + rowsPerPage),
    [data, pageIndex, rowsPerPage]
  );

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {days.map(day => (
                <StyledTableCell key={day.getDate()} align="center">
                  {day.getDate()}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayRows.map((row, idx) => (
              <TableRow key={idx}>
                {row.days.map((d, i) => (
                  <StyledTableCell key={i} align="center">
                    {d.metrics.value}
                  </StyledTableCell>
                ))}
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
        onRowsPerPageChange={(e) => { setRowsPerPage(+e.target.value); setPageIndex(0); }}
      />
    </Paper>
  );
}


// import { useState, useMemo } from "react";
// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
// import TableRow from "@mui/material/TableRow";
// import data from "../data/data.json";
// import { styled } from "@mui/material/styles";

// const rowsLength = data.rows.length;

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: "#6A4923",
//     color: theme.palette.common.white,
//     fontWeight: "bold",
//     fontSize: "1rem",
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: "1rem",
//     maxHeight: '1vh',
//   },
// }));

// function getDayInMonth(year, month) {
//   let date = new Date(year, month, 1);
//   let days = [];
//   while (date.getMonth() === month) {
//     days.push(new Date(date));
//     date.setDate(date.getDate() + 1);
//   }
//   return days;
// }
// const daysIn2025Sep = getDayInMonth(2025, 8); 

// export default function StickyHeadTable() {
//   const [pageIndex, setPageIndex] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(rowsLength);

//   const displayRows = useMemo(
//     () =>
//       data.rows.slice(
//         pageIndex * rowsPerPage,
//         pageIndex * rowsPerPage + rowsPerPage
//       ),
//     [ pageIndex, rowsPerPage]
//   );

//   const handleChangePage = (event, newPage) => {
//     setPageIndex(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPageIndex(0);
//   };

//   return ( 
//     <div className="sticky-head-table">
//       <Paper sx={{ width: "100%", overflow: "hidden" }}>
//       <TableContainer>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead style={{ maxHeight: '112px' }}>
//             <TableRow>
//               {daysIn2025Sep.map((day) => (
//                 <StyledTableCell style={{backgroundColor:"#6A4923", color: "white", fontWeight: "bold"}} key={day.getDate()} align="center" colSpan={1}>
//                   {day.getDate()}
//                 </StyledTableCell>
//               ))}
//             </TableRow>
//             <TableRow>
//               {daysIn2025Sep.map((day) => {
//                 const weekDay = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
//                 return (
//                   <StyledTableCell key={day.getDay()} align="center"
//                   style={day.getDay() === 0 || day.getDay() === 6 ? {backgroundColor: 'rgba(240, 115, 32, 0.6)', fontWeight: "bold"} : {backgroundColor: "#6A4923", color: "white", fontWeight: "bold"}}
//                     >
//                     {weekDay[day.getDay()]}
//                   </StyledTableCell>
//                 );
//               })}
//               </TableRow>
//           </TableHead>
//           <TableBody>
//             {displayRows.map((row) => (
//               <TableRow>
//                 {row.days.map((day, index) => { 
//                   const date = new Date(day.dateKey);
//                   return (
//                   <StyledTableCell 
//                     key={index} 
//                     style={date.getDay() === 0 || date.getDay() === 6 ? {backgroundColor: 'rgba(253, 241, 203, 1)'} : {}}
//                   >
//                     {day.metrics.value} 
//                   </StyledTableCell>
//                 )})}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component="div"
//         count={data.rows.length}
//         rowsPerPage={rowsPerPage}
//         page={pageIndex}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Paper>
//     </div>
    
//   );
// }

