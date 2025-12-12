const express = require('express');
const router = express.Router();

// 健康检查端点
router.get('/', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = router;

