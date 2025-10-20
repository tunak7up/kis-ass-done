const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sequelize } = require('./models');
const routesRouter = require('./routes/routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', routesRouter);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Server đang chạy!' });
});

// Sync database và start server
const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: false }).then(() => {
  console.log('Database synced successfully!');
  app.listen(PORT, () => {
    console.log(`Server chạy trên port ${PORT}`);
  });
}).catch(error => {
  console.error('Lỗi khi sync database:', error);
});