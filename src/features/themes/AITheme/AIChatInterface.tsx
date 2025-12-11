import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { personalDataMultiLang } from '../../../data/personalData';
import avatarImg from '../../../assets/images/avatar.png';
import { sendMessageToBackend } from '../../../shared/utils/backendClient';
import ChatMarkdown from './ChatMarkdown';
import {
  saveChatMessages,
  loadChatMessages,
  clearChatCache,
  saveConversationId,
  loadConversationId,
} from '../../../shared/utils/chatCache';

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  terminalOutput?: React.ReactNode;
  isTyping?: boolean;
  displayText?: string;
  startTime?: number;
  isFeedback?: boolean;  // 标记为反馈消息
}

const Timer: React.FC<{ startTime: number }> = ({ startTime }) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    // Initial calculation
    setElapsed((Date.now() - startTime) / 1000);
    
    const interval = setInterval(() => {
      setElapsed((Date.now() - startTime) / 1000);
    }, 100);
    return () => clearInterval(interval);
  }, [startTime]);

  return <span className="generation-timer" style={{ fontSize: '0.8em', color: '#9ca3af', marginLeft: '8px' }}>({elapsed.toFixed(1)}s)</span>;
};

// 逐字输出组件，与终端主题保持一致的速度
const TypewriterText: React.FC<{
  text: string;
  speed?: number;
  onComplete?: () => void;
  onStop?: (displayedText: string) => void;
  isVisible: boolean;
  shouldStop?: boolean;
}> = ({ text, speed = 30, onComplete, onStop, isVisible, shouldStop }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setDisplayText("");
      setCurrentIndex(0);
      return;
    }

    // 检查是否需要停止
    if (shouldStop && currentIndex > 0) {
      if (onStop) {
        onStop(displayText);
      }
      return;
    }

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete, onStop, isVisible, shouldStop, displayText]);

  useEffect(() => {
    if (isVisible && currentIndex === 0) {
      setDisplayText("");
      setCurrentIndex(0);
    }
  }, [isVisible, text]);

  return (
    <span style={{ whiteSpace: "pre-line" }}>
      {displayText}
      {isVisible && currentIndex < text.length && !shouldStop && (
        <span className="typewriter-cursor">|</span>
      )}
    </span>
  );
};

