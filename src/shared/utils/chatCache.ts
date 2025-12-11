// localStorage 缓存工具
const CACHE_KEY = 'ai-chat-messages';
const CACHE_TIMESTAMP_KEY = 'ai-chat-timestamp';
const CONVERSATION_ID_KEY = 'ai-chat-conversation-id';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24小时（毫秒）

interface SerializableMessage {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: string; // ISO string
  isTyping?: boolean;
  displayText?: string;
  startTime?: number;
  isFeedback?: boolean;
}

// 保存消息到 localStorage
export const saveChatMessages = (messages: any[]): void => {
  try {
    // 过滤掉正在输入的消息和欢迎消息
    const messagesToSave = messages.filter(
      msg => !msg.isTyping && msg.id !== 'welcome'
    );
    
    // 转换为可序列化格式
    const serializableMessages: SerializableMessage[] = messagesToSave.map(msg => ({
      id: msg.id,
      text: msg.text,
      sender: msg.sender,
      timestamp: msg.timestamp instanceof Date ? msg.timestamp.toISOString() : msg.timestamp,
      displayText: msg.displayText,
      startTime: msg.startTime,
      isFeedback: msg.isFeedback,
    }));

    localStorage.setItem(CACHE_KEY, JSON.stringify(serializableMessages));
    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
  } catch (error) {
    console.error('Error saving chat messages to localStorage:', error);
  }
};

// 从 localStorage 加载消息
export const loadChatMessages = (): any[] | null => {
  try {
    const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
    
    if (!cachedTimestamp) {
      return null;
    }

    // 检查缓存是否过期
    const timestamp = parseInt(cachedTimestamp, 10);
    const now = Date.now();
    
    if (now - timestamp > CACHE_DURATION) {
      // 缓存已过期，清除它
      clearChatCache();
      return null;
    }

    const cachedMessages = localStorage.getItem(CACHE_KEY);
    
    if (!cachedMessages) {
      return null;
    }

    const messages: SerializableMessage[] = JSON.parse(cachedMessages);
    
    // 转换回原始格式
    return messages.map(msg => ({
      ...msg,
      timestamp: new Date(msg.timestamp),
    }));
  } catch (error) {
    console.error('Error loading chat messages from localStorage:', error);
    return null;
  }
};

// 清除聊天缓存
export const clearChatCache = (): void => {
  try {
    localStorage.removeItem(CACHE_KEY);
    localStorage.removeItem(CACHE_TIMESTAMP_KEY);
    localStorage.removeItem(CONVERSATION_ID_KEY);
  } catch (error) {
    console.error('Error clearing chat cache:', error);
  }
};

// 保存会话 ID
export const saveConversationId = (conversationId: string): void => {
  try {
    localStorage.setItem(CONVERSATION_ID_KEY, conversationId);
  } catch (error) {
    console.error('Error saving conversation ID:', error);
  }
};

// 加载会话 ID
export const loadConversationId = (): string | null => {
  try {
    const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
    
    if (!cachedTimestamp) {
      return null;
    }

    // 检查缓存是否过期
    const timestamp = parseInt(cachedTimestamp, 10);
    const now = Date.now();
    
    if (now - timestamp > CACHE_DURATION) {
      return null;
    }

    return localStorage.getItem(CONVERSATION_ID_KEY);
  } catch (error) {
    console.error('Error loading conversation ID:', error);
    return null;
  }
};

// 获取缓存剩余时间（毫秒）
export const getCacheRemainingTime = (): number => {
  try {
    const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
    
    if (!cachedTimestamp) {
      return 0;
    }

    const timestamp = parseInt(cachedTimestamp, 10);
    const now = Date.now();
    const elapsed = now - timestamp;
    const remaining = CACHE_DURATION - elapsed;
    
    return remaining > 0 ? remaining : 0;
  } catch (error) {
    console.error('Error getting cache remaining time:', error);
    return 0;
  }
};
