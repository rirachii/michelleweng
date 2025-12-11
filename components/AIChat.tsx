import React, { useState, useRef, useEffect } from 'react';
import { RetroCard } from './RetroCard';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

export const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'NAVI_SYSTEM_INITIALIZED. I am listening.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  // TRAFFIC CONTROL PROTOCOL STATE
  const [messageCount, setMessageCount] = useState(0);
  const [isRateLimited, setIsRateLimited] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Reset message counter every 60 seconds (Sliding Windowish)
  useEffect(() => {
    const timer = setInterval(() => {
      setMessageCount(0);
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    // SPAM PREVENTION LOGIC
    if (isRateLimited) {
       setMessages(prev => [...prev, { role: 'model', text: 'ERR_429: SYSTEM_COOLDOWN_ACTIVE. REQUEST_DROPPED.', isError: true }]);
       return;
    }

    if (messageCount >= 5) {
       setIsRateLimited(true);
       setMessages(prev => [...prev, { role: 'model', text: 'WARNING: TRAFFIC_SPIKE_DETECTED. INITIATING_COOLING_SEQUENCE (10s)...', isError: true }]);
       
       setTimeout(() => {
         setIsRateLimited(false);
         setMessageCount(0);
         setMessages(prev => [...prev, { role: 'model', text: 'SYSTEM: TEMPERATURE_NORMAL. UPLINK_RESTORED.' }]);
       }, 10000); // 10 second hard lockout
       return;
    }

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setMessageCount(prev => prev + 1);

    const responseText = await sendMessageToGemini([...messages, userMessage], input);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto h-[65vh] flex flex-col relative">
      <div className="absolute -top-10 -left-10 text-6xl text-gray-200 opacity-60 font-vt323 pointer-events-none">
        COMM_LINK
      </div>

      <RetroCard borderColor="border-gray-400" className="flex-grow flex flex-col p-0 overflow-hidden bg-white/80">
        
        {/* Header Bar */}
        <div className="bg-gray-100 border-b border-gray-300 p-2 flex justify-between items-center text-xs font-mono text-gray-500">
           <div className="flex gap-4">
             <span>PROTOCOL: GEMINI-2.5-FLASH</span>
             <span>LOAD: {Math.min(messageCount * 20, 100)}%</span>
           </div>
           <span className={isRateLimited ? "text-red-600 animate-pulse font-bold" : "text-green-600"}>
             STATUS: {isRateLimited ? 'OVERHEATED' : 'ONLINE'}
           </span>
        </div>

        {/* Chat Area - Plain text style like IRC */}
        <div className="flex-grow overflow-y-auto p-4 font-mono text-sm space-y-2">
          {messages.map((msg, idx) => (
            <div key={idx} className="break-words leading-relaxed group flex items-start">
              <span className={`font-bold mr-2 whitespace-nowrap ${msg.role === 'user' ? 'text-red-600' : 'text-blue-600'}`}>
                {msg.role === 'user' ? '<GUEST>' : '<NAVI>'}
              </span>
              <span className={`transition-colors ${
                msg.isError 
                  ? 'text-red-600 font-bold bg-red-50 px-1 border border-red-200' 
                  : 'text-gray-800 group-hover:text-black'
              }`}>
                {msg.text}
              </span>
            </div>
          ))}
          {loading && (
             <div className="animate-pulse text-gray-400">
               &lt;SYSTEM&gt; Processing packets...
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-2 bg-white border-t border-gray-300">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <span className="text-red-600 font-bold">&gt;</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow bg-transparent border-none text-black font-mono focus:outline-none focus:ring-0 placeholder-gray-400 disabled:opacity-50"
              placeholder={isRateLimited ? "SYSTEM COOLING DOWN..." : "Enter message..."}
              disabled={isRateLimited || loading}
            />
            <button 
              type="submit" 
              disabled={loading || isRateLimited}
              className="text-xs border border-gray-300 px-3 py-1 text-gray-500 hover:text-black hover:border-black transition-colors uppercase disabled:opacity-50 disabled:hover:border-gray-300"
            >
              Send
            </button>
          </form>
        </div>
      </RetroCard>
    </div>
  );
};