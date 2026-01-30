
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Translation } from '../types';

interface ImageVideoGeneratorProps {
  t: Translation;
}

const ImageVideoGenerator: React.FC<ImageVideoGeneratorProps> = ({ t }) => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [imageSize, setImageSize] = useState('1K');
  const [loading, setLoading] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Supported values for gemini-3-pro-image-preview
  const aspectRatios = ['1:1', '2:3', '3:2', '3:4', '4:3', '9:16', '16:9', '21:9'];
  const sizes = ['1K', '2K', '4K'];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    const aistudio = window.aistudio

    if (!aistudio) {
      // Non–AI Studio environment (e.g. GitHub Pages)
      console.warn("AI Studio bridge not available")
      return
    }

    const hasKey = await aistudio.hasSelectedApiKey()

    if (!hasKey) {
      await aistudio.openSelectKey()
    }

    setLoading(true);
    setError(null);
    setGeneratedImageUrl(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: {
          parts: [{ text: prompt }]
        },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio as any,
            imageSize: imageSize as any
          }
        }
      });

      let foundImage = false;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            setGeneratedImageUrl(`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`);
            foundImage = true;
            break;
          }
        }
      }

      if (!foundImage) {
        setError("No image generated. Try a different prompt.");
      }
    } catch (err: any) {
      console.error(err);
      if (err.message?.includes("Requested entity was not found")) {
        setError("API Key issue. Please re-select a paid project key.");
        await aistudio.openSelectKey();
      } else {
        setError("Generation failed. Ensure you have a valid paid API key and prompt.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white p-4 space-y-4 overflow-y-auto custom-scrollbar">
      <div className="space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">📸</span>
          <h3 className="font-black text-gray-800 text-sm">Visualizer Studio</h3>
        </div>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={t.imageGen.promptPlaceholder}
          className="w-full p-3 border border-gray-200 rounded-2xl text-[12px] h-24 resize-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 focus:outline-none bg-gray-50/50"
        />
        
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.imageGen.aspectRatio}</label>
            <div className="relative">
              <select 
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-xl text-[11px] bg-white outline-none focus:ring-1 focus:ring-blue-500 appearance-none shadow-sm"
              >
                {aspectRatios.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.imageGen.size}</label>
            <div className="relative">
              <select 
                value={imageSize}
                onChange={(e) => setImageSize(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-xl text-[11px] bg-white outline-none focus:ring-1 focus:ring-blue-500 appearance-none shadow-sm"
              >
                {sizes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          className={`w-full py-3 rounded-2xl font-black text-[12px] transition-all flex items-center justify-center gap-2 shadow-lg ${
            loading || !prompt.trim() ? 'bg-gray-100 text-gray-400 shadow-none' : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:scale-[1.02] active:scale-98'
          }`}
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <><span>🎨</span> {t.imageGen.generate}</>
          )}
        </button>

        <div className="text-[9px] text-gray-400 bg-blue-50/30 p-3 rounded-xl border border-blue-100/50">
          <p className="flex items-center gap-2 mb-1">
            <span className="text-blue-500">💡</span> {t.imageGen.billingInfo}
          </p>
          <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold hover:underline">
            Check Billing Requirements →
          </a>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-xl text-[11px] border border-red-100 font-medium flex items-center gap-2">
          <span>⚠️</span> {error}
        </div>
      )}

      <div className="flex-1 min-h-[200px] border-2 border-dashed border-gray-100 rounded-[32px] flex items-center justify-center overflow-hidden bg-gray-50/30 relative group">
        {generatedImageUrl ? (
          <img src={generatedImageUrl} alt="Generated Visual" className="w-full h-full object-contain animate-in fade-in zoom-in duration-700" />
        ) : (
          <div className="text-center p-8">
             <div className="text-4xl mb-3 opacity-10 group-hover:scale-110 transition-transform">✨</div>
             <p className="text-[11px] text-gray-300 font-medium italic">Describe your vision to see it come to life</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageVideoGenerator;
