import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User, RefreshCw, Smartphone, ArrowRight } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: 'سلام! من دستیار هوشمند خرید و قیمت‌گذاری موبایل آراد هستم. 🤖📱\nمی‌تونید بودجه، نیازها یا سوالتتون رو بپرسید تا بهترین پیشنهاد گوشی نو یا کارکرده رو بهتون بگم.',
      time: 'هم‌اکنون'
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [budget, setBudget] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);

    try {
      const res = await fetch('/api/gemini/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userQuery: textToSend,
          budget: budget || undefined
        })
      });

      const data = await res.json();
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.reply || 'پاسخی دریافت نشد، لطفاً مجدداً تلاش نمایید.',
        time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: 'خطا در ارتباط با سرور هوشمند. کارشناسان ما آماده پاسخگویی تلفنی به شما هستند.',
          time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    'با ۳۵ میلیون تومان آیفون ۱۳ کارکرده بخرم یا A55 نو؟',
    'بهترین گوشی تا ۲۰ میلیون تومان برای عکاسی چیه؟',
    'شرایط مهلت تست ۷ روزه گوشی کارکرده آراد چطوریه؟',
    'فرق آیفون ۱۵ پرو و ۱۵ پرو مکس چیه؟'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md dir-rtl overflow-hidden">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[650px] max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-900/50 via-slate-900 to-indigo-900/50 px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                دستیار هوشمند خرید آراد (Gemini AI)
              </h2>
              <p className="text-xs text-cyan-300">راهنمای تخصصی مقایسه و انتخاب گوشی نو و کارکرده</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition border border-slate-700 shadow-sm"
              title="بازگشت به فروشگاه"
            >
              <ArrowRight className="w-4 h-4 text-cyan-400" />
              <span>بازگشت به فروشگاه</span>
            </button>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat History */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${
                m.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  m.sender === 'user'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                }`}
              >
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed space-y-1 ${
                  m.sender === 'user'
                    ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none'
                    : 'bg-slate-950 text-slate-200 border border-slate-800 rounded-tl-none whitespace-pre-line'
                }`}
              >
                <p>{m.text}</p>
                <span
                  className={`block text-[10px] text-left opacity-60 ${
                    m.sender === 'user' ? 'text-slate-900' : 'text-slate-500'
                  }`}
                >
                  {m.time}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-cyan-400 text-xs bg-slate-950 p-3 rounded-2xl w-fit border border-slate-800 animate-pulse">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>دستیار هوشمند در حال تحلیل و پاسخگویی...</span>
            </div>
          )}
        </div>

        {/* Quick Prompts Pills */}
        <div className="px-6 py-2 bg-slate-950/80 border-t border-slate-800/80 overflow-x-auto no-scrollbar flex items-center gap-2">
          <span className="text-[10px] text-slate-500 shrink-0 font-bold">پیشنهاد سریع:</span>
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p)}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 transition shrink-0"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            placeholder="سوال خود را درباره انتخاب یا قیمت گوشی بنویسید..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={loading || !inputQuery.trim()}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-3 rounded-xl text-xs flex items-center gap-1 shadow-md shadow-cyan-500/20 transition disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">ارسال</span>
          </button>
        </div>

      </div>
    </div>
  );
};
