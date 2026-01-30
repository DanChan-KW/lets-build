
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Translation, Language } from '../types';

interface AIChatBotProps {
  t: Translation;
  lang: Language;
  onClose?: () => void;
}

interface Attachment {
  data: string;
  mimeType: string;
  name: string;
}

const AIChatBot: React.FC<AIChatBotProps> = ({ t, lang, onClose }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string, sources?: { uri: string, title: string }[] }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [attachment, setAttachment] = useState<Attachment | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (limit to 4MB for simple inline data)
    if (file.size > 4 * 1024 * 1024) {
      alert("File is too large. Please select a file under 4MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = (event.target?.result as string).split(',')[1];
      setAttachment({
        data: base64,
        mimeType: file.type,
        name: file.name
      });
    };
    reader.readAsDataURL(file);
    // Reset input value so same file can be selected again
    e.target.value = '';
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSend = async () => {
    if ((!input.trim() && !attachment) || loading) return;
    const userMsg = input;
    const currentAttachment = attachment;
    
    setInput('');
    setAttachment(null);
    setMessages(prev => [...prev, { 
      role: 'user', 
      text: userMsg + (currentAttachment ? ` [Attachment: ${currentAttachment.name}]` : '') 
    }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const targetLanguage = lang === Language.ZH_HK ? 'Traditional Chinese (Hong Kong usage)' : lang === Language.ZH_CN ? 'Simplified Chinese' : 'English';

      const parts: any[] = [{ text: `User asks about Let's Build HK or Six Bricks: ${userMsg}. 
        Context: Let's Build HK is an educational company promoting Six Bricks. 
        Focus on DUPLO 2x4 bricks. Benefits: Play, Executive Function, Skills. 
        Please provide grounded information. 
        IMPORTANT: Respond in ${targetLanguage}.` }];

      if (currentAttachment) {
        parts.push({
          inlineData: {
            data: currentAttachment.data,
            mimeType: currentAttachment.mimeType
          }
        });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts },
        config: {
            systemInstruction: `You are a friendly educational consultant for Let's Build (Hong Kong). Expert in Six Bricks methodology. Use Google Search to verify current educational trends or specific study data if needed. If a document or image is provided, analyze it thoroughly to provide insights relevant to the user's query. Always answer in ${targetLanguage}. Use markdown formatting (bold, bullet points, code blocks) to make your response clear and readable. If the user's query is ambiguous or lacks sufficient detail, kindly ask clarifying questions to ensure you provide the most helpful and accurate information.`,
            tools: [{ googleSearch: {} }]
        }
      });
      
      const aiResponseText = response.text || "I'm sorry, I couldn't generate a response.";
      
      // Extract grounding sources
      const sources: { uri: string, title: string }[] = [];
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        chunks.forEach((chunk: any) => {
          if (chunk.web) {
            sources.push({ uri: chunk.web.uri, title: chunk.web.title });
          }
        });
      }

      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: aiResponseText,
        sources: sources.length > 0 ? sources : undefined 
      }]);
      setLoading(false);

    } catch (error) {
      console.error(error);
      setLoading(false);
      setMessages(prev => [...prev, { role: 'ai', text: "Error connecting to AI service. Please check your network or file compatibility." }]);
    }
  };

  const renderMessageContent = (text: string) => {
    // Split by code blocks
    const segments = text.split(/(```[\s\S]*?```)/g);
    
    return segments.map((segment, index) => {
      if (segment.startsWith('```') && segment.endsWith('```')) {
        // Code Block
        const codeContent = segment.slice(3, -3);
        const codeLines = codeContent.split('\n');
        // If first line is language identifier (no spaces), remove it
        if (codeLines.length > 0 && /^[a-zA-Z]+$/.test(codeLines[0].trim())) {
           codeLines.shift();
        }
        
        return (
          <pre key={index} className="bg-gray-800 text-blue-50 p-3 rounded-lg overflow-x-auto my-2 text-[10px] font-mono shadow-inner border border-gray-700">
            <code>{codeLines.join('\n').trim()}</code>
          </pre>
        );
      } else {
        // Regular Text - Process per line
        const lines = segment.split('\n');
        return (
          <div key={index}>
            {lines.map((line, lineIndex) => {
              if (line.trim() === '') return <div key={lineIndex} className="h-1" />;
              
              // Detect Lists
              const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('* ') || line.trim().startsWith('• ');
              const isNumbered = /^\d+\.\s/.test(line.trim());
              
              let contentStr = line;
              if (isBullet) contentStr = line.trim().substring(2);
              if (isNumbered) contentStr = line.trim().replace(/^\d+\.\s/, '');

              // Parse inline formatting: Bold (**), Inline Code (`)
              // We'll split by ` first, then by **
              const formatInline = (str: string) => {
                const parts = str.split(/(`[^`]+`)/g);
                return parts.map((part, pIdx) => {
                  if (part.startsWith('`') && part.endsWith('`')) {
                    return (
                      <code key={pIdx} className="bg-gray-100 text-pink-600 px-1 py-0.5 rounded text-[10px] font-mono border border-gray-200 mx-0.5">
                        {part.slice(1, -1)}
                      </code>
                    );
                  }
                  
                  // Handle Bold
                  const subParts = part.split(/(\*\*[^*]+\*\*)/g);
                  return subParts.map((sub, sIdx) => {
                    if (sub.startsWith('**') && sub.endsWith('**')) {
                       return <strong key={`${pIdx}-${sIdx}`} className="font-bold">{sub.slice(2, -2)}</strong>;
                    }
                    return sub;
                  });
                });
              };

              return (
                <div key={lineIndex} className={`leading-relaxed ${isBullet || isNumbered ? 'pl-4 relative my-1' : 'my-0.5'}`}>
                   {isBullet && <span className="absolute left-0 text-blue-400 font-bold">•</span>}
                   {isNumbered && <span className="absolute left-0 text-blue-400 font-bold text-[9px] top-0.5">{line.trim().match(/^\d+\./)?.[0]}</span>}
                   <div>{formatInline(contentStr)}</div>
                </div>
              );
            })}
          </div>
        );
      }
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[450px] border border-gray-100 animate-in fade-in zoom-in duration-200 ring-1 ring-black/5">
      {/* Small Header */}
      <div className="bg-blue-600 px-3 py-2 flex items-center justify-between">
         <div className="flex items-center gap-2">
           <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
           <span className="text-[10px] font-bold text-white uppercase tracking-wider">
             {t.aiHub} (Multimodal Support)
           </span>
         </div>
         {onClose && (
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-lg transition-colors text-white">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      
      {/* Compact Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3 bg-gradient-to-b from-gray-50 via-white to-gray-50/30 text-[11px] custom-scrollbar">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-4 px-2">
            <p className="leading-tight">Ask about Six Bricks research or Let's Build HK services! You can also upload images or PDFs for analysis.</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[90%] p-2 rounded-xl shadow-sm group relative ${
              m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
            }`}>
              {renderMessageContent(m.text)}
              
              {m.role === 'ai' && (
                <div className="mt-2 flex justify-end border-t border-gray-50 pt-1">
                  <button 
                    onClick={() => handleCopy(m.text, i)}
                    className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-blue-500 transition-colors flex items-center gap-1"
                    title="Copy response"
                  >
                    {copiedIndex === i ? (
                      <>
                        <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                        <span className="text-[9px] text-green-500 font-medium">Copied</span>
                      </>
                    ) : (
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    )}
                  </button>
                </div>
              )}

              {m.sources && m.sources.length > 0 && (
                <div className="mt-1 pt-2 border-t border-gray-100 space-y-1">
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Sources:</p>
                  {m.sources.slice(0, 3).map((source, idx) => (
                    <a 
                      key={idx} 
                      href={source.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block text-[9px] text-blue-500 hover:underline truncate"
                    >
                      🔗 {source.title || source.uri}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white p-2 rounded-xl border border-gray-100 rounded-tl-none flex gap-1 items-center">
              <span className="text-[9px] text-gray-400 italic mr-1">Analyzing...</span>
              <div className="w-1 h-1 bg-blue-300 rounded-full animate-bounce" />
              <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>

      {/* Attachment Preview Area */}
      {attachment && (
        <div className="px-3 py-1 bg-blue-50 border-t border-blue-100 flex items-center justify-between">
          <div className="flex items-center gap-2 max-w-[80%]">
            <span className="text-[10px]">📎</span>
            <span className="text-[10px] text-blue-700 font-bold truncate">{attachment.name}</span>
          </div>
          <button 
            onClick={() => setAttachment(null)}
            className="text-blue-400 hover:text-red-500 transition-colors"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Mini Input Area */}
      <div className="p-2 bg-white border-t border-gray-100 flex gap-2 items-center">
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*,application/pdf"
          onChange={handleFileChange}
        />
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center transition-all shadow-sm"
          title="Attach Image or PDF"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        </button>
        <input 
          type="text" 
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder={t.chatPlaceholder}
          className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-[11px] focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-400"
        />
        <button 
          onClick={handleSend}
          disabled={(!input.trim() && !attachment) || loading}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            (!input.trim() && !attachment) || loading ? 'bg-gray-100 text-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md active:scale-95'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AIChatBot;
