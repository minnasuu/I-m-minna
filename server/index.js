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

// 请求日志中间件
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// 健康检查端点
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Dify 代理端点
app.post('/api/chat', async (req, res) => {
  try {
    console.log('收到聊天请求:', { query: req.body.query?.substring(0, 50) });
    const { query, conversation_id } = req.body;

    if (!query) {
      console.error('缺少 query 参数');
      return res.status(400).json({ error: 'Query is required' });
    }

    const difyApiKey = process.env.DIFY_API_KEY;
    const difyApiUrl = process.env.DIFY_API_URL || 'https://api.dify.ai/v1';

    if (!difyApiKey) {
      console.error('❌ DIFY_API_KEY 未配置');
      return res.status(500).json({ error: 'Server configuration error: DIFY_API_KEY not set' });
    }

    console.log('调用 Dify API:', difyApiUrl);

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
      console.error('❌ Dify API 错误:', response.status, errorText);
      return res.status(response.status).json({ 
        error: 'Dify API error',
        details: errorText,
        status: response.status
      });
    }

    const data = await response.json();
    console.log('✅ Dify API 响应成功');

    // 返回结果给前端
    res.json({
      answer: data.answer,
      conversationId: data.conversation_id,
    });

  } catch (error) {
    console.error('❌ 服务器错误:', error.message);
    console.error('错误堆栈:', error.stack);
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
  console.log(`🌐 CORS allowed origin: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
  console.log(`🔑 DIFY_API_KEY configured: ${process.env.DIFY_API_KEY ? '✅ Yes' : '❌ No'}`);
  console.log(`🔗 DIFY_API_URL: ${process.env.DIFY_API_URL || 'https://api.dify.ai/v1'}`);
});