const AIChatInterface: React.FC = () => {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | undefined>(undefined);
  const [generationStartTime, setGenerationStartTime] = useState<number | null>(null);
  const [shouldStopTyping, setShouldStopTyping] = useState(false);
  const [isCacheLoaded, setIsCacheLoaded] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentData = personalDataMultiLang[language];

  // 保存消息到 localStorage
  useEffect(() => {
    if (isCacheLoaded && messages.length > 0) {
      saveChatMessages(messages);
    }
  }, [messages, isCacheLoaded]);

  // 保存会话 ID
  useEffect(() => {
    if (conversationId) {
      saveConversationId(conversationId);
    }
  }, [conversationId]);

  useEffect(() => {
    // 消息从头部插入，最新的消息显示在顶部
    // 自动滚动到顶部以显示最新消息
    const chatMessages = document.querySelector('.chat-messages');
    if (chatMessages) {
      chatMessages.scrollTop = 0;
    }
  }, [messages]);

  // 初始化：从缓存加载或显示欢迎消息
  useEffect(() => {
    const welcomeText =
      language === "zh"
        ? `你好！我是 **${currentData.info.name}** 的数字分身，想了解小苏，问我就好啦。`
        : `Hello! I'm **${currentData.info.name}**'s digital twin, want to know about Minna, ask me.`;

    const welcomeMessage: Message = {
      id: "welcome",
      text: welcomeText,
      sender: "ai",
      timestamp: new Date(),
      isTyping: false,
      displayText: welcomeText,
    };

    // 尝试从缓存加载
    const cachedMessages = loadChatMessages();
    const cachedConversationId = loadConversationId();

    if (cachedMessages && cachedMessages.length > 0) {
      // 加载缓存的消息，并在前面添加欢迎消息
      setMessages([welcomeMessage, ...cachedMessages]);
      if (cachedConversationId) {
        setConversationId(cachedConversationId);
      }
    } else {
      // 没有缓存，显示欢迎消息
      setMessages([welcomeMessage]);
    }

    setIsCacheLoaded(true);
  }, [language]);

  const generateTerminalOutput = (command: string): React.ReactNode => {
    const lowerCommand = command.toLowerCase();

    if (lowerCommand === "help" || lowerCommand === "帮助") {
      return (
        <div className="terminal-output">
          <div className="command">$ {command}</div>
          <div className="output">
            <div>Available commands:</div>
            <div>• about - About Minna</div>
            <div>• skills - Technical skills</div>
            <div>• projects - Projects & crafts</div>
            <div>• contact - Contact information</div>
            <div>• clear - Clear chat</div>
            <div>• help - Show this help</div>
          </div>
        </div>
      );
    }

    if (lowerCommand === "about" || lowerCommand === "关于") {
      return (
        <div className="terminal-output">
          <div className="command">$ {command}</div>
          <div className="output">
            <div>Name: {currentData.info.name}</div>
            <div>Title: {currentData.info.title}</div>
            <div>Bio: {currentData.info.bio}</div>
            <div>Location: {currentData.info.location}</div>
            <div>Email: {currentData.info.email}</div>
          </div>
        </div>
      );
    }

    if (lowerCommand === "skills" || lowerCommand === "技能") {
      return (
        <div className="terminal-output">
          <div className="command">$ {command}</div>
          <div className="output">
            {currentData.skills.map((skill: any, index: number) => (
              <div key={index}>
                {skill.name}: {"█".repeat(Math.floor(skill.level / 10))}
                {"░".repeat(10 - Math.floor(skill.level / 10))} {skill.level}%
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (lowerCommand === "projects" || lowerCommand === "项目") {
      return (
        <div className="terminal-output">
          <div className="command">$ {command}</div>
          <div className="output">
            <div>Featured Projects:</div>
            {currentData.projects
              .filter((p: any) => p.featured)
              .map((project: any, index: number) => (
                <div key={index}>
                  • {project.name} - {project.description}
                </div>
              ))}
            <div>Featured Crafts:</div>
            {currentData.crafts
              .filter((c: any) => c.featured)
              .map((craft: any, index: number) => (
                <div key={index}>
                  • {craft.name} - {craft.description}
                </div>
              ))}
          </div>
        </div>
      );
    }

    if (lowerCommand === "contact" || lowerCommand === "联系") {
      return (
        <div className="terminal-output">
          <div className="command">$ {command}</div>
          <div className="output">
            <div>Email: {currentData.info.email}</div>
            <div>Location: {currentData.info.location}</div>
            {currentData.info.wechat && (
              <div>WeChat: {currentData.info.wechat}</div>
            )}
            <div>Social Links:</div>
            {currentData.info.socialLinks.map((link: any, index: number) => (
              <div key={index}>
                • {link.name}: {link.url}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (lowerCommand === "clear" || lowerCommand === "清除") {
      // 清除消息和缓存
      clearChatCache();
      setConversationId(undefined);
      
      // 重新设置欢迎消息
      const welcomeText =
        language === "zh"
          ? `你好！我是 **${currentData.info.name}** 的数字分身，想了解小苏，问我就好啦。\n\n你可以：\n- 直接和我对话\n- 输入命令（如 \`help\`、\`about\`、\`skills\`）`
          : `Hello! I'm **${currentData.info.name}**'s digital twin, want to know about Minna, ask me.\n\nYou can:\n- Chat with me directly\n- Type commands (like \`help\`, \`about\`, \`skills\`)`;

      const welcomeMessage: Message = {
        id: "welcome",
        text: welcomeText,
        sender: "ai",
        timestamp: new Date(),
        isTyping: false,
        displayText: welcomeText,
      };
      
      setMessages([welcomeMessage]);
      return null;
    }

    // 默认AI响应
    return null;
  };


  // 停止生成
  const handleStopGeneration = () => {
    // 中止后端请求
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    // 停止打字机效果
    setShouldStopTyping(true);
    
    // 清除打字超时
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }

    // 将当前正在输入的消息标记为完成
    if (typingMessageId) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === typingMessageId
            ? { ...msg, isTyping: false }
            : msg
        )
      );
      setTypingMessageId(null);
    }

    // 添加暂停反馈消息
    const feedbackMessages = language === "zh"
      ? [
          "你犹豫啦～",
          "好嘛，那我就先停下来休息一下 ☕️",
          "收到！已暂停回答",
          "你撤回了一条消息",
          "明白，我先停一停 🤚"
        ]
      : [
          "You hesitated~",
          "Okay, I'll take a break ☕️",
          "Got it! Stopped",
          "You withdrew a message",
          "I understand, stopping 🤚"
        ];
    
    const randomFeedback = feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)];
    
    const feedbackMessage: Message = {
      id: `feedback-${Date.now()}`,
      text: randomFeedback,
      sender: "ai",
      timestamp: new Date(),
      isTyping: false,
      displayText: randomFeedback,
      isFeedback: true,
    };

    setTimeout(() => {
      setMessages((prev) => [feedbackMessage, ...prev]);
    }, 100);

    setIsTyping(false);
    setGenerationStartTime(null);
    setShouldStopTyping(false);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    // 新消息从数组头部插入，最新的消息显示在顶部
    setMessages((prev) => [userMessage, ...prev]);
    setInputText("");
    
    // Start timing
    const startTime = Date.now();
    setGenerationStartTime(startTime);
    setIsTyping(true);
    setShouldStopTyping(false);

    // 检查是否是命令
    const terminalOutput = generateTerminalOutput(inputText);

    if (terminalOutput) {
       const aiMessageId = (Date.now() + 1).toString();
       const aiResponse: Message = {
           id: aiMessageId,
           text: "",
           sender: "ai",
           timestamp: new Date(),
           terminalOutput,
           isTyping: false,
       };
       setTimeout(() => {
            setMessages((prev) => [aiResponse, ...prev]);
            setIsTyping(false);
            setGenerationStartTime(null);
       }, 300);
       return;
    }

    // 创建 AbortController 用于取消请求
    abortControllerRef.current = new AbortController();

    // 调用后端代理 API（安全）
    let aiResponseText = "";

    try {
        const response = await sendMessageToBackend(inputText, conversationId, abortControllerRef.current.signal);
        
        // 检查是否被取消
        if (abortControllerRef.current?.signal.aborted) {
          setIsTyping(false);
          setGenerationStartTime(null);
          return;
        }

        aiResponseText = response.answer;
        if (response.conversationId) {
            setConversationId(response.conversationId);
        }
    } catch (error: any) {
        // 如果是取消请求的错误，静默处理
        if (error.name === 'AbortError') {
          setIsTyping(false);
          setGenerationStartTime(null);
          return;
        }

        console.error("Backend API Error:", error);
        
        const errorMessage = error.message || "";
        if (errorMessage.includes("Workflow not published")) {
            aiResponseText = language === "zh"
                ? "API 调用失败：检测到 Dify 应用/工作流未发布。请前往 Dify 控制台点击右上角的【发布】按钮，然后重试。"
                : "API Error: Dify Workflow/App not published. Please go to the Dify dashboard and click the 'Publish' button, then try again.";
        } else if (errorMessage.includes("Failed to fetch") || errorMessage.includes("NetworkError")) {
            aiResponseText = language === "zh"
                ? "无法连接到后端服务。请确保后端服务器正在运行（在 server 目录运行 npm start）。"
                : "Cannot connect to backend service. Please ensure the backend server is running (run npm start in the server directory).";
        } else if (errorMessage.includes("401")) {
             aiResponseText = language === "zh"
                ? "API 认证失败：请检查后端的 Dify API Key 配置。"
                : "API Auth Failed: Please check the Dify API Key configuration in the backend.";
        } else {
            aiResponseText = language === "zh"
                ? "抱歉，我的大脑暂时断开了连接。请稍后再试，或检查 API 配置。"
                : "Sorry, my brain is temporarily disconnected. Please try again later or check API configuration.";
        }
    }

    // 检查是否被取消
    if (shouldStopTyping || abortControllerRef.current?.signal.aborted) {
      setIsTyping(false);
      setGenerationStartTime(null);
      return;
    }

    const aiMessageId = (Date.now() + 1).toString();
    const aiResponse: Message = {
      id: aiMessageId,
      text: aiResponseText,
      sender: "ai",
      timestamp: new Date(),
      terminalOutput: undefined,
      isTyping: true,
      startTime: startTime,
    };
    // 新消息从数组头部插入，最新的消息显示在顶部
    setMessages((prev) => [aiResponse, ...prev]);
    setTypingMessageId(aiMessageId);

    if (aiResponseText) {
      // TypewriterText 组件会处理打字效果，不需要 setTimeout
      // 打字完成会通过 onComplete 回调处理
    } else {
      // 如果是终端输出，直接完成
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMessageId ? { ...msg, isTyping: false } : msg
        )
      );
      setTypingMessageId(null);
      setIsTyping(false);
      setGenerationStartTime(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputText]);

  return (
    <div className="ai-chat-interface">
      <div className="chat-messages">
        <>
          {isTyping && (
            <div className="message ai">
              <div className="message-avatar">🤖</div>
              <div className="message-content">
                <span className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
                {generationStartTime && <Timer startTime={generationStartTime} />}
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              {message.sender === "ai" ? (
                <div className="message-avatar">
                  <img src={avatarImg} alt="avatar" />
                </div>
              ) : null}
              <div className="message-content">
                {message.text &&
                  (message.isTyping ? (
                    <>
                      <TypewriterText
                        text={message.text}
                        speed={30}
                        isVisible={typingMessageId === message.id}
                        shouldStop={shouldStopTyping}
                        onComplete={() => {
                          setMessages((prev) =>
                            prev.map((msg) =>
                              msg.id === message.id
                                ? {
                                    ...msg,
                                    isTyping: false,
                                    displayText: message.text,
                                  }
                                : msg
                            )
                          );
                          setTypingMessageId(null);
                          setIsTyping(false);
                          setGenerationStartTime(null);
                        }}
                        onStop={(displayedText) => {
                          // 更新消息为已显示的部分
                          setMessages((prev) =>
                            prev.map((msg) =>
                              msg.id === message.id
                                ? {
                                    ...msg,
                                    isTyping: false,
                                    displayText: displayedText,
                                    text: displayedText,
                                  }
                                : msg
                            )
                          );
                          setTypingMessageId(null);
                          setIsTyping(false);
                          setGenerationStartTime(null);
                          setShouldStopTyping(false);
                        }}
                      />
                      {message.startTime && <Timer startTime={message.startTime} />}
                    </>
                  ) : (
                    <ChatMarkdown>
                      {message.displayText || message.text}
                    </ChatMarkdown>
                  ))}
                {message.terminalOutput && message.terminalOutput}
              </div>
            </div>
          ))}

          {/* 移除 messagesEndRef，在 column-reverse 模式下不需要 */}
        </>
      </div>

      <div className="chat-input">
        <div className="input-container">
          <div className="input-wrapper">
            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                language === "zh"
                  ? "快和我聊点啥吧"
                  : "Chat with me..."
              }
              disabled={isTyping}
              rows={1}
            />
          </div>
          <button
            onClick={isTyping ? handleStopGeneration : handleSendMessage}
            disabled={!isTyping && !inputText.trim()}
            className={isTyping ? "stop-button" : ""}
          >
            {isTyping
              ? language === "zh"
                ? "⏸"
                : "⏸"
              : language === "zh"
              ? "发送"
              : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatInterface;