const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// 미들웨어
app.use(bodyParser.json());
app.use(cors());

// API 라우트
app.get('/api', (req, res) => {
  res.send({ message: 'API is running!' });
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use(cors());