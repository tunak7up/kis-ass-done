import "./App.css";
// import { Select } from '@mui/material';
import SelectBar from "./components/SelectBar";
import CustomizedTables from "./components/CustomizedTables";
import StickyHeadTable from "./components/StickyHeadTable";
import { useState } from "react";

function App() {
  const [selectedRoute, setSelectedRoute] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  return (
    <div>
      <header className="app-header">
        <span style={{ fontSize: "1.5rem", fontWeight: 600 }}>
          Tổng quan tuyến bán hàng 2025
        </span>
        <span style={{ fontSize: "1.2rem", fontWeight: 400 }}>
          DVT: Triệu đồng
        </span>
      </header>
      <div style={{ maxHeight: "70vh", overflowY: "scroll" }}>
        <SelectBar
          selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
        <div
          className="twoTable"
          style={{
            display: "flex",
            flexWrap: "nowrap",
            justifyContent: "center",
            overflowY: "scroll-y",
          }}
        >
          <CustomizedTables
            selectedRoute={selectedRoute}
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
          />
          <StickyHeadTable
            selectedRoute={selectedRoute}
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
