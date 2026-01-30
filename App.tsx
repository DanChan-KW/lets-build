

import React, { useState, useEffect } from 'react';
import { Language, CourseDetails } from './types';
import { translations } from './translations';
import CircularMenu from './components/CircularMenu';
import AIChatBot from './components/AIChatBot';
import FallingBricks from './components/FallingBricks';
import ImageVideoGenerator from './components/ImageVideoGenerator';
import EFQuestionnaire from './components/EFQuestionnaire';

const LazyImage = ({ src, alt }: { src: string, alt: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className="relative group rounded-[32px] overflow-hidden shadow-xl border border-gray-100 bg-gray-50 min-h-[200px]">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
        </div>
      )}
      <img 
        src={src} 
        alt={alt} 
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-auto object-cover transition-all duration-700 group-hover:scale-105 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} 
      />
    </div>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(Language.ZH_HK);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showGoTop, setShowGoTop] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [researchTab, setResearchTab] = useState<'children' | 'sen' | 'adult' | 'team'>('children');
  const [expandedQualIndex, setExpandedQualIndex] = useState<number | null>(null);
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);
  
  // Course Form Modal State
  const [selectedCourseForForm, setSelectedCourseForForm] = useState<CourseDetails | null>(null);
  const [formData, setFormData] = useState({
    salutation: 'Mr.',
    contactName: '',
    date: '',
    sessions: '',
    duration: '',
    pax: '',
    goals: [] as string[],
    budget: '',
    quotation: 'yes',
    phone: '',
    email: '',
    cooperationType: '',
    participationMode: ''
  });

  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      setShowGoTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Safety check for translations to prevent crash
  if (!t || !t.audiences) return <div className="h-screen w-full flex items-center justify-center bg-white text-gray-400 font-medium">Loading resources...</div>;

  const handleLangChange = (l: Language) => setLang(l);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemClick = (id: string) => {
    setActiveSection(id);
  };

  const handleCloseSection = () => {
    setActiveSection(null);
  };

  const handleCourseClick = (details: CourseDetails) => {
    setSelectedCourseForForm(details);
    const isCoopCourse = details.title === t.audiences.ngo.title || details.title === t.audiences.charity.title;
    const isStandaloneCert = details.title === t.certification;
    
    setFormData({
      salutation: t.courseForm.options.salutations[0],
      contactName: '',
      date: '',
      sessions: t.courseForm.options.sessions[0],
      duration: t.courseForm.options.durations[1],
      pax: t.courseForm.options.pax[1],
      goals: [],
      budget: '',
      quotation: 'yes',
      phone: '',
      email: '',
      cooperationType: isCoopCourse ? t.courseForm.options.cooperation[0] : '',
      participationMode: isStandaloneCert ? t.courseForm.options.participation[0] : ''
    });
  };

  const handleFormChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const toggleGoal = (goal: string) => {
    setFormData(prev => {
      if (prev.goals.includes(goal)) {
        return { ...prev, goals: prev.goals.filter(g => g !== goal) };
      }
      return { ...prev, goals: [...prev.goals, goal] };
    });
  };

  const generateMessageBody = () => {
    const isCoop = selectedCourseForForm?.title === t.audiences.ngo.title || selectedCourseForForm?.title === t.audiences.charity.title;
    const isStandaloneCert = selectedCourseForForm?.title === t.certification;
    // For NGO/Charity cooperation courses, if "Certification" is selected, hide some fields
    const isCoopCert = isCoop && formData.cooperationType === t.courseForm.options.cooperation[1];

    let body = `Course: ${selectedCourseForForm?.title}\n`;
    
    if (isStandaloneCert) {
      body += `Participation: ${formData.participationMode}\n`;
    } else if (isCoop) {
      body += `Cooperation Type: ${formData.cooperationType}\n`;
    }

    body += `Name: ${formData.salutation} ${formData.contactName}\n`;

    if (!isStandaloneCert) {
        body += `Date: ${formData.date}\n`;
        
        if (!isCoopCert) {
          body += `Sessions: ${formData.sessions}\n` +
                  `Duration: ${formData.duration}\n`;
        }

        body += `Pax: ${formData.pax}\n`;

        if (!isCoopCert) {
          body += `Goals: ${formData.goals.join(', ')}\n` +
                  `Total Budget: ${formData.budget}\n`;
        }
    }

    body += `Quotation Needed: ${formData.quotation === 'yes' ? t.courseForm.options.yes : t.courseForm.options.no}\n` +
            `Phone: ${formData.phone}\n` +
            `Email: ${formData.email}`;
    
    return body.trim();
  };

  const handleSubmit = () => {
    if (!formData.phone || !formData.email) {
      alert(lang === Language.EN ? "Please fill in Phone and Email." : "請填寫電話及電郵。");
      return;
    }
    const body = encodeURIComponent(generateMessageBody());
    window.open(`https://wa.me/85261103786?text=${body}`, '_blank');
  };

  const AboutUsSection = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
      <div>
         <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-2">{t.buttons.about}</h2>
         <div className="h-2 w-24 bg-red-600 rounded-full" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-6 text-gray-600 leading-relaxed text-base md:text-lg">
          <p className="font-medium text-gray-800">{t.aboutContent.p1}</p>
          <p>{t.aboutContent.p2.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} className="text-blue-600">{part}</strong> : part)}</p>
          <p>{t.aboutContent.p3}</p>
          <p>{t.aboutContent.p4}</p>
          <div className="pt-6 border-t border-gray-100">
            <p className="font-black text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              {t.aboutContent.footer}
            </p>
          </div>
        </div>
        
        <div className="space-y-6">
          <LazyImage 
            src="https://res.cloudinary.com/dhfe4cb7t/image/upload/f_auto,q_auto/v1767767561/Aboutus1.png" 
            alt="About Us Photo 1" 
          />
          <LazyImage 
            src="https://res.cloudinary.com/dhfe4cb7t/image/upload/f_auto,q_auto/v1767767555/About_us_3.png" 
            alt="About Us Photo 2" 
          />
        </div>
      </div>
    </div>
  );

  const ExecutiveFunctionSection = () => (
    <div className="space-y-16 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-2">{t.executiveContent.header}</h2>
          <div className="h-2 w-24 bg-red-600 rounded-full mb-6" />
          <p className="text-gray-600 leading-relaxed max-w-3xl">
            {t.executiveContent.intro}
          </p>
        </div>
        <div className="bg-red-50 p-6 rounded-[32px] border border-red-100 flex items-center gap-4 shadow-sm md:w-[300px]">
           <div className="text-4xl">🧠</div>
           <div className="text-xs font-bold text-red-800 uppercase tracking-wider">
             {lang === Language.EN ? 'The "CEO" of the Brain' : '大腦的行政總裁'}
           </div>
        </div>
      </div>

      <div className="w-full">
        <LazyImage 
          src={lang === Language.EN 
            ? "https://res.cloudinary.com/dhfe4cb7t/image/upload/f_auto,q_auto/v1767771910/EF_4.png" 
            : "https://res.cloudinary.com/dhfe4cb7t/image/upload/f_auto,q_auto/v1767771921/EF_2.png"
          } 
          alt="Executive Function Illustration" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <section className="space-y-4">
          <h3 className="text-2xl font-black text-gray-800 border-l-4 border-red-600 pl-4">
            {t.executiveContent.relationshipTitle}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
            {t.executiveContent.relationshipDesc}
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-black text-gray-800 border-l-4 border-blue-600 pl-4">
            {t.executiveContent.whySixBricksTitle}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
            {t.executiveContent.whySixBricksDesc}
          </p>
        </section>
      </div>

      <section className="space-y-10">
        <div className="flex items-center justify-between">
           <h3 className="text-2xl font-black text-gray-800">{t.executiveContent.skillsTitle}</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.executiveContent.skills.map((skill, i) => (
            <div key={i} className="group p-6 bg-white rounded-[40px] border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col h-full border-b-4" style={{ borderBottomColor: skill.color }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl bg-gray-50 group-hover:scale-110 transition-transform">
                  {skill.icon}
                </div>
                <h4 className="font-black text-gray-800 leading-tight">{skill.title}</h4>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed mb-4 flex-grow">
                {skill.desc}
              </p>
              <div className="bg-gray-50/80 p-4 rounded-2xl text-[11px] italic text-gray-400 group-hover:bg-gray-50 group-hover:text-gray-600 transition-colors">
                 "{skill.example}"
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const ResearchSection = () => {
    const categories = [
      { id: 'children', label: lang === Language.EN ? 'Children' : lang === Language.ZH_HK ? '兒童' : '兒童', icon: '👶', img: 'https://res.cloudinary.com/dhfe4cb7t/image/upload/f_auto,q_auto/v1767767027/Children_2.png' },
      { id: 'sen', label: lang === Language.EN ? 'SEN Students' : lang === Language.ZH_HK ? 'SEN 學生' : 'SEN 学生', icon: '🧠', img: 'https://res.cloudinary.com/dhfe4cb7t/image/upload/f_auto,q_auto/v1767767031/SEN_Student_1.png' },
      { id: 'adult', label: lang === Language.EN ? 'Adults' : lang === Language.ZH_HK ? '成人' : '成人', icon: '👤', img: 'https://res.cloudinary.com/dhfe4cb7t/image/upload/f_auto,q_auto/v1767767031/Adult_1.png' },
      { id: 'team', label: lang === Language.EN ? 'Team Building' : lang === Language.ZH_HK ? '團隊訓練' : '團隊訓練', icon: '🤝', img: 'https://res.cloudinary.com/dhfe4cb7t/image/upload/f_auto,q_auto/v1767767033/Team_Building_1.png' }
    ];

    const currentResearch = t.researchContent[researchTab];

    const StatBar: React.FC<{ label: string, value: number, color: string, max?: number, before?: number, reference?: string }> = ({ label, value, color, max = 100, before, reference }) => (
      <div className="space-y-2 group relative cursor-help">
        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 bg-gray-900/95 backdrop-blur text-white text-xs rounded-2xl p-4 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20 translate-y-2 group-hover:translate-y-0">
           <div className="font-bold text-sm mb-2 text-gray-100 border-b border-gray-700/50 pb-2">{label}</div>
           <div className="grid grid-cols-2 gap-4 mb-3">
              {before !== undefined && (
                <div>
                  <span className="text-gray-500 text-[9px] uppercase font-black tracking-widest block mb-1">Baseline</span>
                  <div className="font-mono text-xl text-gray-300">{before}%</div>
                </div>
              )}
              <div>
                <span className="text-gray-500 text-[9px] uppercase font-black tracking-widest block mb-1">Result</span>
                <div className="font-mono text-xl font-bold" style={{ color: color }}>{value}%</div>
              </div>
           </div>
           {reference && (
             <div className="text-[10px] text-gray-400 bg-gray-800/50 p-2 rounded-lg italic">
               <span className="font-bold not-italic text-gray-500 mr-1">Source:</span> {reference}
             </div>
           )}
           <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900/95" />
        </div>

        {/* Bar Labels */}
        <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-tighter">
          <span>{label}</span>
          <span>{before !== undefined ? `${before}% → ${value}%` : `${value}%`}</span>
        </div>
        
        {/* Bar Graphic */}
        <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden relative shadow-inner">
          {before !== undefined && (
            <div 
              className="absolute h-full bg-gray-300 opacity-50 transition-all duration-1000 ease-out"
              style={{ width: `${(before/max)*100}%`, zIndex: 5 }}
            />
          )}
          <div 
            className="absolute h-full rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${(value/max)*100}%`, backgroundColor: color, zIndex: 10 }}
          />
        </div>
      </div>
    );

    return (
      <div className="space-y-12 animate-in fade-in slide-in-from-top-4 duration-500">
        <div>
           <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-2">{t.buttons.research}</h2>
           <div className="h-2 w-24 bg-blue-600 rounded-full" />
           <p className="mt-4 text-gray-500 font-medium">
             {lang === Language.EN ? 'Evidence-based scientific impact across domains.' : lang === Language.ZH_HK ? '跨領域的循證科學影響分析。' : '跨领域的循证科学影响 analysis。'}
           </p>
        </div>

        <div className="flex flex-wrap gap-2 md:gap-4 p-2 bg-gray-50 rounded-[32px] border border-gray-100">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setResearchTab(cat.id as any)}
              className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-3 px-6 rounded-[24px] font-black text-sm transition-all ${
                researchTab === cat.id ? 'bg-white text-blue-600 shadow-md ring-1 ring-blue-50' : 'text-gray-400 hover:bg-gray-100'
              }`}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <LazyImage 
                src={categories.find(c => c.id === researchTab)?.img || ''} 
                alt={currentResearch.title} 
              />
              
              <div className={`${researchTab === 'team' ? 'bg-indigo-50' : researchTab === 'sen' ? 'bg-green-50' : researchTab === 'adult' ? 'bg-red-50' : 'bg-blue-50'} p-8 rounded-[40px] shadow-sm border border-black/5`}>
                <h4 className="font-black text-gray-800 text-xl text-center mb-6">{currentResearch.statsTitle}</h4>
                <div className="space-y-6">
                  {currentResearch.stats.map((stat, i) => (
                    <StatBar key={i} label={stat.label} value={stat.value} color={stat.color} before={stat.before} reference={stat.reference} />
                  ))}
                </div>
                {researchTab === 'team' && (
                  <div className="flex justify-center gap-6 pt-4">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                      <div className="w-3 h-3 bg-gray-300 rounded-sm" /> {lang === Language.EN ? 'Before' : lang === Language.ZH_HK ? '前' : '前'}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                      <div className="w-3 h-3 bg-indigo-500 rounded-sm" /> {lang === Language.EN ? 'After' : lang === Language.ZH_HK ? '後' : '后'}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-8 text-gray-600 leading-relaxed">
              <h3 className="text-2xl md:text-3xl font-black text-gray-800">{currentResearch.title}</h3>
              <p className="text-gray-500 font-medium italic">{currentResearch.desc}</p>
              
              <div className="grid grid-cols-1 gap-6">
                {currentResearch.items.map((item, i) => (
                  <div key={i} className="group p-6 bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-all">
                    <h4 className={`text-lg font-black mb-2 ${item.color}`}>{item.title}</h4>
                    <p className="text-sm leading-relaxed text-gray-500">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-16 pt-12 border-t border-gray-100">
            <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-8">Literature & Research Support (APA7)</h4>
            <div className="space-y-6">
              {currentResearch.references.map((ref, i) => (
                <p key={i} className="text-[10px] md:text-xs text-gray-500 pl-6 relative leading-relaxed before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-[1px] before:bg-gray-300">
                  {ref}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const WhatIsSection = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-2">{t.buttons.whatIs}</h2>
          <div className="h-2 w-24 bg-yellow-400 rounded-full" />
        </div>
        <p className="text-gray-400 text-xs italic max-w-md">{t.whatIsContent.mainDescription}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 font-black text-xl">1</div>
            <h3 className="text-xl font-black text-gray-800">{t.whatIsContent.secrets.one.title}</h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">{t.whatIsContent.secrets.one.desc}</p>
          <div className="mt-6 flex justify-center">
             <div className="flex -space-x-1">
                <div className="w-8 h-4 bg-[#e60012] rounded-sm" />
                <div className="w-8 h-4 bg-[#0054a6] rounded-sm" />
                <div className="w-8 h-4 bg-[#fff200] rounded-sm" />
                <div className="w-8 h-4 bg-[#00a651] rounded-sm" />
                <div className="w-8 h-4 bg-[#f37021] rounded-sm" />
             </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 font-black text-xl">2</div>
            <h3 className="text-xl font-black text-gray-800">{t.whatIsContent.secrets.two.title}</h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">{t.whatIsContent.secrets.two.desc}</p>
          <div className="mt-6 flex justify-center">
             <span className="text-3xl grayscale opacity-30">🧠</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8">
        <div className="space-y-6">
          <h3 className="text-2xl font-black text-gray-800 border-l-4 border-orange-500 pl-4">{t.whatIsContent.whyDuplo.title}</h3>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">{t.whatIsContent.whyDuplo.desc}</p>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-black text-gray-800 border-l-4 border-blue-500 pl-4">{t.whatIsContent.colorConcept.title}</h3>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">{t.whatIsContent.colorConcept.desc}</p>
          <div className="grid grid-cols-6 gap-2 mt-4">
             {['#e60012', '#f37021', '#fff200', '#00a651', '#0054a6', '#00aeef'].map((c, i) => (
               <div key={i} className="aspect-square rounded-lg shadow-sm" style={{ backgroundColor: c }} />
             ))}
          </div>
          <div className="p-6 bg-blue-50 rounded-[30px] border border-blue-100 italic text-sm text-blue-700">
             "Using light and dark blue helps develop refined language concepts."
          </div>
        </div>
      </div>

      <div className="pt-12 border-t border-gray-100">
        <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">References (APA7)</h4>
        <div className="space-y-4">
          {t.whatIsContent.references.map((ref, i) => (
            <p key={i} className="text-[10px] md:text-xs text-gray-500 pl-6 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-[1px] before:bg-gray-300">
              {ref}
            </p>
          ))}
        </div>
      </div>
    </div>
  );

  const OriginSection = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-top-4 duration-500">
      <div>
        <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-2">{t.buttons.origin}</h2>
        <div className="h-2 w-24 bg-green-600 rounded-full" />
      </div>

      <p className="text-gray-600 text-lg font-medium leading-relaxed italic border-l-4 border-gray-100 pl-6">
        {t.originContent.intro}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {(Object.entries(t.originContent.milestones) as [string, { title: string; desc: string }][]).map(([key, milestone], idx) => (
          <div key={key} className="bg-white p-8 rounded-[40px] border border-gray-50 shadow-sm hover:shadow-md transition-all">
            <span className="text-[10px] font-black text-green-500 uppercase tracking-[0.2em] mb-2 block">Phase 0{idx + 1}</span>
            <h3 className="text-xl font-black text-gray-800 mb-4">{milestone.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{milestone.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-green-50 p-10 rounded-[50px] border border-green-100">
        <h3 className="text-2xl font-black text-green-800 mb-8">{t.originContent.principles.title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.originContent.principles.items.map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-white text-green-600 flex items-center justify-center font-black shrink-0 shadow-sm">{i + 1}</div>
              <p className="text-green-900/70 text-sm font-medium leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-12 border-t border-gray-100">
        <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">References (APA7)</h4>
        <div className="space-y-4">
          {t.originContent.references.map((ref, i) => (
            <p key={i} className="text-[10px] md:text-xs text-gray-500 pl-6 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-[1px] before:bg-gray-300">
              {ref}
            </p>
          ))}
        </div>
      </div>
    </div>
  );

  const PlaySection = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex items-center gap-6">
        <div className="w-16 h-16 bg-orange-50 rounded-3xl flex items-center justify-center text-4xl shadow-sm border border-orange-100">
          📚
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-800 leading-tight">
            {t.playContent.header}
          </h2>
          <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-xs mt-1">
            {t.playContent.subHeader}
          </p>
        </div>
      </div>

      <p className="text-gray-600 text-base md:text-lg leading-relaxed bg-gray-50/50 p-8 rounded-[40px] border border-gray-100">
        {t.playContent.description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {t.playContent.characteristics.map((char, i) => (
          <div 
            key={i} 
            className={`bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all flex h-full ${i === 4 ? 'md:col-span-2 md:max-w-xl md:mx-auto w-full' : ''}`}
          >
            <div className="w-3 shrink-0" style={{ backgroundColor: char.color }} />
            <div className="p-8 flex items-start gap-6">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner shrink-0">
                {char.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-gray-800">{char.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{char.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-12 border-t border-gray-100">
        <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">References (APA7)</h4>
        <div className="space-y-4">
          {t.playContent.references.map((ref, i) => (
            <p key={i} className="text-[10px] md:text-xs text-gray-500 pl-6 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-[1px] before:bg-gray-300">
              {ref}
            </p>
          ))}
        </div>
      </div>
    </div>
  );

  const QualificationsSection = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
      <div>
         <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-2">{t.buttons.qualifications}</h2>
         <div className="h-2 w-24 bg-blue-600 rounded-full" />
      </div>

      <p className="text-gray-500 text-lg">{t.qualificationsContent.header}</p>

      <div className="grid grid-cols-1 gap-6">
        {t.qualificationsContent.items.map((item, index) => {
          const isExpanded = expandedQualIndex === index;
          return (
            <div 
              key={index} 
              onClick={() => setExpandedQualIndex(isExpanded ? null : index)}
              className={`bg-white rounded-3xl p-6 md:p-8 shadow-sm border transition-all group cursor-pointer ${
                isExpanded ? 'border-blue-500 ring-4 ring-blue-50 shadow-md' : 'border-gray-100 hover:border-blue-100'
              }`}
            >
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors">
                  <span className="text-xl group-hover:scale-125 transition-transform">{item.icon}</span>
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-xl md:text-2xl font-black text-gray-800 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <div className={`w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180 bg-blue-50 text-blue-600' : 'text-gray-400'}`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  
                  {isExpanded && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="space-y-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-500/60">{lang === Language.EN ? 'What is this?' : '資歷含義'}</span>
                        <p className="text-gray-600 text-sm leading-relaxed">{item.definition}</p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-green-500/60">{lang === Language.EN ? 'How it helps Six Bricks' : '如何有助推行六色積木'}</span>
                        <p className="text-gray-600 text-sm leading-relaxed italic">{item.benefit}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const CourseCard = ({ details, icon, badge, bgColor, borderColor, btnColor, index }: { details: CourseDetails, icon: string, badge?: string, bgColor: string, borderColor: string, btnColor: string, index: number }) => (
    <div 
      className={`relative p-8 rounded-[40px] border-2 flex flex-col h-full transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:-translate-y-2 group animate-in fade-in slide-in-from-bottom-8 fill-mode-both`}
      style={{ 
        backgroundColor: bgColor, 
        borderColor: borderColor, 
        animationDelay: `${index * 150}ms`
      }}
    >
      {(details.badge || badge) && (
        <div className="absolute top-6 right-6 px-4 py-1.5 rounded-full text-[10px] font-black bg-white/80 backdrop-blur-md text-gray-700 shadow-sm border border-white/50 z-10 uppercase tracking-widest">
          {details.badge || badge}
        </div>
      )}
      <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-4xl shadow-md mb-8 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
        {icon}
      </div>
      <h3 className="text-2xl font-black text-gray-800 mb-4 group-hover:text-blue-600 transition-colors">{details.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-10 flex-grow group-hover:text-gray-700 transition-colors">{details.desc}</p>
      <button 
        onClick={() => handleCourseClick(details)}
        className="w-full py-4 rounded-[20px] border-2 font-black transition-all duration-300 hover:bg-white active:scale-95 text-sm uppercase tracking-wider"
        style={{ borderColor: btnColor, color: btnColor }}
      >
        {lang === Language.EN ? 'View Details' : '查看詳情'}
      </button>
    </div>
  );

  // Derive logic for NGO collaboration view
  const isCoopCourse = selectedCourseForForm?.title === t.audiences.ngo.title || selectedCourseForForm?.title === t.audiences.charity.title;
  const isCertificationMode = isCoopCourse && formData.cooperationType === t.courseForm.options.cooperation[1];
  // Logic for the standalone certification course card
  const isStandaloneCert = selectedCourseForForm?.title === t.certification;

  return (
    <div className="min-h-screen bg-white text-gray-900 relative">
      <FallingBricks />
      
      <style>{`
        @keyframes logo-entrance {
          0% { transform: scale(0.8) translateY(10px); opacity: 0; }
          60% { transform: scale(1.05) translateY(-2px); opacity: 1; }
          80% { transform: scale(0.96); }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        .animate-logo-entrance {
          animation: logo-entrance 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 px-6 py-4 flex justify-between items-center border-b border-gray-50">
        <div className="flex items-center gap-3">
          <img 
            src="https://i.ibb.co/0VrBpcV0/Let-s-Build-Logo-Version-3-1.png" 
            alt="Let's Build Logo" 
            className="h-10 md:h-12 w-auto object-contain animate-logo-entrance"
          />
          <div>
            <h1 className="font-bold text-lg md:text-xl text-gray-800 leading-none">{t.title}</h1>
            <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-tighter mt-1">{t.subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              isChatOpen ? 'bg-blue-600 text-white rotate-12' : 'bg-gray-100 text-gray-500 hover:bg-gray-200 shadow-inner'
            }`}
            title={t.aiHub}
          >
            <span className="text-lg">🤖</span>
          </button>

          <div className="flex bg-gray-100 p-1 rounded-full shadow-inner">
            {Object.values(Language).map((l) => (
              <button
                key={l}
                onClick={() => handleLangChange(l)}
                className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
                  lang === l ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {isChatOpen && (
        <div className="fixed top-24 right-6 z-[60] w-[85vw] md:w-[220px]">
          <AIChatBot t={t} lang={lang} onClose={() => setIsChatOpen(false)} />
        </div>
      )}

      {/* Content Box Overlay (Modal) */}
      {activeSection && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
            onClick={handleCloseSection}
          />
          <div className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-[40px] md:rounded-[60px] shadow-2xl border border-gray-100 overflow-hidden flex flex-col animate-in zoom-in-95 slide-in-from-bottom-8 duration-500">
            <div className="flex justify-end p-6 md:p-8 absolute top-0 right-0 z-50">
              <button 
                onClick={handleCloseSection}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-500 rounded-full font-bold transition-all text-xs md:text-sm group shadow-sm"
              >
                <span>{lang === Language.EN ? 'Return' : lang === Language.ZH_HK ? '返回主頁' : '返回主页'}</span>
                <span className="text-base group-hover:rotate-90 transition-transform duration-300">✕</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 md:p-16 pt-20 md:pt-24 custom-scrollbar">
              {activeSection === 'about' ? (
                <AboutUsSection />
              ) : activeSection === 'whatIs' ? (
                <WhatIsSection />
              ) : activeSection === 'origin' ? (
                <OriginSection />
              ) : activeSection === 'play' ? (
                <PlaySection />
              ) : activeSection === 'qualifications' ? (
                <QualificationsSection />
              ) : activeSection === 'research' ? (
                <ResearchSection />
              ) : activeSection === 'executive' ? (
                <ExecutiveFunctionSection />
              ) : activeSection === 'ai-lab' ? (
                <div className="space-y-8 h-full flex flex-col">
                   <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-2">✨ {lang === Language.EN ? 'Six Bricks AI Innovation Lab' : '六色積木 AI 創新實驗室'}</h2>
                   <div className="flex-1 border-2 border-dashed border-blue-100 rounded-[40px] overflow-hidden bg-white">
                      <ImageVideoGenerator t={translations[lang]} />
                   </div>
                </div>
              ) : (
                <div className="py-12 text-center">
                  <h2 className="text-3xl md:text-4xl font-black text-gray-200 mb-4">
                    {t.buttons[activeSection as keyof typeof t.buttons]}
                  </h2>
                  <p className="text-gray-400 italic">Content coming soon...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Course Inquiry Modal (Inline) */}
      {selectedCourseForForm && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedCourseForForm(null)} />
          <div className="relative bg-white w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-xl font-black text-gray-800">{selectedCourseForForm.title}</h3>
              <button onClick={() => setSelectedCourseForForm(null)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors">✕</button>
            </div>
            
            <div className="overflow-y-auto p-6 custom-scrollbar">
              {/* Course Details */}
              <div className="mb-8 bg-blue-50 p-6 rounded-2xl border border-blue-100">
                 <p className="text-gray-700 text-sm mb-4 leading-relaxed whitespace-pre-line">{selectedCourseForForm.fullDesc}</p>
                 <h4 className="text-xs font-black uppercase text-blue-400 mb-2">Features</h4>
                 <ul className="grid grid-cols-2 gap-2">
                   {selectedCourseForForm.features.map((f, i) => (
                     <li key={i} className="text-xs text-gray-600 flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> {f}
                     </li>
                   ))}
                 </ul>
              </div>

              {/* Inquiry Form */}
              <h4 className="text-lg font-bold text-gray-800 mb-2">{t.courseForm.title}</h4>
              <p className="text-xs text-red-500 font-bold mb-6">{t.courseForm.formInstruction}</p>
              
              <div className="space-y-4">
                {/* 1. Cooperation Mode (Only for NGO/Charity) */}
                {isCoopCourse && (
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">{t.courseForm.cooperationMode}</label>
                    <select 
                      value={formData.cooperationType} 
                      onChange={e => handleFormChange('cooperationType', e.target.value)} 
                      className="w-full p-3 bg-indigo-50 rounded-xl text-sm border border-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-100 outline-none text-indigo-700 font-bold"
                    >
                      {t.courseForm.options.cooperation.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                )}

                {/* 1b. Participation Mode (Only for Standalone Certification) */}
                {isStandaloneCert && (
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">{t.courseForm.participationMode}</label>
                    <select 
                      value={formData.participationMode} 
                      onChange={e => handleFormChange('participationMode', e.target.value)} 
                      className="w-full p-3 bg-indigo-50 rounded-xl text-sm border border-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-100 outline-none text-indigo-700 font-bold"
                    >
                      {t.courseForm.options.participation.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* 1/2. Salutation */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">{t.courseForm.salutation}</label>
                    <select value={formData.salutation} onChange={e => handleFormChange('salutation', e.target.value)} className="w-full p-3 bg-gray-50 rounded-xl text-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-100 outline-none">
                      {t.courseForm.options.salutations.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  {/* 2/3. Contact Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">{t.courseForm.contactName}</label>
                    <input type="text" value={formData.contactName} onChange={e => handleFormChange('contactName', e.target.value)} className="w-full p-3 bg-gray-50 rounded-xl text-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-100" />
                  </div>
                  
                  {/* Fields hidden for standalone certification */}
                  {!isStandaloneCert && (
                    <>
                      {/* 3/4. Date */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">{t.courseForm.date}</label>
                        <input type="date" value={formData.date} onChange={e => handleFormChange('date', e.target.value)} className="w-full p-3 bg-gray-50 rounded-xl text-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-100" />
                      </div>
                      
                      {/* 4/5. Sessions (Hidden if Coop Cert) */}
                      {!isCertificationMode && (
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase">{t.courseForm.sessions}</label>
                          <select value={formData.sessions} onChange={e => handleFormChange('sessions', e.target.value)} className="w-full p-3 bg-gray-50 rounded-xl text-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-100 outline-none">
                            {t.courseForm.options.sessions.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                        </div>
                      )}

                      {/* Duration (Hidden if Coop Cert) */}
                      {!isCertificationMode && (
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase">{t.courseForm.duration}</label>
                          <select value={formData.duration} onChange={e => handleFormChange('duration', e.target.value)} className="w-full p-3 bg-gray-50 rounded-xl text-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-100 outline-none">
                            {t.courseForm.options.durations.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                        </div>
                      )}
                      
                      {/* 5/6. Pax */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">{isCertificationMode ? t.courseForm.paxCertification : t.courseForm.pax}</label>
                        <select value={formData.pax} onChange={e => handleFormChange('pax', e.target.value)} className="w-full p-3 bg-gray-50 rounded-xl text-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-100 outline-none">
                          {(isCertificationMode ? t.courseForm.options.paxCertification : t.courseForm.options.pax).map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                      {/* Goals (Hidden if Coop Cert) */}
                      {!isCertificationMode && (
                        <div className="md:col-span-2 space-y-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase">{t.courseForm.goals}</label>
                          <div className="flex flex-wrap gap-2">
                            {t.courseForm.options.goals.map(goal => (
                              <button 
                                key={goal} 
                                onClick={() => toggleGoal(goal)}
                                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${formData.goals.includes(goal) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-500 border-gray-200 hover:border-blue-300'}`}
                              >
                                {goal}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      {/* Budget (Hidden if Coop Cert) */}
                      {!isCertificationMode && (
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase">{t.courseForm.budget}</label>
                          <input type="text" value={formData.budget} onChange={e => handleFormChange('budget', e.target.value)} className="w-full p-3 bg-gray-50 rounded-xl text-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-100" placeholder="e.g. 5000" />
                        </div>
                      )}
                    </>
                  )}

                  {/* 6/7. Quotation */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">{t.courseForm.quotation}</label>
                    <div className="flex gap-4 pt-2">
                       <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                         <input type="radio" name="quotation" value="yes" checked={formData.quotation === 'yes'} onChange={() => handleFormChange('quotation', 'yes')} className="text-blue-600 focus:ring-blue-500" /> {t.courseForm.options.yes}
                       </label>
                       <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                         <input type="radio" name="quotation" value="no" checked={formData.quotation === 'no'} onChange={() => handleFormChange('quotation', 'no')} className="text-blue-600 focus:ring-blue-500" /> {t.courseForm.options.no}
                       </label>
                    </div>
                  </div>
                  {/* 7/8. Phone */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">{t.courseForm.phone}</label>
                    <input type="tel" value={formData.phone} onChange={e => handleFormChange('phone', e.target.value)} className="w-full p-3 bg-gray-50 rounded-xl text-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-100" />
                  </div>
                  {/* 8/9. Email */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">{t.courseForm.email}</label>
                    <input type="email" value={formData.email} onChange={e => handleFormChange('email', e.target.value)} className="w-full p-3 bg-gray-50 rounded-xl text-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-100" />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button onClick={handleSubmit} className="flex-1 py-3 bg-[#25D366] text-white rounded-xl font-bold hover:bg-[#20bd5a] transition-colors shadow-lg active:scale-95 flex items-center justify-center gap-2">
                  <span>💬</span> {t.courseForm.submitInfoWhatsApp}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-40 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-blue-600 transition-all duration-300 hover:bg-blue-50 hover:-translate-y-1 active:scale-90 ${
          showGoTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Go to Top"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7" />
        </svg>
      </button>

      <div className="pt-24 relative z-10">
        <section className="relative py-20 overflow-hidden">
          <CircularMenu t={t} onItemClick={handleItemClick} activeId={activeSection} />
        </section>

        {/* Executive Skills Questionnaire Section */}
        <section className="max-w-4xl mx-auto px-6 mb-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
          {!isQuestionnaireOpen ? (
            <div className="bg-white rounded-[40px] p-12 text-center shadow-lg border border-gray-100 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <span className="text-5xl mb-6 block transform group-hover:scale-110 transition-transform duration-300">📊</span>
                <h2 className="text-3xl font-black text-gray-800 mb-4">{t.questionnaire.title}</h2>
                <p className="text-gray-500 max-w-lg mx-auto mb-8 leading-relaxed">
                  {t.questionnaire.desc}
                </p>
                <button 
                  onClick={() => setIsQuestionnaireOpen(true)}
                  className="px-10 py-4 bg-gray-900 text-white rounded-full font-bold shadow-xl hover:bg-black hover:scale-105 active:scale-95 transition-all"
                >
                  {t.questionnaire.startBtn}
                </button>
              </div>
            </div>
          ) : (
            <div className="relative">
              <button 
                onClick={() => setIsQuestionnaireOpen(false)}
                className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-gray-400 hover:text-red-500 z-20"
              >
                ✕
              </button>
              <EFQuestionnaire t={t} lang={lang} />
            </div>
          )}
        </section>

        <section className="max-w-7xl mx-auto px-6 py-24 bg-white/80 backdrop-blur-sm rounded-[60px] shadow-sm mb-24 border border-white/20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-3">
              {lang === Language.EN ? 'Course Categories' : lang === Language.ZH_HK ? '課程類別' : '課程類別'}
            </h2>
            <div className="flex justify-center">
              <div className="h-1 w-12 bg-red-500 rounded-l-full" />
              <div className="h-1 w-12 bg-blue-600 rounded-r-full" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <CourseCard 
              index={0}
              details={t.audiences.schools}
              icon="😊"
              bgColor="#fffdf0"
              borderColor="#fbeea0"
              btnColor="#dcb31f"
            />
            <CourseCard 
              index={1}
              details={{
                title: t.certification,
                desc: t.certificationDesc,
                fullDesc: t.certificationFullDesc,
                features: t.certificationFeatures,
              }}
              icon="🎓"
              badge={lang === Language.EN ? "Accredited" : lang === Language.ZH_HK ? "專業、實證、實戰" : "专业、实证、实战"}
              bgColor="#fff7f2"
              borderColor="#ffd9c0"
              btnColor="#f37021"
            />
            <CourseCard 
              index={2}
              details={t.audiences.corporate}
              icon="💼"
              badge={lang === Language.EN ? "Top Choice" : lang === Language.ZH_HK ? "企業首選" : "企業首選"}
              bgColor="#f5faff"
              borderColor="#c7e3ff"
              btnColor="#0054a6"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:px-48">
            <CourseCard 
              index={3}
              details={t.audiences.charity}
              icon="🌱"
              badge={lang === Language.EN ? "Support" : lang === Language.ZH_HK ? "慈善支持" : "慈善支持"}
              bgColor="#f2fff5"
              borderColor="#c6efce"
              btnColor="#00a651"
            />
            <CourseCard 
              index={4}
              details={t.audiences.ngo}
              icon="🤝"
              badge={lang === Language.EN ? "Partnership" : lang === Language.ZH_HK ? "合作夥伴" : "合作夥伴"}
              bgColor="#f2fdff"
              borderColor="#c0f2ff"
              btnColor="#00aeef"
            />
          </div>
        </section>
      </div>

      <footer className="bg-white/90 backdrop-blur-md border-t border-gray-50 py-20 px-6 text-center relative z-20">
        <div className="max-w-7xl mx-auto">
          <img 
            src="https://i.ibb.co/0VrBpcV0/Let-s-Build-Logo-Version-3-1.png" 
            alt="Let's Build Logo" 
            className="h-16 md:h-20 w-auto mx-auto mb-8 object-contain"
          />
          <h2 className="text-xl font-bold text-gray-800">{t.title}</h2>
          <div className="mt-4 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-sm text-gray-500 font-medium">
            <span>📞 +852 6110-3786</span>
            <span className="hidden md:inline text-gray-300">|</span>
            <span>✉️ info@letsbuildhk.com</span>
          </div>
          <div className="flex justify-center gap-6 mt-6">
            <a href="http://wa.me/85261103786" target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:scale-110 transition-transform duration-200">
              <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </div>
          <p className="text-gray-400 text-sm mt-4">© 2025 Let's Build (Hong Kong) Company Limited</p>
        </div>
      </footer>
    </div>
  );
};

export default App;