// import { styled } from '@mui/material/styles';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import data from '../data/data.json';
// import { useMemo } from 'react';


// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: "#6A4923",
//     color: theme.palette.common.white,
//     fontWeight: "bold",
//     fontSize: "1rem",
//     whiteSpace: 'nowrap',
//     overflow: 'hidden',
//     textOverflow: 'ellipsis',
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: "1rem",
//     whiteSpace: 'nowrap',
//     overflow: 'hidden',
//     textOverflow: 'ellipsis',
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));

// export default function CustomizedTables() {
//   const processedRows = useMemo(() => {
//     const rows = data.rows;
//     const processed = [];
    
//     for (let i = 0; i < rows.length; i++) {
//       const row = { ...rows[i] };
//       const isFirstInSection = i === 0 || rows[i].section !== rows[i - 1].section;
      
//       const isFirstInKpi = i === 0 || 
//         rows[i].section !== rows[i - 1].section || 
//         rows[i].kpi !== rows[i - 1].kpi;
      
//       if (isFirstInSection) {
//         let sectionCount = 1;
//         for (let j = i + 1; j < rows.length; j++) {
//           if (rows[j].section === rows[i].section) {
//             sectionCount++;
//           } else {
//             break;
//           }
//         }
//         row.sectionRowSpan = sectionCount;
//         row.showSection = true;
//       } else {
//         row.showSection = false;
//       }
      
//       if (isFirstInKpi) {
//         let kpiCount = 1;
//         for (let j = i + 1; j < rows.length; j++) {
//           if (rows[j].section === rows[i].section && rows[j].kpi === rows[i].kpi) {
//             kpiCount++;
//           } else {
//             break;
//           }
//         }
//         row.kpiRowSpan = kpiCount;
//         row.showKpi = true;
//       } else {
//         row.showKpi = false;
//       }
      
//       processed.push(row);
//     }
    
//     return processed;
//   }, [data.rows]);
  
//   return (
//     <div className='customized-table'>      
//       <TableContainer 
//       // component={Paper}
//       >
//         <Table sx={{ minWidth:'50%' }} aria-label="customized table">
//           <TableHead className='customizedTableHead' style={{ height: '113.4px' }}>
//             <TableRow>
//               <StyledTableCell>Nội dung</StyledTableCell>
//               <StyledTableCell>KPI</StyledTableCell>
//               <StyledTableCell>Hạng mục chi tiết</StyledTableCell>
//               <StyledTableCell align="right">Lũy kế tháng</StyledTableCell>
//             </TableRow>
//           </TableHead>
          
//           <TableBody>
//             {processedRows.map((row) => (
//               <StyledTableRow key={row.id}>
//                 {row.showSection && (
//                   <StyledTableCell 
//                     component="th" 
//                     scope="row"
//                     rowSpan={row.sectionRowSpan}
//                     style={{ 
//                       fontWeight: 'bold',
//                       backgroundColor: '#f0f0f0',
//                       verticalAlign: 'middle'
//                     }}
//                   >
//                     {row.section}
//                   </StyledTableCell>
//                 )}
                
//                 {row.showKpi && (
//                   <StyledTableCell 
//                     rowSpan={row.kpiRowSpan}
//                     style={{ 
//                       fontWeight: '500',
//                       verticalAlign: 'middle',
//                       whiteSpace: 'wrap',
//                     }}
//                   >
//                     {row.kpi}
//                   </StyledTableCell>
//                 )}
                
//                 <StyledTableCell>{row.detail}</StyledTableCell>
//                 <StyledTableCell align="right">{row.luyKe}</StyledTableCell>
//               </StyledTableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
      
//     </div>
//   );
// }

// CustomizedTables.jsx
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState, useEffect, useMemo } from 'react';

