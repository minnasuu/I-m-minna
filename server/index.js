const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: '.env.server' });

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// 健康检查端点
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Dify 代理端点
app.post('/api/chat', async (req, res) => {
  try {
    const { query, conversation_id } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    const difyApiKey = process.env.DIFY_API_KEY;
    const difyApiUrl = process.env.DIFY_API_URL || 'https://api.dify.ai/v1';

    if (!difyApiKey) {
      console.error('DIFY_API_KEY is not configured');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // 调用 Dify API
    const response = await fetch(`${difyApiUrl}/chat-messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${difyApiKey}`,
      },
      body: JSON.stringify({
        inputs: {},
        query: query,
        response_mode: 'blocking',
        conversation_id: conversation_id,
        user: 'web-user',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Dify API error:', response.status, errorText);
      return res.status(response.status).json({ 
        error: 'Dify API error',
        details: errorText 
      });
    }

    const data = await response.json();

    // 返回结果给前端
    res.json({
      answer: data.answer,
      conversationId: data.conversation_id,
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 Dify Proxy Server is running on http://localhost:${PORT}`);
  console.log(`📝 Health check: http://localhost:${PORT}/health`);
});
