
import React, { useState, useEffect, useRef } from 'react';
import { Translation, Language } from '../types';

interface EFQuestionnaireProps {
  t: Translation;
  lang: Language;
}

const EFQuestionnaire: React.FC<EFQuestionnaireProps> = ({ t, lang }) => {
  const [isStarted, setIsStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [answers, setAnswers] = useState<number[]>(new Array(36).fill(0));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const q = t.questionnaire;

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const labels = lang === Language.EN 
    ? { prev: 'Previous', next: 'Next', q: 'Question' }
    : lang === Language.ZH_HK
    ? { prev: '上一題', next: '下一題', q: '題目' }
    : { prev: '上一题', next: '下一题', q: '题目' };

  // Handle rating selection
  const handleRate = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = value;
    setAnswers(newAnswers);
    if (error) setError(null);

    // Auto-advance
    if (currentQuestionIndex < 35) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        handleNextLogic(newAnswers);
      }, 300);
    }
  };

  const handleNextLogic = (currentAnswers: number[]) => {
    if (currentAnswers[currentQuestionIndex] === 0) {
      // Do nothing if not selected (or show error if triggered by button)
      return;
    }
    
    if (currentQuestionIndex < 35) {
      setCurrentQuestionIndex(prev => prev + 1);
      // Small scroll adjustment if needed, but usually fixed height is better for wizard
    } else {
      handleSubmit(currentAnswers);
    }
  };

  const handleNextClick = () => {
    if (answers[currentQuestionIndex] === 0) {
      setError(lang === Language.EN ? "Please select a rating." : "請選擇評分。");
      return;
    }
    handleNextLogic(answers);
  };

  const handlePrevClick = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = (finalAnswers = answers) => {
    if (finalAnswers.includes(0)) {
      setError("Please answer all questions before submitting.");
      return;
    }
    setIsCompleted(true);
  };

  const handleRetest = () => {
    setAnswers(new Array(36).fill(0));
    setCurrentQuestionIndex(0);
    setIsCompleted(false);
    setIsStarted(false);
    setError(null);
  };

  const handleDownload = () => {
    window.open("https://res.cloudinary.com/dhfe4cb7t/image/upload/v1767853602/Executive_Functions_Concept_Explanation.pdf", "_blank");
  };

  // Calculate scores
  const calculateResults = () => {
    const skillScores = q.skills.map((skill, index) => {
      // 3 items per skill. Q1-3=Skill1, Q4-6=Skill2...
      // Adjust for 0-based index
      const startIndex = index * 3;
      const score = answers[startIndex] + answers[startIndex + 1] + answers[startIndex + 2];
      // Get description from executiveContent, assuming same order
      const desc = t.executiveContent.skills[index]?.desc; 
      return { skill, score, desc };
    });

    // Sort by score
    const sorted = [...skillScores].sort((a, b) => b.score - a.score);
    const strengths = sorted.slice(0, 3);
    const weaknesses = sorted.slice(sorted.length - 3, sorted.length).reverse();

    return { skillScores, strengths, weaknesses };
  };

  const renderRatingScale = () => (
    <div className="flex flex-wrap justify-between gap-2 md:gap-4 mt-8">
      <span className="text-xs text-gray-400 w-full mb-2 flex justify-between uppercase tracking-wider font-bold">
        <span>{q.ratingLabel.low}</span>
        <span>{q.ratingLabel.high}</span>
      </span>
      {[1, 2, 3, 4, 5, 6, 7].map((num) => (
        <button
          key={num}
          onClick={() => handleRate(num)}
          className={`w-10 h-10 md:w-14 md:h-14 rounded-2xl border-2 flex items-center justify-center text-lg md:text-xl font-black transition-all duration-200 ${
            answers[currentQuestionIndex] === num
              ? 'bg-blue-600 text-white border-blue-600 scale-110 shadow-lg shadow-blue-200'
              : 'bg-white text-gray-400 border-gray-100 hover:border-blue-200 hover:text-blue-500 hover:bg-blue-50'
          }`}
        >
          {num}
        </button>
      ))}
    </div>
  );

  // View: Instructions
  if (!isStarted) {
    return (
      <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-gray-100 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-gray-800 mb-2">{q.title}</h2>
          <p className="text-sm text-gray-500 uppercase tracking-widest">{q.subtitle}</p>
          <div className="h-1 w-20 bg-blue-500 mx-auto mt-6 rounded-full" />
          <p className="mt-6 text-gray-600 leading-relaxed max-w-2xl mx-auto">{q.desc}</p>
        </div>

        <div className="bg-blue-50/50 rounded-[32px] p-8 mb-10">
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">{q.instructionTitle}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {q.instructions.map((inst) => (
              <div key={inst.step} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white text-blue-600 font-black flex items-center justify-center shrink-0 shadow-sm border border-blue-100">
                  {inst.step}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{inst.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{inst.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {q.disclaimer && (
          <p className="text-xs text-gray-500 mb-8 text-center bg-yellow-50 p-3 rounded-xl border border-yellow-100">
            {q.disclaimer}
          </p>
        )}

        <div className="text-center">
          <button
            onClick={() => setIsStarted(true)}
            className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-bold text-lg shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            {q.startBtn}
          </button>
        </div>
        
        <p className="text-[10px] text-gray-400 mt-12 text-center italic">{q.reference}</p>
      </div>
    );
  }

  // View: Results
  if (isCompleted) {
    const { skillScores, strengths, weaknesses } = calculateResults();
    
    return (
      <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-gray-100 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">
        <div className="text-center mb-10">
          <span className="text-4xl block mb-2">📊</span>
          <h2 className="text-3xl font-black text-gray-800">{q.resultsTitle}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Strengths */}
          <div className="bg-green-50 rounded-[32px] p-8 border border-green-100">
            <h3 className="text-xl font-black text-green-800 mb-6 flex items-center gap-2">
              <span>💪</span> {q.strengthsTitle}
            </h3>
            <div className="space-y-4">
              {strengths.map((s, i) => (
                <div key={i} className="bg-white p-4 rounded-2xl shadow-sm flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-700">{s.skill}</span>
                    {s.desc && (
                      <div className="relative group">
                        <svg className="w-4 h-4 text-gray-400 hover:text-blue-500 cursor-help transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-gray-900 text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl leading-relaxed text-left">
                          {s.desc}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="font-black text-green-600 text-lg">{s.score}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Weaknesses */}
          <div className="bg-orange-50 rounded-[32px] p-8 border border-orange-100">
            <h3 className="text-xl font-black text-orange-800 mb-6 flex items-center gap-2">
              <span>🌱</span> {q.weaknessesTitle}
            </h3>
            <div className="space-y-4">
              {weaknesses.map((s, i) => (
                <div key={i} className="bg-white p-4 rounded-2xl shadow-sm flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-700">{s.skill}</span>
                    {s.desc && (
                      <div className="relative group">
                        <svg className="w-4 h-4 text-gray-400 hover:text-orange-500 cursor-help transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-gray-900 text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl leading-relaxed text-left">
                          {s.desc}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="font-black text-orange-600 text-lg">{s.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Full Chart */}
        <div className="mb-12 overflow-x-auto">
          <div className="min-w-[600px] p-4">
            {skillScores.map((s, i) => (
              <div key={i} className="flex items-center gap-4 mb-3">
                <div className="w-48 text-right text-xs font-bold text-gray-500 shrink-0 truncate">{s.skill}</div>
                <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${(s.score / 21) * 100}%` }} 
                  />
                </div>
                <div className="w-8 text-xs font-bold text-gray-700">{s.score}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button
            onClick={handleDownload}
            className="px-8 py-3 bg-gray-800 text-white rounded-full font-bold shadow-md hover:bg-gray-900 transition-all flex items-center justify-center gap-2"
          >
            <span>📥</span> {q.downloadButton}
          </button>
          <button
            onClick={handleRetest}
            className="px-8 py-3 bg-white text-gray-500 border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition-all"
          >
            {q.retestBtn}
          </button>
        </div>
      </div>
    );
  }

  // View: Questionnaire Wizard
  const progressPercent = ((currentQuestionIndex + 1) / 36) * 100;

  return (
    <div ref={containerRef} className="bg-white rounded-[40px] p-6 md:p-12 shadow-sm border border-gray-100 max-w-4xl mx-auto min-h-[500px] flex flex-col">
      {/* Header & Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-end mb-4">
          <div className="flex items-center gap-3">
             <div className="px-4 py-1 bg-blue-600 text-white rounded-full text-sm font-black tracking-wide">
               {labels.q} {currentQuestionIndex + 1}
             </div>
             <span className="text-gray-300 font-bold text-sm">/ 36</span>
          </div>
        </div>
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
           <div 
             className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
             style={{ width: `${progressPercent}%` }}
           />
        </div>
      </div>

      {/* Question Card */}
      <div className="flex-1 flex flex-col justify-center animate-in fade-in slide-in-from-right-4 duration-300 key={currentQuestionIndex}">
        <p className="text-2xl md:text-3xl text-gray-800 font-bold leading-tight mb-8">
          {q.questions[currentQuestionIndex]}
        </p>
        
        {renderRatingScale()}

        {error && (
          <div className="mt-6 text-red-500 font-bold text-sm bg-red-50 p-3 rounded-xl inline-block">
            ⚠️ {error}
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-12 flex justify-between items-center border-t border-gray-50 pt-8">
        <button
          onClick={handlePrevClick}
          disabled={currentQuestionIndex === 0}
          className={`px-6 py-3 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${
            currentQuestionIndex === 0 
              ? 'opacity-0 pointer-events-none' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <span>←</span> {labels.prev}
        </button>

        <button
          onClick={handleNextClick}
          disabled={answers[currentQuestionIndex] === 0}
          className={`px-8 py-3 rounded-full font-bold text-sm transition-all flex items-center gap-2 shadow-lg ${
            answers[currentQuestionIndex] === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
              : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
          }`}
        >
          {currentQuestionIndex === 35 ? q.submitBtn : labels.next}
          {currentQuestionIndex !== 35 && <span>→</span>}
        </button>
      </div>
    </div>
  );
};

export default EFQuestionnaire;