const API_BASE = 'http://localhost:5000/api';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#6A4923",
    color: theme.palette.common.white,
    fontWeight: "bold",
    fontSize: "1rem",
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "1rem",
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables({ selectedRoute, selectedYear, selectedMonth }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data từ BE
  useEffect(() => {
    if (selectedRoute && selectedYear && selectedMonth) {
      setLoading(true);
      setError(null);
      
      fetch(`${API_BASE}/kpi-structure?routeId=${selectedRoute}&year=${selectedYear}&month=${selectedMonth}`)
        .then(res => {
          if (!res.ok) throw new Error('Lỗi khi tải dữ liệu');
          return res.json();
        })
        .then(data => {
          setData(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Fetch KPI structure error:", err);
          setError(err.message);
          setLoading(false);
        });
    }
  }, [selectedRoute, selectedYear, selectedMonth]);

  // Process rows để tính rowSpan
  const processedRows = useMemo(() => {
    if (!data.length) return [];
    
    const processed = [];
    
    for (let i = 0; i < data.length; i++) {
      const row = { ...data[i] };
      
      // Kiểm tra xem có phải row đầu tiên của content không
      const isFirstInContent = i === 0 || 
        data[i].content_name !== data[i - 1].content_name;
      
      // Kiểm tra xem có phải row đầu tiên của kpi không
      const isFirstInKpi = i === 0 || 
        data[i].content_name !== data[i - 1].content_name || 
        data[i].kpi_name !== data[i - 1].kpi_name;
      
      // Tính rowSpan cho content
      if (isFirstInContent) {
        let contentCount = 1;
        for (let j = i + 1; j < data.length; j++) {
          if (data[j].content_name === data[i].content_name) {
            contentCount++;
          } else {
            break;
          }
        }
        row.contentRowSpan = contentCount;
        row.showContent = true;
      } else {
        row.showContent = false;
      }
      
      // Tính rowSpan cho kpi
      if (isFirstInKpi) {
        let kpiCount = 1;
        for (let j = i + 1; j < data.length; j++) {
          if (data[j].content_name === data[i].content_name && 
              data[j].kpi_name === data[i].kpi_name) {
            kpiCount++;
          } else {
            break;
          }
        }
        row.kpiRowSpan = kpiCount;
        row.showKpi = true;
      } else {
        row.showKpi = false;
      }
      
      processed.push(row);
    }
    
    return processed;
  }, [data]);

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div style={{ padding: '20px', color: 'red' }}>Lỗi: {error}</div>;
  }

  if (!selectedRoute || !selectedYear || !selectedMonth) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Vui lòng chọn Route, Năm và Tháng</div>;
  }

  if (!processedRows.length) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Không có dữ liệu</div>;
  }

  return (
    <div className='customized-table'>      
      <TableContainer>
        <Table sx={{ minWidth:'50%' }} aria-label="customized table">
          <TableHead className='customizedTableHead' style={{ height: '113.4px' }}>
            <TableRow>
              <StyledTableCell>Nội dung</StyledTableCell>
              <StyledTableCell>KPI</StyledTableCell>
              <StyledTableCell>Hạng mục chi tiết</StyledTableCell>
              <StyledTableCell align="right">Lũy kế tháng</StyledTableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {processedRows.map((row, index) => (
              <StyledTableRow key={row.totalDetail_id || index}>
                {row.showContent && (
                  <StyledTableCell 
                    component="th" 
                    scope="row"
                    rowSpan={row.contentRowSpan}
                    style={{ 
                      fontWeight: 'bold',
                      backgroundColor: '#f0f0f0',
                      verticalAlign: 'middle'
                    }}
                  >
                    {row.content_name}
                  </StyledTableCell>
                )}
                
                {row.showKpi && (
                  <StyledTableCell 
                    rowSpan={row.kpiRowSpan}
                    style={{ 
                      fontWeight: '500',
                      verticalAlign: 'middle',
                      whiteSpace: 'wrap',
                    }}
                  >
                    {row.kpi_name}
                  </StyledTableCell>
                )}
                
                <StyledTableCell>{row.totalDetail_name}</StyledTableCell>
                <StyledTableCell align="right">
                  {typeof row.luyKe === 'number' 
                    ? row.luyKe.toLocaleString('vi-VN', { maximumFractionDigits: 2 })
                    : row.luyKe}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}