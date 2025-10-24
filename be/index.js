const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sequelize } = require('./api/sequelize');
const routesRouter = require('./routes/routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routesRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Server đang chạy!' });
});

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: false }).then(() => {
  console.log('Database synced successfully!');
  app.listen(PORT, () => {
    console.log(`Server chạy trên port ${PORT}`);
  });
}).catch(error => {
  console.error('Lỗi khi sync database:', error);
});