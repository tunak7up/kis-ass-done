// server.js hoặc app.js
const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');  // hoặc './routes/index.js'

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Đăng ký tất cả routes
app.use(routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên port ${PORT}`);
});