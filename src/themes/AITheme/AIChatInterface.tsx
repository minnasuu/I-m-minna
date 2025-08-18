import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { personalDataMultiLang } from '../../data/personalData';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  terminalOutput?: React.ReactNode;
}

const AIChatInterface: React.FC = () => {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [autoChatIndex, setAutoChatIndex] = useState(0);
  const [isAutoChatting, setIsAutoChatting] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentData = personalDataMultiLang[language];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 自动对话的问答对
  const autoChatQuestions = language === 'zh' ? [
    {
      question: '你叫什么名字？',
      answer: `我叫${currentData.info.name}，很高兴认识你！`
    },
    {
      question: '你是做什么工作的？',
      answer: `我是一名${currentData.info.title}，专注于前端开发和用户体验设计。`
    },
    {
      question: '能简单介绍一下你自己吗？',
      answer: currentData.info.bio
    },
    {
      question: '你擅长哪些技术？',
      answer: '我擅长前端开发、后端开发和设计等多个领域。你可以输入"skills"查看我的详细技术栈。'
    },
    {
      question: '你有什么项目作品吗？',
      answer: '我有很多有趣的项目和作品。你可以输入"projects"查看我的精选项目，或者输入"help"了解更多命令。'
    }
  ] : [
    {
      question: 'What\'s your name?',
      answer: `My name is ${currentData.info.name}, nice to meet you!`
    },
    {
      question: 'What do you do for work?',
      answer: `I'm a ${currentData.info.title}, focusing on frontend development and user experience design.`
    },
    {
      question: 'Can you tell me a bit about yourself?',
      answer: currentData.info.bio
    },
    {
      question: 'What technologies are you skilled in?',
      answer: 'I\'m skilled in frontend development, backend development, and design. You can type "skills" to see my detailed tech stack.'
    },
    {
      question: 'Do you have any projects or works?',
      answer: 'I have many interesting projects and crafts. You can type "projects" to see my featured works, or type "help" to learn more commands.'
    }
  ];

  // 自动对话逻辑
  useEffect(() => {
    if (!isAutoChatting || autoChatIndex >= autoChatQuestions.length) {
      setIsAutoChatting(false);
      return;
    }

    const currentQ = autoChatQuestions[autoChatIndex];
    
    // 添加用户问题
    const userMessage: Message = {
      id: `auto-user-${autoChatIndex}`,
      text: currentQ.question,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // 延迟后添加AI回答
    setTimeout(() => {
      const aiMessage: Message = {
        id: `auto-ai-${autoChatIndex}`,
        text: currentQ.answer,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // 继续下一个问题
      setTimeout(() => {
        setAutoChatIndex(prev => prev + 1);
      }, 1000);
    }, 1500);

  }, [autoChatIndex, isAutoChatting, language, currentData]);

  // 初始化欢迎消息
  useEffect(() => {
    const welcomeMessage: Message = {
      id: '1',
      text: language === 'zh' 
        ? '你好！我是Minna的AI助手。让我通过几个问题来介绍一下自己吧！'
        : 'Hello! I\'m Minna\'s AI assistant. Let me introduce myself through a few questions!',
      sender: 'ai',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, [language]);

  const generateTerminalOutput = (command: string): React.ReactNode => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand === 'help' || lowerCommand === '帮助') {
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
    
    if (lowerCommand === 'about' || lowerCommand === '关于') {
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
    
    if (lowerCommand === 'skills' || lowerCommand === '技能') {
      return (
        <div className="terminal-output">
          <div className="command">$ {command}</div>
          <div className="output">
            {currentData.skills.map((skill: any, index: number) => (
              <div key={index}>
                {skill.name}: {'█'.repeat(Math.floor(skill.level / 10))}{'░'.repeat(10 - Math.floor(skill.level / 10))} {skill.level}%
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    if (lowerCommand === 'projects' || lowerCommand === '项目') {
      return (
        <div className="terminal-output">
          <div className="command">$ {command}</div>
          <div className="output">
            <div>Featured Projects:</div>
            {currentData.projects.filter((p: any) => p.featured).map((project: any, index: number) => (
              <div key={index}>
                • {project.name} - {project.description}
              </div>
            ))}
            <div>Featured Crafts:</div>
            {currentData.crafts.filter((c: any) => c.featured).map((craft: any, index: number) => (
              <div key={index}>
                • {craft.name} - {craft.description}
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    if (lowerCommand === 'contact' || lowerCommand === '联系') {
      return (
        <div className="terminal-output">
          <div className="command">$ {command}</div>
          <div className="output">
            <div>Email: {currentData.info.email}</div>
            <div>Location: {currentData.info.location}</div>
            {currentData.info.wechat && <div>WeChat: {currentData.info.wechat}</div>}
            <div>Social Links:</div>
            {currentData.info.socialLinks.map((link: any, index: number) => (
              <div key={index}>• {link.name}: {link.url}</div>
            ))}
          </div>
        </div>
      );
    }
    
    if (lowerCommand === 'clear' || lowerCommand === '清除') {
      setMessages([]);
      return null;
    }
    
    // 默认AI响应
    return null;
  };

  const generateAIResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('你好')) {
      return language === 'zh' 
        ? '你好！很高兴见到你。我是Minna的AI助手，有什么可以帮助你的吗？'
        : 'Hello! Nice to meet you. I\'m Minna\'s AI assistant, how can I help you?';
    }
    
    if (lowerInput.includes('name') || lowerInput.includes('名字')) {
      return language === 'zh'
        ? `我的名字是Minna，我是一名${currentData.info.title}。`
        : `My name is Minna, I'm a ${currentData.info.title}.`;
    }
    
    if (lowerInput.includes('skill') || lowerInput.includes('技术') || lowerInput.includes('能力')) {
      return language === 'zh'
        ? '我擅长前端开发、后端开发、DevOps和设计等多个领域。你可以输入"skills"查看详细的技术栈。'
        : 'I\'m skilled in frontend development, backend development, DevOps, and design. You can type "skills" to see my detailed tech stack.';
    }
    
    if (lowerInput.includes('project') || lowerInput.includes('项目')) {
      return language === 'zh'
        ? '我有很多有趣的项目和作品。你可以输入"projects"查看我的精选项目。'
        : 'I have many interesting projects and crafts. You can type "projects" to see my featured works.';
    }
    
    if (lowerInput.includes('contact') || lowerInput.includes('联系') || lowerInput.includes('邮箱')) {
      return language === 'zh'
        ? `你可以通过邮箱 ${currentData.info.email} 联系我，或者输入"contact"查看完整的联系方式。`
        : `You can contact me via email at ${currentData.info.email}, or type "contact" to see all contact information.`;
    }
    
    const responses = language === 'zh' ? [
      "这是一个很有趣的问题！让我想想...",
      "我很乐意帮助你！",
      "这是一个很好的观点。让我来解释一下...",
      "我很高兴你问这个问题。让我详细说明...",
      "这确实是我可以帮你的！",
      "我觉得这个话题很有趣。这是我的看法...",
      "谢谢你的分享。让我告诉你我知道的...",
      "这是一个很棒的问题！让我为你详细解释..."
    ] : [
      "That's an interesting question! Let me think about that...",
      "I'd be happy to help you with that!",
      "That's a great point. Here's what I think...",
      "I'm glad you asked that question. Let me explain...",
      "That's something I can definitely help you with!",
      "I find that topic fascinating. Here's my perspective...",
      "Thanks for sharing that with me. Here's what I know...",
      "That's a wonderful question! Let me break it down for you..."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    // 停止自动对话
    setIsAutoChatting(false);

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // 检查是否是命令
    const terminalOutput = generateTerminalOutput(inputText);
    
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: terminalOutput ? '' : generateAIResponse(inputText),
        sender: 'ai',
        timestamp: new Date(),
        terminalOutput
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputText]);

  return (
    <div className="ai-chat-interface">
      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            <div className="message-avatar">
              {message.sender === 'ai' ? '🤖' : '👤'}
            </div>
            <div className="message-content">
              {message.text && <div>{message.text}</div>}
              {message.terminalOutput && message.terminalOutput}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="message ai">
            <div className="message-avatar">🤖</div>
            <div className="message-content">
              <span className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="chat-input">
        <div className="input-container">
          <div className="input-wrapper">
            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={language === 'zh' ? '输入消息或命令...' : 'Type a message or command...'}
              disabled={isTyping || isAutoChatting}
              rows={1}
            />
          </div>
          <button 
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping || isAutoChatting}
          >
            {isTyping ? (language === 'zh' ? 'AI正在输入...' : 'AI is typing...') : 
             isAutoChatting ? (language === 'zh' ? '自动对话中...' : 'Auto chatting...') :
             (language === 'zh' ? '发送' : 'Send')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatInterface;
