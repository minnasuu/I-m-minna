const express = require('express');
const router = express.Router();

// Dify 代理端点
router.post('/', async (req, res) => {
  try {
    const { query, conversation_id } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    const difyApiKey = process.env.DIFY_API_KEY;
    const difyApiUrl = process.env.DIFY_API_URL || 'https://api.dify.ai/v1';

    if (!difyApiKey) {
      return res.status(500).json({ error: 'Server configuration error: DIFY_API_KEY not set' });
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
      return res.status(response.status).json({ 
        error: 'Dify API error',
        details: errorText,
        status: response.status
      });
    }

    const data = await response.json();

    // 返回结果给前端
    res.json({
      answer: data.answer,
      conversationId: data.conversation_id,
    });

  } catch (error) {
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

module.exports = router;

