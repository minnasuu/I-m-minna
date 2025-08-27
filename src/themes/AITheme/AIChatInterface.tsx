import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { personalDataMultiLang } from '../../data/personalData';

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  terminalOutput?: React.ReactNode;
  isTyping?: boolean;
  displayText?: string;
}

// 逐字输出组件，与终端主题保持一致的速度
const TypewriterText: React.FC<{
  text: string;
  speed?: number;
  onComplete?: () => void;
  isVisible: boolean;
}> = ({ text, speed = 30, onComplete, isVisible }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setDisplayText("");
      setCurrentIndex(0);
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
  }, [currentIndex, text, speed, onComplete, isVisible]);

  useEffect(() => {
    if (isVisible && currentIndex === 0) {
      setDisplayText("");
      setCurrentIndex(0);
    }
  }, [isVisible, text]);

  return (
    <span style={{ whiteSpace: "pre-line" }}>
      {displayText}
      {isVisible && currentIndex < text.length && (
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
  const [autoChatIndex, setAutoChatIndex] = useState(0);
  const [isAutoChatting, setIsAutoChatting] = useState(false);
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentData = personalDataMultiLang[language];

  useEffect(() => {
    // 消息从头部插入，最新的消息显示在顶部
    // 自动滚动到顶部以显示最新消息
    const chatMessages = document.querySelector('.chat-messages');
    if (chatMessages) {
      chatMessages.scrollTop = 0;
    }
  }, [messages]);

  // 自然对话形式的问题，回答内容与终端主题保持一致
  const autoChatQuestions =
    language === "zh"
      ? [
          {
            question: "你叫什么名字？",
            answer: currentData.info.name,
            type: "conversation",
          },
          {
            question: "你在哪里工作？",
            answer: currentData.info.title,
            type: "conversation",
          },
          {
            question: "能简单介绍一下你自己吗？",
            answer: currentData.info.bio,
            type: "conversation",
          },
          {
            question: "你都掌握哪些技能？",
            answer: currentData.skills
              .map((skill) => `⚡️ ${skill.name} - ${skill.level}%`)
              .join("\n"),
            type: "conversation",
          },
          {
            question: "你有什么兴趣爱好？",
            answer: currentData.interests
              .map((interest) => interest.name)
              .join("、"),
            type: "conversation",
          },
          {
            question: "你最近写了哪些文章？",
            answer:
              currentData.articles
                .slice(0, 5)
                .map(
                  (article) => `📄 ${article.title} (${article.readTime}min)`
                )
                .join("\n") +
              (currentData.articles.length > 5
                ? `\n... and ${currentData.articles.length - 5} more articles`
                : ""),
            type: "conversation",
          },
          {
            question: "你参与了哪些主要项目？",
            answer:
              currentData.projects
                .filter((p) => p.featured)
                .slice(0, 5)
                .map((project) => `💎 ${project.name} - ${project.description}`)
                .join("\n") +
              (currentData.projects.filter((p) => p.featured).length > 5
                ? `\n... and ${
                    currentData.projects.filter((p) => p.featured).length - 5
                  } more projects`
                : ""),
            type: "conversation",
          },
          {
            question: "你有什么个人作品吗？",
            answer:
              currentData.crafts
                .filter((c) => c.featured)
                .slice(0, 5)
                .map((craft) => `♾️ ${craft.name} - ${craft.description}`)
                .join("\n") +
              (currentData.crafts.filter((c) => c.featured).length > 5
                ? `\n... and ${
                    currentData.crafts.filter((c) => c.featured).length - 5
                  } more crafts`
                : ""),
            type: "conversation",
          },
          {
            question: "还可以了解些什么？",
            answer: "你可以在左侧查看更多详细信息，或者继续和我聊天！",
            type: "info",
          },
        ]
      : [
          {
            question: "What's your name?",
            answer: currentData.info.name,
            type: "conversation",
          },
          {
            question: "Where do you work?",
            answer: currentData.info.title,
            type: "conversation",
          },
          {
            question: "Can you tell me about yourself?",
            answer: currentData.info.bio,
            type: "conversation",
          },
          {
            question: "What skills do you have?",
            answer: currentData.skills
              .map((skill) => `⚡️ ${skill.name} - ${skill.level}%`)
              .join("\n"),
            type: "conversation",
          },
          {
            question: "What are your interests?",
            answer: currentData.interests
              .map((interest) => interest.name)
              .join(", "),
            type: "conversation",
          },
          {
            question: "What articles have you written recently?",
            answer:
              currentData.articles
                .slice(0, 5)
                .map(
                  (article) => `📄 ${article.title} (${article.readTime}min)`
                )
                .join("\n") +
              (currentData.articles.length > 5
                ? `\n... and ${currentData.articles.length - 5} more articles`
                : ""),
            type: "conversation",
          },
          {
            question: "What major projects have you worked on?",
            answer:
              currentData.projects
                .filter((p) => p.featured)
                .slice(0, 5)
                .map((project) => `💎 ${project.name} - ${project.description}`)
                .join("\n") +
              (currentData.projects.filter((p) => p.featured).length > 5
                ? `\n... and ${
                    currentData.projects.filter((p) => p.featured).length - 5
                  } more projects`
                : ""),
            type: "conversation",
          },
          {
            question: "Do you have any personal projects?",
            answer:
              currentData.crafts
                .filter((c) => c.featured)
                .slice(0, 5)
                .map((craft) => `♾️ ${craft.name} - ${craft.description}`)
                .join("\n") +
              (currentData.crafts.filter((c) => c.featured).length > 5
                ? `\n... and ${
                    currentData.crafts.filter((c) => c.featured).length - 5
                  } more crafts`
                : ""),
            type: "conversation",
          },
          {
            question: "Is there anything else you'd like to know?",
            answer:
              "You can check more details in the sidebar, or continue chatting with me!",
            type: "info",
          },
        ];

  // 自动对话逻辑，与终端主题保持一致的100ms间隔
  useEffect(() => {
    if (!isAutoChatting || autoChatIndex >= autoChatQuestions.length) {
      setIsAutoChatting(false);
      return;
    }

    const currentQ = autoChatQuestions[autoChatIndex];

    // 添加用户问题（自然对话格式）
    const userMessage: Message = {
      id: `auto-user-${autoChatIndex}`,
      text: currentQ.question,
      sender: "user",
      timestamp: new Date(),
    };

    // 新消息从数组头部插入，最新的消息显示在顶部
    setMessages((prev) => [userMessage, ...prev]);

    // 延迟后添加AI回答，使用与终端主题一致的100ms间隔
    setTimeout(() => {
      const aiMessageId = `auto-ai-${autoChatIndex}`;
      const aiMessage: Message = {
        id: aiMessageId,
        text: currentQ.answer,
        sender: "ai",
        timestamp: new Date(),
        isTyping: true,
      };

      // 新消息从数组头部插入，最新的消息显示在顶部
      setMessages((prev) => [aiMessage, ...prev]);
      setTypingMessageId(aiMessageId);

      // 使用更快的逐字输出速度（每个字符30ms，比终端稍快以适应AI主题）
      const typingDuration = currentQ.answer.length * 30;

      // 逐字输出完成后继续下一个问题
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMessageId
              ? { ...msg, isTyping: false, displayText: currentQ.answer }
              : msg
          )
        );
        setTypingMessageId(null);

        // 继续下一个问题，与终端主题保持一致的100ms间隔
        setTimeout(() => {
          setAutoChatIndex((prev) => prev + 1);
        }, 100);
      }, typingDuration);
    }, 100);
  }, [autoChatIndex, isAutoChatting, language, currentData]);

  // 初始化欢迎消息，使用与终端主题一致的速度
  useEffect(() => {
    // 重置自动对话状态
    setIsAutoChatting(false);
    setAutoChatIndex(0);

    const welcomeText =
      language === "zh"
        ? "你好！欢迎来到我的个人空间。"
        : "Hello! Welcome to my personal space.";

    const welcomeMessage: Message = {
      id: "1",
      text: welcomeText,
      sender: "ai",
      timestamp: new Date(),
      isTyping: true,
    };
    // 欢迎消息从数组头部插入
    setMessages([welcomeMessage]);
    setTypingMessageId("1");

    // 欢迎消息的逐字输出，使用30ms间隔
    const typingDuration = welcomeText.length * 30;
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === "1"
            ? { ...msg, isTyping: false, displayText: welcomeText }
            : msg
        )
      );
      setTypingMessageId(null);

      // 欢迎消息完成后，开始自动对话
      setTimeout(() => {
        setAutoChatIndex(0);
        setIsAutoChatting(true);
      }, 1000);
    }, typingDuration);
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
      setMessages([]);
      return null;
    }

    // 默认AI响应
    return null;
  };

  const generateAIResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();

    if (
      lowerInput.includes("hello") ||
      lowerInput.includes("hi") ||
      lowerInput.includes("你好")
    ) {
      return language === "zh"
        ? "你好！很高兴见到你。我是Minna的AI助手，有什么可以帮助你的吗？"
        : "Hello! Nice to meet you. I'm Minna's AI assistant, how can I help you?";
    }

    if (lowerInput.includes("name") || lowerInput.includes("名字")) {
      return language === "zh"
        ? `我的名字是${currentData.info.name}，我是一名${currentData.info.title}。我专注于创造优美的用户界面和出色的用户体验。`
        : `My name is ${currentData.info.name}, I'm a ${currentData.info.title}. I focus on creating beautiful user interfaces and exceptional user experiences.`;
    }

    if (
      lowerInput.includes("skill") ||
      lowerInput.includes("技术") ||
      lowerInput.includes("能力")
    ) {
      return language === "zh"
        ? `我主要擅长以下技术领域：\n• 前端开发：React、Vue、TypeScript、现代CSS\n• 后端开发：Node.js、Python、数据库设计\n• UI/UX设计：用户研究、原型设计、交互设计\n• 开发工具：Git、Docker、自动化部署`
        : `I'm skilled in several technical areas:\n• Frontend Development: React, Vue, TypeScript, Modern CSS\n• Backend Development: Node.js, Python, Database Design\n• UI/UX Design: User Research, Prototyping, Interaction Design\n• Development Tools: Git, Docker, Automated Deployment`;
    }

    if (lowerInput.includes("project") || lowerInput.includes("项目")) {
      return language === "zh"
        ? `我参与过多种类型的项目：\n• 企业级Web应用 - 复杂业务逻辑的前端实现\n• 数据可视化平台 - 让数据更直观易懂\n• 移动端应用 - 响应式设计和原生体验\n• 开源工具库 - 为开发者社区贡献代码`
        : `I've worked on various types of projects:\n• Enterprise Web Applications - Complex business logic implementation\n• Data Visualization Platforms - Making data more intuitive\n• Mobile Applications - Responsive design and native experience\n• Open Source Libraries - Contributing to the developer community`;
    }

    if (
      lowerInput.includes("contact") ||
      lowerInput.includes("联系") ||
      lowerInput.includes("邮箱")
    ) {
      return language === "zh"
        ? `你可以通过以下方式联系我：\n• 邮箱：${currentData.info.email}\n• 地址：${currentData.info.location}\n我很乐意与你交流技术话题或合作机会！`
        : `You can contact me through:\n• Email: ${currentData.info.email}\n• Location: ${currentData.info.location}\nI'd love to discuss technical topics or collaboration opportunities with you!`;
    }

    // 对于无关的输入，提供命令指导
    const responses =
      language === "zh"
        ? [
            "感谢你的分享！如果你想了解更多关于我的信息，可以尝试以下命令：\n• about - 查看我的基本信息\n• skills - 查看技术技能\n• projects - 查看项目作品\n• contact - 查看联系方式",
            "这很有趣！如果你想深入了解我的工作和技能，可以输入相关命令获取详细信息。输入 'help' 查看所有可用命令。",
            "谢谢你的问题！我可以为你提供关于我的技能、项目和经验的详细信息。试试输入 'skills' 或 'projects' 来了解更多。",
            "我很高兴与你交流！如果你对我的技术背景或项目经验感兴趣，可以使用命令来获取具体信息。输入 'help' 查看帮助。",
          ]
        : [
            "Thanks for sharing! If you'd like to know more about me, you can try these commands:\n• about - View my basic information\n• skills - View technical skills\n• projects - View project works\n• contact - View contact information",
            "That's interesting! If you want to learn more about my work and skills, you can input relevant commands for detailed information. Type 'help' to see all available commands.",
            "Thanks for your question! I can provide detailed information about my skills, projects, and experience. Try typing 'skills' or 'projects' to learn more.",
            "I'm glad to chat with you! If you're interested in my technical background or project experience, you can use commands to get specific information. Type 'help' for assistance.",
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
      sender: "user",
      timestamp: new Date(),
    };

    // 新消息从数组头部插入，最新的消息显示在顶部
    setMessages((prev) => [userMessage, ...prev]);
    setInputText("");
    setIsTyping(true);

    // 检查是否是命令
    const terminalOutput = generateTerminalOutput(inputText);
    const aiResponseText = terminalOutput ? "" : generateAIResponse(inputText);

    setTimeout(() => {
      const aiMessageId = (Date.now() + 1).toString();
      const aiResponse: Message = {
        id: aiMessageId,
        text: aiResponseText,
        sender: "ai",
        timestamp: new Date(),
        terminalOutput,
        isTyping: true,
      };
      // 新消息从数组头部插入，最新的消息显示在顶部
      setMessages((prev) => [aiResponse, ...prev]);
      setTypingMessageId(aiMessageId);

      if (aiResponseText) {
        // 计算逐字输出的时间
        const typingDuration = aiResponseText.length * 50;
        setTimeout(() => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === aiMessageId
                ? { ...msg, isTyping: false, displayText: aiResponseText }
                : msg
            )
          );
          setTypingMessageId(null);
          setIsTyping(false);
        }, typingDuration);
      } else {
        // 如果是终端输出，直接完成
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMessageId ? { ...msg, isTyping: false } : msg
          )
        );
        setTypingMessageId(null);
        setIsTyping(false);
      }
    }, 500 + Math.random() * 1000);
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
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              {message.sender === "ai" ? (
                <div className="message-avatar">
                  <img src={"/avatar.png"} alt="avatar" />
                </div>
              ) : null}
              <div className="message-content">
                {message.text &&
                  (message.isTyping ? (
                    <TypewriterText
                      text={message.text}
                      speed={30}
                      isVisible={typingMessageId === message.id}
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
                      }}
                    />
                  ) : (
                    <div style={{ whiteSpace: "pre-line" }}>
                      {message.displayText || message.text}
                    </div>
                  ))}
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
                  ? "输入消息或命令..."
                  : "Type a message or command..."
              }
              disabled={isTyping || isAutoChatting}
              rows={1}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping || isAutoChatting}
          >
            {isTyping
              ? language === "zh"
                ? "AI正在输入..."
                : "AI is typing..."
              : isAutoChatting
              ? language === "zh"
                ? "自动对话中..."
                : "Auto chatting..."
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
