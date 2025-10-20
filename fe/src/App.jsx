import './App.css'
// import { Select } from '@mui/material';
import SelectBar from './components/SelectBar';
import CustomizedTables from './components/CustomizedTables';
import StickyHeadTable from './components/StickyHeadTable';


function App() {

  return (
    <div>
      <header className="app-header">
        <span style={{fontSize: '1.5rem', fontWeight: 600}}>Tổng quan tuyến bán hàng 2025</span>
        <span style={{fontSize: '1.2rem', fontWeight: 400}}>DVT: Triệu đồng</span>
      </header>
      <div style={{maxHeight: '70vh', overflowY: 'scroll'}}>
          <SelectBar />        
        <div className='twoTable' style={{display: 'flex', flexWrap: 'nowrap', justifyContent: 'center', overflowY: 'scroll-y'}}>
          <CustomizedTables />
          <StickyHeadTable />
        </div>
      </div>
    </div>      
  )
}

export default App
