export interface ChatRequest {
  query: string;
  conversation_id?: string;
}

export interface ChatResponse {
  answer: string;
  conversationId: string;
}

const getBackendUrl = (): string => {
  // 生产环境使用环境变量配置的后端地址
  if (import.meta.env.VITE_BACKEND_URL) {
    return import.meta.env.VITE_BACKEND_URL;
  }
  // 开发环境默认使用 localhost
  return 'http://localhost:3001';
};

export const sendMessageToBackend = async (
  message: string,
  conversationId: string | undefined,
  signal?: AbortSignal
): Promise<ChatResponse> => {
  const backendUrl = getBackendUrl();
  const url = `${backendUrl}/api/chat`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: message,
        conversation_id: conversationId,
      } as ChatRequest),
      signal, // 支持取消请求
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `Backend error: ${response.status}`);
    }

    const data: ChatResponse = await response.json();
    
    if (!data.answer) {
      throw new Error('Invalid response from backend: missing answer');
    }

    return data;
  } catch (error) {
    console.error('Error calling backend:', error);
    throw error;
  }
};
