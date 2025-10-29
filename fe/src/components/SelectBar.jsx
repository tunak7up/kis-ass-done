import { useState, useEffect } from "react";
import NativeSelectDemo from "./NativeSelectDemo";
import YearMonthPicker from "./YearMonthPicker";

const API_BASE = "http://localhost:5000/api";

function SelectBar({
  selectedRoute,
  setSelectedRoute,
  selectedYear,
  setSelectedYear,
  selectedMonth,
  setSelectedMonth,
}) {
  const [regions, setRegions] = useState([]);
  const [areas, setAreas] = useState([]);
  const [npps, setNpps] = useState([]);
  const [routes, setRoutes] = useState([]);

  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedNpp, setSelectedNpp] = useState("");

  // Lấy danh sách Region khi component mount
  useEffect(() => {
    fetchRegions();
  }, []);

  // Lấy danh sách Area khi Region thay đổi
  useEffect(() => {
    if (selectedRegion) {
      fetchAreas(selectedRegion);
      setSelectedArea("");
      setSelectedNpp("");
      setAreas([]);
      setNpps([]);
      setRoutes([]);
    }
  }, [selectedRegion]);

  // Lấy danh sách NPP khi Area thay đổi
  useEffect(() => {
    if (selectedArea) {
      fetchNpps(selectedArea);
      setSelectedNpp("");
      setSelectedRoute("");
      setNpps([]);
      setRoutes([]);
    }
  }, [selectedArea]);

  // Lấy danh sách Route khi NPP thay đổi
  useEffect(() => {
    if (selectedNpp) {
      fetchRoutes(selectedNpp);
    }
  }, [selectedNpp]);

  const fetchRegions = async () => {
    try {
      const response = await fetch(`${API_BASE}/regions`);
      const data = await response.json();
      setRegions(data);
      if (data.length > 0) {
        setSelectedRegion(data[0].region_id);
      }
    } catch (error) {
      console.error("Lỗi khi lấy regions:", error);
    }
  };

  const fetchAreas = async (regionId) => {
    try {
      const response = await fetch(`${API_BASE}/areas/${regionId}`);
      const data = await response.json();
      setAreas(data);
      if (data.length > 0) {
        setSelectedArea(data[0].area_id);
      }
    } catch (error) {
      console.error("Lỗi khi lấy areas:", error);
    }
  };

  const fetchNpps = async (areaId) => {
    try {
      const response = await fetch(`${API_BASE}/npps/${areaId}`);
      const data = await response.json();
      setNpps(data);
      if (data.length > 0) {
        setSelectedNpp(data[0].npp_id);
      }
    } catch (error) {
      console.error("Lỗi khi lấy npps:", error);
    }
  };

  const fetchRoutes = async (nppId) => {
    try {
      const response = await fetch(`${API_BASE}/routes/${nppId}`);
      const data = await response.json();
      setRoutes(data);
      if (data.length > 0) {
        setSelectedRoute(data[0].route_id);
      }
    } catch (error) {
      console.error("Lỗi khi lấy routes:", error);
    }
  };
  const regionOptions = regions.map((r) => ({
    value: r.region_id,
    label: r.region_name,
  }));

  const areaOptions = areas.map((a) => ({
    value: a.area_id,
    label: a.area_name,
  }));

  const nppOptions = npps.map((n) => ({
    value: n.npp_id,
    label: n.npp_name,
  }));

  const routeOptions = routes.map((r) => ({
    value: r.route_id,
    label: r.route_name,
  }));

  return (
    <div className="select-bar">
      <NativeSelectDemo
        label="Vùng"
        name="region"
        value={selectedRegion}
        onChange={setSelectedRegion}
        options={regionOptions}
      />

      <NativeSelectDemo
        label="Khu vực"
        name="area"
        value={selectedArea}
        onChange={setSelectedArea}
        options={areaOptions}
        disabled={!selectedRegion}
      />

      <NativeSelectDemo
        label="NPP"
        name="npp"
        value={selectedNpp}
        onChange={setSelectedNpp}
        options={nppOptions}
        disabled={!selectedArea}
      />

      <NativeSelectDemo
        label="Route"
        name="route"
        value={selectedRoute}
        onChange={setSelectedRoute}
        options={routeOptions}
        disabled={!selectedNpp}
      />

      <YearMonthPicker
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
    </div>
  );
}

export default SelectBar;
