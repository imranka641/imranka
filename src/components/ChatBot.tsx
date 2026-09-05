import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquareCode, 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  ExternalLink, 
  RotateCcw, 
  ChevronDown, 
  ArrowUpRight,
  ShieldCheck,
  CheckCircle,
  Copy,
  Check
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ChatMessage, SUGGESTED_QUESTIONS, getLocalKnowledgeResponse } from '../data/chatbotKnowledge';

interface ChatBotProps {
  onOpenCV?: () => void;
}

export const ChatBot: React.FC<ChatBotProps> = ({ onOpenCV }) => {
  const { isRTL, language } = useLanguage();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome',
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: language === 'am' 
        ? "ሰላም! እኔ የኢምራን ከድር የፖርትፎሊዮ ረዳት AI ነኝ። ስለ ኢምራን የስራ ልምድ፣ የገነባቸው 13+ የቀጥታ ሲስተሞች (እንደ TypeMaster እና MakeCV)፣ የቴሌብር/ሲቢኢ ክፍያ አሰራር ወይም የትምህርት ዝግጅት ማንኛውንም ጥያቄ ይጠይቁኝ!"
        : language === 'ar'
        ? "مرحباً بك! أنا المساعد الذكي لمطور الويب عمران خضر. اسألني عن خبرات عمران البرمجية، مشاريعه الحية الـ 13+ (بما في ذلك TypeMaster و MakeCV)، وتكامل بوابات الدفع، وإمكانية التوظيف."
        : "Hi! I'm Imran's AI Portfolio Assistant. Ask me anything about his overall full-stack experience, 13+ production web applications (including TypeMaster & MakeCV), technical skills, or hiring availability!",
      suggestedActions: [
        { label: 'Overall Experience', action: 'ask_experience' },
        { label: 'TypeMaster & MakeCV', action: 'ask_typemaster' },
        { label: 'Tech Stack', action: 'ask_stack' }
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [hasUnread, setHasUnread] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMessageId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMessageId,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsLoading(true);

    try {
      // Attempt backend query via /api/chat first
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: text,
          history: messages.slice(-5).map(m => ({ sender: m.sender, text: m.text }))
        })
      });

      const data = await res.json().catch(() => null);

      if (data && data.reply && !data.fallback) {
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedActions: [
            { label: 'View 13+ Projects', action: 'scroll_projects' },
            { label: 'Contact Imran', action: 'contact' }
          ]
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        // Instant intelligent local knowledge fallback
        const local = getLocalKnowledgeResponse(text);
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: local.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedActions: local.actions
        };
        setMessages((prev) => [...prev, botMsg]);
      }
    } catch {
      // Local fallback on connection or offline
      const local = getLocalKnowledgeResponse(text);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: local.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: local.actions
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionClick = (action: { label: string; action: string; link?: string }) => {
    if (action.link) {
      window.open(action.link, '_blank', 'noopener,noreferrer');
      return;
    }

    switch (action.action) {
      case 'contact':
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'scroll_projects':
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'view_cv':
      case 'download_cv':
        if (onOpenCV) {
          onOpenCV();
        } else {
          document.getElementById('cv')?.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      case 'ask_experience':
        handleSendMessage("What is Imran's overall experience and background?");
        break;
      case 'ask_typemaster':
        handleSendMessage("Tell me about TypeMaster and MakeCV");
        break;
      case 'ask_stack':
        handleSendMessage("What is Imran's full tech stack and skills?");
        break;
      default:
        handleSendMessage(action.label);
    }
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: "Chat cleared! How else can I assist you regarding Imran's experience, projects, or background?",
        suggestedActions: [
          { label: 'Overall Experience', action: 'ask_experience' },
          { label: 'TypeMaster & MakeCV', action: 'ask_typemaster' },
          { label: 'Contact Imran', action: 'contact' }
        ]
      }
    ]);
  };

  // Helper to format text with bold, markdown links and code tags
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Process markdown links [label](url)
      const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
      const parts: React.ReactNode[] = [];
      let lastIndex = 0;
      let match;

      while ((match = linkRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        parts.push(
          <a
            key={match[2] + match.index}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400 font-semibold underline underline-offset-2 hover:opacity-80"
          >
            <span>{match[1]}</span>
            <ExternalLink className="w-2.5 h-2.5 inline shrink-0" />
          </a>
        );
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      const content = parts.length > 0 ? parts : line;

      // Handle bullet points
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        return (
          <div key={idx} className="flex items-start gap-1.5 my-1">
            <span className="text-emerald-500 font-bold shrink-0 mt-0.5">•</span>
            <span className="flex-1">{content}</span>
          </div>
        );
      }

      // Empty line spacing
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      return <p key={idx} className="my-1 leading-relaxed">{content}</p>;
    });
  };

  return (
    <div 
      className={`fixed bottom-5 z-50 transition-all ${
        isRTL ? 'left-5 sm:left-7' : 'right-5 sm:right-7'
      }`}
    >
      {/* Floating Chat Trigger Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-2"
          >
            <button
              onClick={() => setIsOpen(true)}
              className="group relative flex items-center gap-2.5 pl-3 pr-4 py-2.5 sm:py-3 rounded-full bg-neutral-900/95 dark:bg-neutral-900/95 light:bg-white/95 text-neutral-100 dark:text-neutral-100 light:text-neutral-900 border border-emerald-500/40 shadow-xl hover:shadow-emerald-500/20 hover:border-emerald-400 transition-all duration-300 hover:scale-[1.03] backdrop-blur-md"
              aria-label="Open Imran Kedir AI Chat Assistant"
            >
              {/* Pulsing indicator & avatar */}
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                  <Bot className="w-4 h-4" />
                </div>
                <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
              </div>

              {/* Button text */}
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold flex items-center gap-1 text-white dark:text-white light:text-neutral-900">
                  <span>Chat with Imran AI</span>
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                </span>
                <span className="text-[10px] text-neutral-400 dark:text-neutral-400 light:text-neutral-500 hidden sm:inline">
                  Ask about experience & 13+ projects
                </span>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="w-[92vw] sm:w-[420px] h-[590px] max-h-[85vh] rounded-3xl bg-neutral-950/95 dark:bg-neutral-950/95 light:bg-white/95 border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden text-neutral-100 dark:text-neutral-100 light:text-neutral-900"
          >
            {/* Header */}
            <div className="px-4 py-3.5 bg-neutral-900/90 dark:bg-neutral-900/90 light:bg-neutral-100/90 border-b border-neutral-800 dark:border-neutral-800 light:border-neutral-200 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Bot className="w-5 h-5" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-neutral-900" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs sm:text-sm font-bold text-white dark:text-white light:text-neutral-900">
                      Imran Kedir AI
                    </h3>
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono">
                      Assistant
                    </span>
                  </div>
                  <p className="text-[10px] text-neutral-400 dark:text-neutral-400 light:text-neutral-500">
                    Experience & Production Systems Q&A
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  title="Clear conversation"
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white dark:hover:text-white light:hover:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-800 light:hover:bg-neutral-200 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white dark:hover:text-white light:hover:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-800 light:hover:bg-neutral-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div className={`max-w-[84%] flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`relative px-3.5 py-2.5 rounded-2xl ${
                        msg.sender === 'user'
                          ? 'bg-emerald-600 text-white rounded-tr-xs shadow-md shadow-emerald-600/20'
                          : 'bg-neutral-900/90 dark:bg-neutral-900/90 light:bg-neutral-100 text-neutral-200 dark:text-neutral-200 light:text-neutral-800 border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 rounded-tl-xs'
                      }`}
                    >
                      {renderFormattedText(msg.text)}

                      {/* Quick copy button for bot responses */}
                      {msg.sender === 'bot' && (
                        <div className="flex justify-end mt-1.5 pt-1 border-t border-neutral-800/40 dark:border-neutral-800/40 light:border-neutral-200/60">
                          <button
                            onClick={() => handleCopyText(msg.text, msg.id)}
                            className="text-[10px] text-neutral-400 hover:text-emerald-400 transition-colors flex items-center gap-1"
                            title="Copy answer"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="w-2.5 h-2.5 text-emerald-400" />
                                <span className="text-emerald-400">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-2.5 h-2.5" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Action chips attached to bot message */}
                    {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {msg.suggestedActions.map((action, i) => (
                          <button
                            key={i}
                            onClick={() => handleActionClick(action)}
                            className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800 light:bg-neutral-200 light:hover:bg-neutral-300 text-emerald-400 dark:text-emerald-400 light:text-emerald-700 border border-neutral-800 dark:border-neutral-800 light:border-neutral-300 transition-all flex items-center gap-1 active:scale-95"
                          >
                            <span>{action.label}</span>
                            {action.link ? (
                              <ArrowUpRight className="w-2.5 h-2.5" />
                            ) : (
                              <span>→</span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}

                    <span className="text-[9px] text-neutral-500 mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-neutral-800 text-neutral-300 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex gap-2.5 items-center">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 animate-pulse" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-tl-xs bg-neutral-900 text-neutral-400 border border-neutral-800 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce"></span>
                    <span className="text-[10px] ml-1">Analyzing experience...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Starter Suggestion Pills */}
            <div className="px-3.5 py-2 bg-neutral-900/60 dark:bg-neutral-900/60 light:bg-neutral-100/60 border-t border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200 overflow-x-auto no-scrollbar flex gap-1.5 shrink-0">
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  disabled={isLoading}
                  className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-neutral-900 dark:bg-neutral-900 light:bg-white text-neutral-300 dark:text-neutral-300 light:text-neutral-700 border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 hover:border-emerald-500/50 hover:text-emerald-400 transition-colors shrink-0 whitespace-nowrap"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-neutral-950 dark:bg-neutral-950 light:bg-white border-t border-neutral-800 dark:border-neutral-800 light:border-neutral-200 flex items-center gap-2 shrink-0"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about projects, tech stack, experience..."
                disabled={isLoading}
                className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-neutral-900 dark:bg-neutral-900 light:bg-neutral-100 text-neutral-100 dark:text-neutral-100 light:text-neutral-900 border border-neutral-800 dark:border-neutral-800 light:border-neutral-300 focus:outline-none focus:border-emerald-500 transition-colors"
              />

              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-md shadow-emerald-600/20 transition-all shrink-0"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
