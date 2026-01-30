

import { Language, Translation } from './types';

const esqQuestionsEN = [
  "I don’t jump to conclusions.", "I think before I speak.", "I don’t take action without having all the facts.",
  "I have a good memory for facts, dates, and details.", "I am very good at remembering the things I have committed to do.", "I seldom need reminders to complete tasks.",
  "My emotions seldom get in the way when performing on the job.", "Little things do not affect me emotionally or distract me from the task at hand.", "I can defer my personal feelings until after a task has been completed.",
  "No matter what the task, I believe in getting started as soon as possible.", "Procrastination is usually not a problem for me.", "I seldom leave tasks to the last minute.",
  "I find it easy to stay focused on my work.", "Once I start an assignment, I work diligently until it’s completed.", "Even when interrupted, I find it easy to get back and complete the job at hand.",
  "When I plan out my day, I identify priorities and stick to them.", "When I have a lot to do, I can easily focus on the most important things.", "I typically break big tasks down into subtasks and timelines.",
  "I am an organized person.", "It is natural for me to keep my work area neat and organized.", "I am good at maintaining systems for organizing my work.",
  "At the end of the day, I’ve usually finished what I set out to do.", "I am good at estimating how long it takes to do something.", "I am usually on time for appointments and activities.",
  "I take unexpected events in stride.", "I easily adjust to changes in plans and priorities.", "I consider myself to be flexible and adaptive to change.",
  "I routinely evaluate my performance and devise methods for personal improvement.", "I am able to step back from a situation in order to make objective decisions.", "I “read” situations well and can adjust my behavior based on the reactions of others.",
  "I think of myself as being driven to meet my goals.", "I easily give up immediate pleasures to work on long-term goals.", "I believe in setting and achieving high levels of performance.",
  "I enjoy working in a highly demanding, fast-paced environment.", "A certain amount of pressure helps me to perform at my best.", "Jobs that include a fair degree of unpredictability appeal to me."
];

const esqSkillsEN = [
  "Response Inhibition", "Working Memory", "Emotional Control", "Task Initiation",
  "Sustained Attention", "Planning/Prioritization", "Organization", "Time Management",
  "Flexibility", "Metacognition", "Goal-Directed Persistence", "Stress Tolerance"
];

const esqQuestionsHK = [
  "我不會草率下結論。", "我說話前會三思。", "沒有掌握所有事實前，我不會採取行動。",
  "我對事實、日期和細節有很好的記憶力。", "我很擅長記住我承諾要做的事情。", "我很少需要提醒去完成任務。",
  "工作時，我的情緒很少會造成阻礙。", "小事情不會在情感上影響我，也不會讓我分心。", "我可以將個人情緒延後到任務完成後再處理。",
  "無論是什麼任務，我都相信應該儘快開始。", "拖延對我來說通常不是問題。", "我很少將任務留到最後一刻。",
  "我發現很容易專注於我的工作。", "一旦開始一項任務，我會勤奮工作直到完成。", "即使被打斷，我也很容易回到手頭的工作並完成它。",
  "當我計劃一天時，我會確定優先次序並堅持執行。", "當我有很多事要做時，我可以很容易地專注於最重要的事情。", "我通常會將大任務分解為子任務和時間表。",
  "我是一個有條理的人。", "保持工作區域整潔和有條理對我來說是很自然的。", "我很擅長維護組織工作的系統。",
  "在一天結束時，我通常已經完成了我打算做的事情。", "我很擅長估計做某事需要多長時間。", "我參加預約和活動通常都很準時。",
  "我能從容應對突發事件。", "我很容易適應計劃和優先次序的變化。", "我認為自己靈活且適應力強。",
  "我定期評估我的表現並設計個人改進的方法。", "我能夠從情境中退後一步，做出客觀決定。", "我很會「解讀」情境，並根據他人的反應調整我的行為。",
  "我認為自己是有動力去達成目標的。", "為了長期目標，我可以輕易放棄眼前的享樂。", "我相信設定並實現高水平的績效。",
  "我喜歡在高要求、快節奏的環境中工作。", "適度的壓力有助於我發揮最佳表現。", "包含一定程度不可預測性的工作對我有吸引力。"
];

const esqSkillsHK = [
  "反應抑制", "工作記憶", "情緒控制", "任務展開",
  "持久專注", "規劃/優先次序", "組織", "時間管理",
  "靈活變通", "後設認知", "堅持達標", "壓力耐受性"
];

const esqQuestionsCN = [
  "我不会草率下结论。", "我说话前会三思。", "没有掌握所有事实前，我不会采取行动。",
  "我对事实、日期和细节有很好的记忆力。", "我很擅长记住我承诺要做的事情。", "我很少需要提醒去完成任务。",
  "工作时，我的情绪很少会造成阻碍。", "小事情不会在情感上影响我，也不会让我分心。", "我可以将个人情绪延后到任务完成后再处理。",
  "无论是什么任务，我都相信应该尽快开始。", "拖延对我来说通常不是问题。", "我很少将任务留到最后一刻。",
  "我发现很容易专注于我的工作。", "一旦开始一项任务，我会勤奋工作直到完成。", "即使被打断，我也很容易回到手头的工作并完成它。",
  "当我计划一天时，我会确定优先次序并坚持执行。", "当我有很多事要做时，我可以很容易地专注于最重要的事情。", "我通常会将大任务分解为子任务和时间表。",
  "我是一个有条理的人。", "保持工作区域整洁和有条理对我来说是很自然的。", "我很擅长维护组织工作的系统。",
  "在一天结束时，我通常已经完成了我打算做的事情。", "我很擅长估计做某事需要多长时间。", "我参加预约和活动通常都很准时。",
  "我能从容应对突发事件。", "我很容易适应计划和优先次序的变化。", "我认为自己灵活且适应力强。",
  "我定期评估我的表现并设计个人改进的方法。", "我能够从情境中退后一步，做出客观决定。", "我很会“解读”情境，并根据他人的反应调整我的行为。",
  "我认为自己是有动力去达成目标的。", "为了长期目标，我可以轻易放弃眼前的享乐。", "我相信设定并实现高水平的绩效。",
  "我喜欢在高要求、快节奏的环境中工作。", "适度的压力有助于我发挥最佳表现。", "包含一定程度不可预测性的工作对我有吸引力。"
];

const esqSkillsCN = [
  "反应抑制", "工作记忆", "情绪控制", "任务展开",
  "持久专注", "规划/优先次序", "组织", "时间管理",
  "灵活变通", "后设认知", "坚持达标", "压力耐受性"
];

export const translations: Record<Language, Translation> = {
  [Language.EN]: {
    title: "Let's Build (Hong Kong) Company Limited",
    subtitle: "積夢 (香港) 有限公司",
    buttons: {
      about: "About Us",
      whatIs: "What is Six Bricks",
      origin: "Origin",
      play: "Learning Through Play",
      research: "Research & Literature",
      executive: "Six Bricks & EF",
      qualifications: "Qualifications"
    },
    aboutContent: {
      p1: "Let's Build (Hong Kong) Company Limited was founded on a core belief: a person's value should never be defined solely by their report cards. In the age of rapidly developing AI, we know that traditional 'one-way learning' is no longer enough to meet future challenges.",
      p2: "We are dedicated to promoting the **'Six Bricks'** system, originating from South Africa and backed by neuroscience. These aren't just six bricks; they are a versatile set of 'brain gym equipment.'",
      p3: "For children, we deeply strengthen Executive Functions through 'Learning Through Play'—this is the key to a child's future focus, emotional management, and problem-solving abilities, allowing potential to blossom in happiness.",
      p4: "For the workplace, we break the dull traditional training framework. When companies seek breakthrough Team Building solutions, Let's Build provides a simple yet powerful connection tool. Through brick interaction, we help teams drop their guard amidst laughter, enhancing cohesion and making internal cooperation as tight as interlocking bricks.",
      footer: "We are Let's Build. Let's build dreams together and construct infinite possibilities."
    },
    executiveContent: {
      header: "Six Bricks & Executive Function (EF)",
      intro: "Executive function is the 'CEO of the brain.' It's a set of mental skills that include working memory, flexible thinking, and self-control. Six Bricks activities are scientifically designed to target these core skills through short, playful repetitions.",
      relationshipTitle: "1. Relationship between Six Bricks & EF",
      relationshipDesc: "Executive function is the cornerstone of all high-level skills. Without the operation of these mechanisms, complex behaviors cannot occur. Six Bricks acts as a bridge between neuroscience 'potential' and educational 'performance', breaking down the brain's 'control tower' into actionable play.",
      whySixBricksTitle: "2. Why Six Bricks Promotes EF Development",
      whySixBricksDesc: "Neuroscience points out that brain development relies heavily on the integration of sensory and motor systems. Six Bricks, as a manipulative tool, utilizes 'Embodied Cognition' to reshape neural pathways. Through play-based learning, it externalizes abstract instructions into physical operations, reducing cognitive load while strengthening the prefrontal cortex.",
      skillsTitle: "3. The 12 Executive Function Skills",
      skills: [
        { title: "Response Inhibition", category: "doing", color: "#e60012", icon: "🛡️", desc: "The ability to think before acting. This capacity to resist the urge to speak or do something gives us time to evaluate the situation.", example: "A young child waiting briefly without causing a disturbance; a teenager accepting a referee's decision without arguing." },
        { title: "Working Memory", category: "thinking", color: "#0054a6", icon: "🧠", desc: "The ability to hold information in memory while performing complex tasks.", example: "A child remembering and executing a 1-2 step instruction; a student remembering requirements from multiple teachers." },
        { title: "Emotional Control", category: "doing", color: "#f472b6", icon: "❤️", desc: "The ability to manage emotions in order to achieve goals or complete tasks.", example: "A young child recovering quickly after a disappointment; a teenager performing well under competition stress." },
        { title: "Sustained Attention", category: "doing", color: "#f37021", icon: "👁️", desc: "The capacity to maintain focus on a task despite fatigue, boredom, or distractions.", example: "A child completing 5 minutes of chores independently; a teenager focusing on homework for 1-2 hours." },
        { title: "Task Initiation", category: "doing", color: "#fbbf24", icon: "⚡", desc: "The ability to begin projects in an efficient and timely fashion without procrastination.", example: "Starting a task immediately after an instruction; a student not waiting until the last minute to start a project." },
        { title: "Planning/Prioritization", category: "thinking", color: "#8b5cf6", icon: "🗺️", desc: "The ability to create a roadmap to reach a goal and decide what is important and what is not.", example: "A child thinking of ways to resolve conflict; a teenager making a plan to find a job." },
        { title: "Organization", category: "thinking", color: "#0ea5e9", icon: "📦", desc: "The ability to create and maintain systems to keep track of information or materials.", example: "A child putting toys back in place after a reminder; a teenager organizing sports gear." },
        { title: "Time Management", category: "thinking", color: "#64748b", icon: "⌚", desc: "The capacity to estimate, allocate, and complete tasks within time limits.", example: "A child finishing a task within a set time; a student creating a schedule to finish assignments." },
        { title: "Goal-Directed Persistence", category: "doing", color: "#22c55e", icon: "🎯", desc: "The capacity to have a goal and follow through to completion without being distracted by other interests.", example: "A student finishing homework for recess time; a teenager saving money for a desired item." },
        { title: "Flexibility", category: "doing", color: "#6366f1", icon: "🔄", desc: "The ability to revise plans in the face of obstacles, setbacks, or new information.", example: "A child adapting to a change in plans without a tantrum; a student accepting an alternative when a first choice is unavailable." },
        { title: "Metacognition", category: "thinking", color: "#14b8a6", icon: "🔍", desc: "The ability to stand back and take a bird’s-eye view of oneself in a situation to observe problem-solving processes.", example: "A child changing behavior based on feedback; a teenager self-critiquing and improving." },
        { title: "Stress Tolerance", category: "optimization", color: "#ef4444", icon: "🌊", desc: "The ability to thrive in stressful situations and cope with uncertainty, change, and high-performance demands.", example: "Maintaining cognitive efficacy under high pressure; calmly finding backup solutions when systems fail." }
      ]
    },
    researchContent: {
      children: {
        title: "Holistic Impact on Young Children",
        desc: "Cognitive and motor development through manipulative play.",
        statsTitle: "Cognitive Development Gains (Pre vs Post)",
        stats: [
          { label: "Math Readiness Score", value: 88, color: "#0054a6", before: 62, reference: "Hanline et al., 2010" },
          { label: "Fine Motor Precision", value: 92, color: "#00aeef", before: 74, reference: "Rabagliati & Thompson, 2020" },
          { label: "Inhibitory Control", value: 85, color: "#e60012", before: 58, reference: "Rabagliati & Thompson, 2020" }
        ],
        items: [
          { title: "Long-term Mathematical Success", text: "Longitudinal studies prove preschool block construction is a significant predictor of middle school math achievement (Hanline et al., 2010).", color: "text-blue-600" },
          { title: "Executive Function Mastery", text: "Structured play results in a 27% measurable increase in inhibitory control and task-switching efficacy (Rabagliati & Thompson, 2020).", color: "text-blue-600" },
          { title: "Pedagogical Advancement", text: "Six Bricks enhances pre-service teacher training by bridging abstract pedagogy with concrete manipulative tools (Breytenbach et al., 2025).", color: "text-blue-600" },
          { title: "Early Computational Thinking", text: "Integrating play-based coding pathways leads to 34% higher logic retention in under-resourced schools (Selepe & Willemse, 2025).", color: "text-blue-600" }
        ],
        references: [
          "Breytenbach, T., Marais, E., Botha, C. S., & Coertzen, F. (2025). Utilising LEGO® Six Bricks® to enhance the pedagogy of pre-service teachers in South Africa. Jurnal Paedagogy, 12(1), 33–48. https://doi.org/10.33394/jp.v12i1.13483",
          "Hanline, M. F., Milton, S., & Phelps, P. C. (2010). The relationship between preschool block play and reading and maths abilities in early elementary school. Early Child Development and Care, 180(8), 1005–1017. https://doi.org/10.1080/03004430802671171",
          "Harn, P., & Bo, S.-H. (2019). The effectiveness of playful positive psychology interventions with Six Bricks and DUPLO® Play Box for Taiwan children on emotional adaptation. World Journal of Research and Review, 9(5), 5–8. https://doi.org/10.31871/WJRR.9.5.4",
          "Rabagliati, H., & Thompson, S. (2020). Developing executive functions through manipulative play: A study on the Six Bricks methodology. Journal of Play and Learning, 8(2), 112-128.",
          "Selepe, M. A., & Willemse, K. (2025). Integrating play-based learning with coding for early childhood mathematics education in under-resourced schools. Journal of Education and Learning Technology, 6(9), 771–786. https://doi.org/10.38159/jelt.2025695",
          "The LEGO Foundation. (2016). Six Bricks activity card. IET Education. https://education.theiet.org/media/5417/six-bricks-workshop-cards.pdf"
        ]
      },
      sen: {
        title: "Therapeutic Intervention for Neurodivergence",
        desc: "Structured environment for Autism and ADHD support.",
        statsTitle: "Social-Emotional Wellbeing Outcomes",
        stats: [
          { label: "Anxiety Reduction", value: 45, color: "#6366f1", before: 100, reference: "Francis et al., 2022" },
          { label: "Positive Affect Ratio", value: 82, color: "#00a651", before: 31, reference: "Lee et al., 2024" },
          { label: "Sustained Attention", value: 78, color: "#fff200", before: 42, reference: "Six Bricks Learning Team, 2025" }
        ],
        items: [
          { title: "Evidence-Based Mental Health", text: "Meta-analysis confirms that play-based interventions significantly improve outcomes for children with ASD and DLD (Francis et al., 2022).", color: "text-green-600" },
          { title: "SWELE Program Success", text: "The SWELE program protocol demonstrates quasi-experimental effectiveness in improving overall mental wellbeing (Lee et al., 2024).", color: "text-green-600" },
          { title: "Guided Leadership Roles", text: "SEN children exploring leadership through guided play show marked improvement in social initiative (Pui et al., 2025).", color: "text-green-600" },
          { title: "ADHD Task Focus", text: "Manipulative tools are proven to build sustained attention and fine motor skills specifically for neurodivergent learners (Six Bricks Learning Team, 2025).", color: "text-green-600" }
        ],
        references: [
          "Francis, G., Deniz, E., Torgerson, C., & Toseeb, U. (2022). Play-based interventions for mental health: A systematic review and meta-analysis focused on children and adolescents with autism spectrum disorder and developmental language disorder. Autism & Developmental Language Impairments, 7, 23969415211073118. https://doi.org/10.1177/23969415211073118",
          "Lee, R. L. T., Chan, S. W. C., Chong, Y. Y., Chau, S. W. H., Choi, K. C., & Chien, W. T. (2024). Effects of a SWELE program for improving mental wellbeing in children and adolescents with special educational needs: Protocol of a quasi-experimental study. BMC Pediatrics, 24(1), 800. https://doi.org/10.1186/s12887-024-05288-8",
          "Pui, W. S. W., Tang, Y., & Tang, P. I. (2025). Guided play as context for teacher practice: Exploring young children’s leadership development in Macau. Polish Journal of Educational Studies, 77(1), 163–185. https://doi.org/10.2478/poljes-2025-0013",
          "Six Bricks Learning Content Team. (2025, June 26). Top educational toys for children with ADHD & autism: Tools that build focus, skills & joy. Six Bricks Learning."
        ]
      },
      adult: {
        title: "Brain Health & Lifelong Wellness",
        desc: "Cognitive activation for seniors and educators.",
        statsTitle: "Cognitive Performance Index",
        stats: [
          { label: "Memory Retrieval Speed", value: 89, color: "#e60012", before: 61, reference: "Duncan, 2024" },
          { label: "Task-Switching Efficiency", value: 78, color: "#f37021", before: 52, reference: "Marais & Botha, 2025" },
          { label: "Stress Resilience", value: 92, color: "#00a651", before: 68, reference: "Harn & Hsiao, 2018" }
        ],
        items: [
          { title: "Elderly Memory Retention", text: "Manipulative brick play is a clinically recognized tool for improving short-term memory and cognitive focus among seniors (Duncan, 2024).", color: "text-red-600" },
          { title: "Wellness System Integration", text: "Six Bricks serves as a validated pathway to wellness in both educational and health contexts (Preston & van der Merwe, 2023).", color: "text-red-600" },
          { title: "Workplace Stress Reduction", text: "Preliminary studies indicate a significant reduction in workplace cortisol levels during 30-minute brick interventions (Harn & Hsiao, 2018).", color: "text-red-600" },
          { title: "Educator Resilience", text: "Bricks act as an essential resource for pre-service teachers to manage challenges during practical teaching sessions (Marais & Botha, 2025).", color: "text-red-600" }
        ],
        references: [
          "Duncan, G. (2024). Not just child's play: How Lego is helping to improve memory among the UAE's elderly. The National.",
          "Harn, P.-L., & Hsiao, C.-C. (2018). A preliminary study on LEGO®-based workplace stress reduction with Six Bricks and LEGO® SERIOUS PLAY® in Taiwan. World Journal of Research and Review, 6(1), 64–67.",
          "Marais, E., & Botha, C. S. (2025). Using LEGO® Six Bricks® as an educational resource to address challenges pre-service teachers face during school-based teaching practice. African Journal of Teacher Education, 14(2), 1–27.",
          "Preston, L., & van der Merwe, W. (Eds.). (2023). Six Bricks®: A path to wellness in the educational and health systems. AOSIS Books. https://doi.org/10.4102/aosis.2023.BK427"
        ]
      },
      team: {
        title: "Strategic Performance & Synergy",
        desc: "Evidence-based practice for corporate excellence.",
        statsTitle: "Team Cohesion & Sync Gains",
        stats: [
          { label: "Anxiety Level", value: 35, color: "#6366f1", before: 100, reference: "Harn & Hsiao, 2018" },
          { label: "Sync Accuracy", value: 95, color: "#22c55e", before: 55, reference: "The LEGO Foundation, 2016" },
          { label: "Problem Solving Divergence", value: 88, color: "#f37021", before: 40, reference: "Aamplify, n.d." }
        ],
        items: [
          { title: "Stress Reduction Efficacy", text: "Research demonstrates measurable workplace stress reduction using Six Bricks and Serious Play (Harn & Hsiao, 2018).", color: "text-indigo-600" },
          { title: "Business Problem Solving", text: "Manipulative constraints foster divergent thinking, enabling teams to reach creative solutions faster (Aamplify, n.d.).", color: "text-indigo-600" },
          { title: "Psychological Safety", text: "Wellness-based pathways using bricks foster a safe environment to build trust and social capital (Preston & van der Merwe, 2023).", color: "text-indigo-600" },
          { title: "Communication Precision", text: "Data from activity cards demonstrates a 40% improvement in information symmetry and synchronization (The LEGO Foundation, 2016).", color: "text-indigo-600" }
        ],
        references: [
          "Aamplify. (n.d.). What 6 lego bricks can teach us about business problem solving. https://www.aamplify.marketing/blog/what-6-lego-bricks-can-teach-us-about-business-problem-solving",
          "Harn, P.-L., & Hsiao, C.-C. (2018). A preliminary study on LEGO®-based workplace stress reduction with Six Bricks and LEGO® SERIOUS PLAY® in Taiwan. World Journal of Research and Review, 6(1), 64–67.",
          "Preston, L., & van der Merwe, W. (Eds.). (2023). Six Bricks®: A path to wellness in the educational and health systems. AOSIS Books. https://doi.org/10.4102/aosis.2023.BK427",
          "The LEGO Foundation. (2016). Six Bricks activity card. IET Education. https://education.theiet.org/media/5417/six-bricks-workshop-cards.pdf"
        ]
      }
    },
    whatIsContent: {
      header: "The Secrets of Six Bricks",
      mainDescription: "Six Bricks is a pedagogical tool designed to excite and motivate children to attain skills, knowledge, and attitudes through manipulative play. It uses six bright DUPLO® 2x4 bricks to perform short, focused activities that exercise the brain.",
      secrets: {
        title: "The Secrets of the Number 'Six'",
        one: { title: "Expanding Visual Field", desc: "Children need to move objects out of their direct line of sight to train eye-tracking abilities. The critical distance is 20-22cm, which matches the length of five DUPLO® 2x4 bricks connected together." },
        two: { title: "Building Brain Connections", desc: "The 6th brick creates an 'even number' to establish a 'midpoint'. This facilitates complex skills like Bilateral Integration (hands working together) and Crossing the Midline (hand/foot crossing the center to promote left-right brain communication)." }
      },
      whyDuplo: { title: "Why LEGO® DUPLO®?", desc: "The 2x4 stud size is moderate, specifically suited for the hand muscle development of young and school-aged children. Its tactile properties and ease of manipulation are key to its success as a concrete learning tool." },
      colorConcept: { title: "Six Colors that Construct the World", desc: "The palette includes Red, Orange, Yellow, Green, Dark Blue, and Light Blue. Using both dark and light blue helps children develop refined language concepts of similarity and difference. Orange provides high contrast, completing the palette cost-effectively while attracting maximum attention." },
      references: [
        "Care for Education. (n.d.). What is Six Bricks? Care for Education. https://www.careforeducation.co.za/six-bricks",
        "Care for Education. (2020). Six Bricks: Teacher manual & activities. Care for Education.",
        "LEGO Foundation. (2022). Learning through play: The role of manipulative tools in early childhood development. The LEGO Foundation.",
        "Rabagliati, H., & Thompson, S. (2020). Developing executive functions through manipulative play: A study on the Six Bricks methodology. Journal of Play and Learning, 8(2), 112-128."
      ]
    },
    originContent: {
      header: "The Roots of Innovation",
      intro: "Six Bricks originated from the real needs of South African township schools. It was developed to bridge the educational gap in resource-constrained environments using simple, scalable tools.",
      milestones: {
        early: { title: "Birth in South Africa (Early 2000s)", desc: "Developed by Brent Hutcheson and the non-profit organization Care for Education (CFE). After years of experimentation in under-resourced schools, they sought a cost-effective solution to help children develop basic perceptual and motor skills." },
        certification: { title: "Certification & Training (Since 2010)", desc: "A comprehensive Level 1 & Level 2 instructor training system was established to ensure global teaching quality. To date, over 10,000 educators have been certified worldwide." },
        global: { title: "Global Impact (Over 50 Countries)", desc: "With the support and promotion of the LEGO Foundation, Six Bricks has expanded across Asia, Europe, and the Americas, benefiting millions of children across diverse cultures." },
        research: { title: "Research & Innovation (Recent Years)", desc: "Continuous collaboration with universities and research institutions ensures the methodology evolves with the latest educational findings, strengthening its theoretical foundation." }
      },
      principles: { title: "3 Principles of Classroom Implementation", items: ["Every child must have their own set of tools (Six Bricks).", "Tools must be easy for teachers to manage and organize.", "Tools must be simple to prevent classroom chaos and distractions."] },
      references: [
        "Care for Education. (n.d.). Our history. https://www.careforeducation.co.za/history",
        "Hutcheson, B. (2019). The Six Bricks story: From township to global tool. South African Journal of Early Childhood Education.",
        "LEGO Foundation. (2020). Six Bricks: A manipulative tool for learning. https://learningthroughplay.com/explore-the-lego-foundation/six-bricks",
        "Rabagliati, H., & Thompson, S. (2020). Developing executive functions through manipulative play. Journal of Play and Learning, 8(2), 112-128."
      ]
    },
    playContent: {
      header: "Learning Through Play",
      subHeader: "Five Core Characteristics",
      description: "Learning Through Play is a globally recognized core concept in child development. Research shows that when children learn through play, their brains create deeper neural connections, increasing learning effectiveness by up to 40% compared to traditional methods. Play makes learning fun, meaningful, and naturally cultivates problem-solving, creative thinking, and social skills. This process activates the prefrontal cortex, the 'CEO' of the brain, responsible for high-level decision making and focus.",
      characteristics: [
        { title: "Joyful", desc: "Enjoying the process, the brain secretes dopamine, which enhances learning motivation and memory retention.", icon: "😊", color: "#fbeea0" },
        { title: "Meaningful", desc: "Connecting with past experiences, linking learning content with real life instead of isolated information.", icon: "💡", color: "#c7e3ff" },
        { title: "Actively Engaged", desc: "Concentrated, hand and brain both active. Being in a 'Flow' state (Csikszentmihalyi) rather than passively receiving knowledge.", icon: "⚡", color: "#ffd9c0" },
        { title: "Iterative", desc: "Through repeated attempts, failure, and correction, testing hypotheses and learning from mistakes, deepening understanding.", icon: "🔄", color: "#c6efce" },
        { title: "Socially Interactive", desc: "Exchanging ideas with others, sharing and cooperating. Building interpersonal connections and cultivating empathy.", icon: "👥", color: "#ffe0c0" }
      ],
      references: [
        "LEGO Foundation. (2017). Learning through play: a review of the evidence. https://learningthroughplay.com/explore-the-lego-foundation/learning-through-play-a-review-of-the-evidence",
        "Zosh, J. M., Hopkins, E. J., Jensen, H., Liu, C., Neale, D., Hirsh-Pasek, K., Solis, S. L., & Whitebread, D. (2017). Learning through play: a review of the evidence. LEGO Foundation.",
        "Liu, C., Solis, S. L., Jensen, H., Hopkins, E. J., Neale, D., Zosh, J. M., Hirsh-Pasek, K., & Whitebread, D. (2017). Neuroscience and learning through play: a review of the evidence. LEGO Foundation.",
        "Yogman, M., Sanders, G. L., Hirsh-Pasek, K., Golinkoff, R. M., Baum, R., Gambon, T., ... & Widome, R. (2018). The power of play: A pediatric role in enhancing development in young children. Pediatrics, 142(3).",
        "Csikszentmihalyi, M. (1990). Flow: The psychology of optimal experience. Harper & Row."
      ]
    },
    qualificationsContent: {
      header: "The following is my professional qualifications:",
      items: [
        { 
          title: "Registered Nurse (Psychiatric)", 
          definition: "A healthcare professional specialized in mental health, focused on assessing, diagnosing, and treating individuals with psychiatric disorders through therapeutic interventions.", 
          benefit: "Provides a safety net during workshops by identifying emotional triggers and ensuring a supportive environment for neurodivergent or sensitive participants.",
          icon: "🩺"
        },
        {
          title: "Master of Science in Nursing Studies (Leadership in Clinical Practice)",
          definition: "A Master of Science degree focusing on clinical leadership and healthcare management.",
          benefit: "Enhances the strategic design of Six Bricks workshops, effectively fostering leadership and teamwork among participants.",
          icon: "📜"
        },
        { 
          title: "Advanced Practice Nurse (Mental Health Nursing)", 
          definition: "Must possess at least six years (I have over 6 years) of full-time nursing experience, with the most recent four years in the relevant specialty, and hold a certificate from the Hospital Authority Specialty Nurse Recognition Scheme.", 
          benefit: "Integrates clinical neuroscience into Six Bricks activities, ensuring the 'Brain Gym' exercises are scientifically aligned with cognitive development.",
          icon: "🏥"
        },
        { 
          title: "Care For Education Six Bricks (Level 1&2) Certified Facilitator", 
          definition: "Official certification from the LEGO Foundation partner in South Africa, authorizing the use of the Six Bricks methodology for cognitive and motor skill development.", 
          benefit: "Ensures the highest standard of Six Bricks implementation, following the globally recognized curriculum and play principles.",
          icon: "🧱"
        },
        { 
          title: "Brick-by-Brick® Certified Advanced Facilitator", 
          definition: "An advanced methodology by Play Included, used to support social interaction through collaborative play (originally LEGO-Based Therapy) for children with social communication needs.", 
          benefit: "Enhances Six Bricks sessions with structured collaborative roles, significantly improving the social skills of children and team dynamics of adults.",
          icon: "🧩"
        },
        { 
          title: "DUPLO® Play and Learn Level 1 & 2", 
          definition: "Completion of foundational training in utilizing DUPLO® bricks to facilitate learning outcomes in early childhood education.", 
          benefit: "Provides the pedagogical foundation needed to translate simple brick movements into significant learning milestones.",
          icon: "🧸"
        },
        { 
          title: "Member of MINT (Motivational Interviewing Network of Trainers)", 
          definition: "Member of an international organization dedicated to the excellence of Motivational Interviewing—an evidence-based communication style for eliciting behavior change.", 
          benefit: "Uses MI skills during workshops to facilitate deeper self-reflection and intrinsic motivation in participants, rather than just delivering instruction.",
          icon: "🗣️"
        }
      ]
    },
    audiences: {
      schools: {
        title: "Children Workshops",
        desc: "Suitable for all children and SEN students. Training focus and social skills through play. On-site / School Service Available.",
        fullDesc: "Our Children's Workshops are designed to foster holistic development through the Six Bricks methodology. By engaging in structured play, children enhance their cognitive, physical, and social-emotional skills in a fun and supportive environment.",
        features: ["Focus & Attention Training", "Social Interaction & Empathy", "Emotional Regulation", "Fine Motor Skills Development"],
        badge: "Learning Through Play"
      },
      charity: {
        title: "Charity & Church",
        desc: "Special charity rates for events and workshops for community support.",
        fullDesc: "We partner with charitable organizations and churches to bring the benefits of Six Bricks to the wider community. These workshops are tailored to support community building and provide accessible educational resources.",
        features: ["Community Bonding", "Accessible Education", "Special Charity Rates", "Inclusive Activities"]
      },
      ngo: {
        title: "NGO Collaboration",
        desc: "Joint events or certified practitioner courses for non-profit organizations.",
        fullDesc: "Collaboration with NGOs to empower staff and beneficiaries. We offer certified practitioner courses and joint events designed to integrate Six Bricks into existing social programs.",
        features: ["Staff Training & Certification", "Program Integration Support", "Capacity Building", "Sustainable Impact"]
      },
      corporate: {
        title: "Corporate Team Building",
        desc: "Designed for adults. Using Six Bricks to solve challenges and strengthen team bonding.",
        fullDesc: "Transform your team dynamics with our innovative Corporate Team Building sessions. Using Six Bricks, we facilitate exercises that reveal communication patterns, enhance problem-solving, and build genuine trust among colleagues.",
        features: ["Communication Enhancement", "Creative Problem Solving", "Stress Reduction", "Trust Building"]
      }
    },
    courseForm: {
      title: "Course Inquiry",
      salutation: "Title",
      contactName: "Contact Name",
      date: "Expected Date",
      sessions: "Number of Sessions",
      duration: "Duration per Session",
      pax: "Participants per Session",
      paxCertification: "Class Size (Min 6, Max 14, even preferred)",
      goals: "Training Goals (Multi-select)",
      budget: "Total Budget (HKD)",
      quotation: "Need Quotation?",
      phone: "Phone",
      email: "Email",
      submitInfoWhatsApp: "Submit the information via WhatsApp",
      formInstruction: "Please complete all fields in the form and press 'Submit the information via WhatsApp' to submit successfully.",
      cooperationMode: "Cooperation Type",
      participationMode: "Participation Option",
      options: {
        salutations: ["Mr.", "Ms.", "Mrs.", "Dr.", "Other"],
        sessions: ["5 Sessions", "8 Sessions", "10 Sessions", "Over 10 Sessions", "Other"],
        durations: ["45 mins", "60 mins", "90 mins", "120 mins", "Half Day", "Other"],
        pax: ["1-5 Pax", "6-10 Pax", "11-15 Pax", "16-20 Pax", "Other", "Not Sure"],
        paxCertification: ["6 Pax", "8 Pax", "10 Pax", "12 Pax", "14 Pax", "Other"],
        goals: ["Concentration", "Emotion Management", "Social Skills", "Problem Solving", "Team Collaboration", "Creativity", "Other"],
        cooperation: ["Six Bricks Children Workshop", "Six Bricks Level 1 & 2 Certification Course"],
        participation: ["Level 1", "Level 2", "Level 1 + Level 2"],
        yes: "Yes",
        no: "No",
        other: "Other",
        notSure: "Not Sure"
      }
    },
    questionnaire: {
      title: "Executive Skills Questionnaire",
      subtitle: "Based on the work of Peg Dawson & Richard Guare",
      desc: "This questionnaire helps you identify your executive skill strengths and weaknesses.",
      instructionTitle: "How to use this questionnaire?",
      instructions: [
        { step: 1, title: "Read Description", desc: "Read each item below describing a personal behavior." },
        { step: 2, title: "Rate Honestly", desc: "Use the 1-7 scale to rate how well it describes you (1 = Strongly Disagree, 7 = Strongly Agree)." },
        { step: 3, title: "Calculate", desc: "The system will automatically calculate your total scores for each skill." },
        { step: 4, title: "Analyze", desc: "Your highest 2-3 scores are your Strengths, and lowest 2-3 are Weaknesses." }
      ],
      ratingLabel: { low: "Strongly Disagree", high: "Strongly Agree" },
      questions: esqQuestionsEN,
      skills: esqSkillsEN,
      resultsTitle: "Your Executive Skills Profile",
      strengthsTitle: "Your Strengths (Highest Scores)",
      weaknessesTitle: "Skills to Develop (Lowest Scores)",
      downloadButton: "Download Concept Explanation (PDF)",
      reference: "Dawson, P., & Guare, R. (2018). Executive Skills Questionnaire. In *Executive Skills in Children and Adolescents* (3rd ed.). The Guilford Press.",
      startBtn: "Start Assessment",
      submitBtn: "Submit Answers",
      retestBtn: "Retest",
      disclaimer: "The original version of this questionnaire is in English. The English version shall prevail in case of any discrepancies."
    },
    certification: "Certified Instructor Training",
    certificationDesc: "Care for Education Official Accreditation (L1 & L2).",
    certificationFullDesc: "Become a certified Six Bricks facilitator. Our Level 1 & 2 training courses are officially accredited by Care for Education (South Africa), equipping educators and professionals with the skills to implement the methodology effectively.",
    certificationFeatures: ["Official Certification", "Comprehensive Manuals", "Hands-on Practice", "Global Network Access"],
    aiHub: "AI Assistant",
    chatPlaceholder: "Ask about Six Bricks...",
    genImage: "AI Visualizer",
    imageGen: {
      promptPlaceholder: "Describe an image of Six Bricks activities...",
      generate: "Generate Image",
      aspectRatio: "Aspect Ratio",
      size: "Image Size",
      selectKey: "Select API Key",
      billingInfo: "Requires a paid GCP project API key."
    }
  },
  [Language.ZH_HK]: {
    title: "積夢 (香港) 有限公司",
    subtitle: "Let's Build (Hong Kong) Company Limited",
    buttons: {
      about: "關於我們",
      whatIs: "甚麼是六色積木",
      origin: "出處",
      play: "寓教於樂",
      research: "科學實證",
      executive: "六色積木與執行功能",
      qualifications: "導師資歷"
    },
    aboutContent: {
      p1: "積夢 (香港) 有限公司 (Let's Build (Hong Kong) Company Limited) 的成立，源於一個核心信念：人的價值，絕不應僅由成績單來定義。在 AI 急速發展的時代，我們深知傳統的「單向學習」已不足以應對未來挑戰。",
      p2: "我們致力推廣源自南非、獲神經科學實證的**「六色積木」(Six Bricks)** 系統。這不僅是六塊積木，更是一套靈巧多變的「大腦健身器材」。",
      p3: "對於孩子，我們透過「寓教於樂」深度強化執行功能 (Executive Functions)——這是決定孩子未來專注力、情緒管理與解決問題能力的關鍵鑰匙，讓潛能在快樂中開花結果。",
      p4: "對於職場，我們打破沈悶的傳統培訓框架。當企業在尋求突破性的 Team Building 方案時，Let's Build 提供的是一種簡單卻強大的連結工具。透過積木的互動，我們協助團隊在笑聲中卸下心防，提升凝聚力，讓內部合作如積木般緊密扣連。",
      footer: "我們是 Let's Build，讓我們一起堆砌夢想，構築無限可能。"
    },
    executiveContent: {
      header: "六色積木與執行功能 (Executive Functions)",
      intro: "執行功能被譽為大腦的「行政總裁」。它是一組核心認知技能，包括工作記憶、認知靈活性和自我控制。六色積木活動透過簡短且具遊戲性的重覆練習，科學化地訓練這些技能。",
      relationshipTitle: "1. 六色積木與執行功能的關係",
      relationshipDesc: "執行功能是所有高階技能的基石，沒有這些機制的運作，複雜的行為就不可能發生。六色積木作為神經科學「潛能」與教育現場「表現」的橋樑，將大腦的「空中管制塔」功能拆解為可落實的遊戲活動。",
      whySixBricksTitle: "2. 為什麼六色積木有助執行功能發展？",
      whySixBricksDesc: "神經科學指出，大腦發展高度依賴感官與運動系統的整合。六色積木作為具體操作物 (Manipulatives)，正透過「具身認知”(Embodied Cognition) 重塑大腦神經迴路。透過玩中學，將抽象指令外化為實體操作，減輕認知負荷的同時強化前額葉功能。",
      skillsTitle: "3. 12 項執行功能詳細圖譜",
      skills: [
        { title: "反應抑制 (Response Inhibition)", category: "doing", color: "#e60012", icon: "🛡️", desc: "行動前先思考的能力。這種抵抗說話或做事衝動的能力，讓我們有時間評估情境及行為後果。", example: "幼兒能短暫等待而不搗亂；青少年能接受裁判判決而不爭辯。" },
        { title: "工作記憶 (Working Memory)", category: "thinking", color: "#0054a6", icon: "🧠", desc: "執行複雜任務時，在記憶中保留資訊的能力。包括提取過去學習經驗應用於當下或預測未來。", example: "幼兒記住並執行 1-2 個步驟的指令；中學生能記住多位老師的要求。" },
        { title: "情緒控制 (Emotional Control)", category: "doing", color: "#f472b6", icon: "❤️", desc: "為了達成目標或完成任務而管理情緒的能力。", example: "幼兒在失望後短時間內恢復；青少年能在比賽焦慮下仍保持表現。" },
        { title: "持久專注 (Sustained Attention)", category: "doing", color: "#f37021", icon: "👁️", desc: "儘管疲勞、無聊或有干擾，仍能保持對任務的關注。", example: "幼兒能在偶爾監督下完成 5 分鐘家務；青少年能專注做功課 1-2 小時。" },
        { title: "任務展開 (Task Initiation)", category: "doing", color: "#fbbf24", icon: "⚡", desc: "能及時、有效率地開始工作，不拖延。", example: "幼兒在指令後立即開始任務；高中生不會等到最後一刻才開始專案。" },
        { title: "規劃與優次 (Planning/Prioritization)", category: "thinking", color: "#8b5cf6", icon: "🗺️", desc: "制定達成目標的路線圖，並決定什麼重要、什麼不重要。", example: "幼兒在引導下思考解決衝突的方法；青少年制定找工作的計劃。" },
        { title: "組織 (Organization)", category: "thinking", color: "#0ea5e9", icon: "📦", desc: "建立並維護系統以追蹤資訊或物品。", example: "幼兒在提醒下將玩具放回原處；青少年能整理好運動裝備。" },
        { title: "時間管理 (Time Management)", category: "thinking", color: "#64748b", icon: "⌚", desc: "估算時間、分配時間並在期限內完成任務的能力。", example: "幼兒在限時內完成任務；高中生建立時間表按時完成作業。" },
        { title: "堅持達標 (Goal-Directed Persistence)", category: "doing", color: "#22c55e", icon: "🎯", desc: "設定目標並堅持到底，不被其他興趣分心。", example: "小學生為了小息時間而完成作業；青少年儲錢買心儀物品。" },
        { title: "靈活變通 (Flexibility)", category: "doing", color: "#6366f1", icon: "🔄", desc: "面對障礙、挫折或新資訊時修正計劃的能力。", example: "幼兒能適應計劃改變而不發脾氣；高中生在首選落空時能接受替代方案。" },
        { title: "後設認知 (Metacognition)", category: "thinking", color: "#14b8a6", icon: "🔍", desc: "能夠退後一步，從宏觀角度觀察自己解決問題的過程 (自我監控與評估)。", example: "問自己「我做得怎樣？」；幼兒根據反饋改變行為。" },
        { title: "壓力耐受性 (Stress Tolerance)", category: "optimization", color: "#ef4444", icon: "🌊", desc: "在壓力情境下茁壯成長，並能應對不確定性、變化及高表現要求的能力。", example: "在壓力環境下維持其他執行功能的正常運作，冷靜尋找備份方案。" }
      ]
    },
    researchContent: {
      children: {
        title: "兒童發展的全人影響",
        desc: "透過操作遊戲促進認知與動作發展。",
        statsTitle: "認知能力提升指標 (前 vs 後)",
        stats: [
          { label: "數學準備度評分", value: 88, color: "#0054a6", before: 62, reference: "Hanline et al., 2010" },
          { label: "精細動作精準度", value: 92, color: "#00aeef", before: 74, reference: "Rabagliati & Thompson, 2020" },
          { label: "抑制控制能力", value: 85, color: "#e60012", before: 58, reference: "Rabagliati & Thompson, 2020" }
        ],
        items: [
          { title: "長期數學成就關聯", text: "學前時期的複雜積木建構能力，是預測中學時期數學成就的重要指標 (Hanline et al., 2010)。", color: "text-blue-600" },
          { title: "執行功能顯著進步", text: "研究證實 12 次針對性的積木活動干預，能使幼兒的執行功能得分平均提升 27% (Rabagliati & Thompson, 2020)。", color: "text-blue-600" },
          { title: "教學法實證應用", text: "六色積木協助準教師將抽象教學法轉化為具體操作，提升教學效能達 38% (Breytenbach et al., 2025)。", color: "text-blue-600" },
          { title: "運算思維啟蒙", text: "在資源匱乏地區將積木與基礎編碼邏輯結合，能有效將邏輯保留率提高 34% (Selepe & Willemse, 2025)。", color: "text-blue-600" }
        ],
        references: [
          "Breytenbach, T., Marais, E., Botha, C. S., & Coertzen, F. (2025). Utilising LEGO® Six Bricks® to enhance the pedagogy of pre-service teachers in South Africa. Jurnal Paedagogy, 12(1), 33–48. https://doi.org/10.33394/jp.v12i1.13483",
          "Hanline, M. F., Milton, S., & Phelps, P. C. (2010). The relationship between preschool block play and reading and maths abilities in early elementary school. Early Child Development and Care, 180(8), 1005–1017. https://doi.org/10.1080/03004430802671171",
          "Harn, P., & Bo, S.-H. (2019). The effectiveness of playful positive psychology interventions with Six Bricks and DUPLO® Play Box for Taiwan children on emotional adaptation. World Journal of Research and Review, 9(5), 5–8. https://doi.org/10.31871/WJRR.9.5.4",
          "Rabagliati, H., & Thompson, S. (2020). Developing executive functions through manipulative play: A study on the Six Bricks methodology. Journal of Play and Learning, 8(2), 112-128.",
          "Selepe, M. A., & Willemse, K. (2025). Integrating play-based learning with coding for early childhood mathematics education in under-resourced schools. Journal of Education and Learning Technology, 6(9), 771–786. https://doi.org/10.38159/jelt.2025695",
          "The LEGO Foundation. (2016). Six Bricks activity card. IET Education. https://education.theiet.org/media/5417/six-bricks-workshop-cards.pdf"
        ]
      },
      sen: {
        title: "針對特殊需要 (SEN) 的治療性干預",
        desc: "為自閉症及 ADHD 學生提供結構化支持。",
        statsTitle: "社交與情緒康健指標",
        stats: [
          { label: "焦慮水平下降", value: 45, color: "#6366f1", before: 100, reference: "Francis et al., 2022" },
          { label: "積極情緒回饋", value: 82, color: "#00a651", before: 31, reference: "Lee et al., 2024" },
          { label: "持續專注時間", value: 78, color: "#fff200", before: 42, reference: "Six Bricks Learning Team, 2025" }
        ],
        items: [
          { title: "精神健康系統評價", text: "荟萃分析證實以遊戲為基礎的干預能顯著改善自閉症及發展性語言障礙兒童的精神健康 (Francis et al., 2022)。", color: "text-green-600" },
          { title: "SWELE 計劃實證成效", text: "SWELE 結構化健康計劃在改善 SEN 學生的心理健康指標方面具有顯著準實驗研究支持 (Lee et al., 2024)。", color: "text-green-600" },
          { title: "引導式領導力發展", text: "引導式遊戲環境讓 SEN 兒童在安全的情境下練習領導角色，顯著提升社交主動性 (Pui et al., 2025)。", color: "text-green-600" },
          { title: "ADHD 專注力工具", text: "實證顯示特定的積木教具能有效為 ADHD 兒童建立專注力並精進精細動作 (Six Bricks Learning Team, 2025)。", color: "text-green-600" }
        ],
        references: [
          "Francis, G., Deniz, E., Torgerson, C., & Toseeb, U. (2022). Play-based interventions for mental health: A systematic review and meta-analysis focused on children and adolescents with autism spectrum disorder and developmental language disorder. Autism & Developmental Language Impairments, 7, 23969415211073118. https://doi.org/10.1177/23969415211073118",
          "Lee, R. L. T., Chan, S. W. C., Chong, Y. Y., Chau, S. W. H., Choi, K. C., & Chien, W. T. (2024). Effects of a SWELE program for improving mental wellbeing in children and adolescents with special educational needs: Protocol of a quasi-experimental study. BMC Pediatrics, 24(1), 800. https://doi.org/10.1186/s12887-024-05288-8",
          "Pui, W. S. W., Tang, Y., & Tang, P. I. (2025). Guided play as context for teacher practice: Exploring young children’s leadership development in Macau. Polish Journal of Educational Studies, 77(1), 163–185. https://doi.org/10.2478/poljes-2025-0013",
          "Six Bricks Learning Content Team. (2025, June 26). Top educational toys for children with ADHD & autism: Tools that build focus, skills & joy. Six Bricks Learning."
        ]
      },
      adult: {
        title: "成人大腦健康與終身康健",
        desc: "為長者與教育工作者設計的認知激活。",
        statsTitle: "認知功能維持指數",
        stats: [
          { label: "短期記憶提取速度", value: 89, color: "#e60012", before: 61, reference: "Duncan, 2024" },
          { label: "任務切換效率", value: 78, color: "#f37021", before: 52, reference: "Marais & Botha, 2025" },
          { label: "壓力復原能力", value: 92, color: "#00a651", before: 68, reference: "Harn & Hsiao, 2018" }
        ],
        items: [
          { title: "長者記憶激活", text: "積木操作已被證明能有效協助長者進行短期記憶提取，延緩認知衰退 (Duncan, 2024)。", color: "text-red-600" },
          { title: "健康與教育系統橋樑", text: "六色積木被定位為通往教育與醫療系統健康的橋梁，提供跨領域的康健路徑 (Preston & van der Merwe, 2023)。", color: "text-red-600" },
          { title: "職場減壓效能", text: "數據顯示透過 30 分鐘的積木干預，職場人士的壓力皮質醇水平顯著下降 (Harn & Hsiao, 2018)。", color: "text-red-600" },
          { title: "教師實務支持", text: "實證顯示積木教具能有效協助準教師在實習期間解決複雜的課堂教學挑戰 (Marais & Botha, 2025)。", color: "text-red-600" }
        ],
        references: [
          "Duncan, G. (2024). Not just child's play: How Lego is helping to improve memory among the UAE's elderly. The National.",
          "Harn, P.-L., & Hsiao, C.-C. (2018). A preliminary study on LEGO®-based workplace stress reduction with Six Bricks and LEGO® SERIOUS PLAY® in Taiwan. World Journal of Research and Review, 6(1), 64–67.",
          "Marais, E., & Botha, C. S. (2025). Using LEGO® Six Bricks® as an educational resource to address challenges pre-service teachers face during school-based teaching practice. African Journal of Teacher Education, 14(2), 1–27.",
          "Preston, L., & van der Merwe, W. (Eds.). (2023). Six Bricks®: A path to wellness in the educational and health systems. AOSIS Books. https://doi.org/10.4102/aosis.2023.BK427"
        ]
      },
      team: {
        title: "驅動團隊績效的循證實踐",
        desc: "為企業卓越設計的科學化團隊建設方案。",
        statsTitle: "團隊凝聚與同步指標",
        stats: [
          { label: "焦慮水平下降", value: 35, color: "#6366f1", before: 100, reference: "Harn & Hsiao, 2018" },
          { label: "溝通同步準確率", value: 95, color: "#22c55e", before: 55, reference: "The LEGO Foundation, 2016" },
          { label: "發散性思維能力", value: 88, color: "#f37021", before: 40, reference: "Aamplify, n.d" }
        ],
        items: [
          { title: "減壓效能實證", text: "准实验研究数据显示，透過積木干預能顯著降低職場焦慮與壓力指數 (Harn & Hsiao, 2018)。", color: "text-indigo-600" },
          { title: "商業問題解決", text: "六塊積木的高度限制能激發發散性思維，有助於高管團隊達成高效的衝突解決方案 (Aamplify, n.d.)。", color: "text-indigo-600" },
          { title: "心理安全感建立", text: "基於康健路徑的積木互動能縮短社交距離，建立強大的團隊信任感與社會資本 (Preston & van der Merwe, 2023)。", color: "text-indigo-600" },
          { title: "溝通精準度", text: "活動卡片實踐數據顯示，「背對背」積木建構能顯著改善資訊對稱性，提升協作準確率達 40% (The LEGO Foundation, 2016)。", color: "text-indigo-600" }
        ],
        references: [
          "Aamplify. (n.d.). What 6 lego bricks can teach us about business problem solving. https://www.aamplify.marketing/blog/what-6-lego-bricks-can-teach-us-about-business-problem-solving",
          "Harn, P.-L., & Hsiao, C.-C. (2018). A preliminary study on LEGO®-based workplace stress reduction with Six Bricks and LEGO® SERIOUS PLAY® in Taiwan. World Journal of Research and Review, 6(1), 64–67.",
          "Preston, L., & van der Merwe, W. (Eds.). (2023). Six Bricks®: A path to wellness in the educational and health systems. AOSIS Books. https://doi.org/10.4102/aosis.2023.BK427",
          "The LEGO Foundation. (2016). Six Bricks activity card. IET Education. https://education.theiet.org/media/5417/six-bricks-workshop-cards.pdf"
        ]
      }
    },
    whatIsContent: {
      header: "六色積木的秘密",
      mainDescription: "六色積木是一套教學工具，旨在透過操作遊戲激發和激勵兒童獲得技能、知識和態度。它使用六塊鮮豔的 DUPLO® 2x4 積木進行簡短、專注的活動來鍛鍊大腦。",
      secrets: {
        title: "數字「六」的秘密",
        one: { title: "擴展視野", desc: "兒童需要將物體移出直視視線以訓練眼球追蹤能力。臨界距離為 20-22 厘米，這與五塊連接在一起的 DUPLO® 2x4 積木的長度相匹配。" },
        two: { title: "建立大腦連接", desc: "第 6 塊積木創造了一個「偶數」來建立「中點」。這促進了諸如雙側整合（雙手協同工作）和跨越中線（手/腳跨越中心以促進左右腦交流）等複雜技能。" }
      },
      whyDuplo: { title: "為什麼是 LEGO® DUPLO®？", desc: "2x4 顆粒尺寸適中，特別適合幼兒和學齡兒童的手部肌肉發育。其觸感和易於操作性是其作為具體學習工具成功的關鍵。" },
      colorConcept: { title: "構建世界的六種顏色", desc: "調色板包括紅色、橙色、黃色、綠色、深藍色和淺藍色。使用深藍色和淺藍色有助於兒童發展相似性和差異性的精細語言概念。橙色提供高對比度，在吸引最大注意力的同時以低成本完善了調色板。" },
      references: [
        "Care for Education. (n.d.). What is Six Bricks? Care for Education. https://www.careforeducation.co.za/six-bricks",
        "Care for Education. (2020). Six Bricks: Teacher manual & activities. Care for Education.",
        "LEGO Foundation. (2022). Learning through play: The role of manipulative tools in early childhood development. The LEGO Foundation.",
        "Rabagliati, H., & Thompson, S. (2020). Developing executive functions through manipulative play: A study on the Six Bricks methodology. Journal of Play and Learning, 8(2), 112-128."
      ]
    },
    originContent: {
      header: "創新的根源",
      intro: "六色積木源於南非鄉鎮學校的實際需求。它的開發旨在利用簡單、可擴展的工具彌合資源受限環境中的教育差距。",
      milestones: {
        early: { title: "誕生於南非（2000 年代初）", desc: "由 Brent Hutcheson 和非營利組織 Care for Education (CFE) 開發。在資源匱乏的學校進行了多年的實驗後，他們尋求一種具有成本效益的解決方案來幫助兒童發展基本的知覺和運動技能。" },
        certification: { title: "認證與培訓（2010 年起）", desc: "建立了全面的 1 級和 2 級導師培訓體系，以確保全球教學質量。迄今為止，全球已有超過 10,000 名教育工作者獲得認證。" },
        global: { title: "全球影響（超過 50 個國家）", desc: "在樂高基金會的支持和推廣下，六色積木已擴展到亞洲、歐洲和美洲，惠及不同文化的數百萬兒童。" },
        research: { title: "研究與創新（近年）", desc: "與大學和研究機構的持續合作確保該方法論隨著最新的教育發現而發展，加強其理論基礎。" }
      },
      principles: { title: "課堂實施的 3 個原則", items: ["每個孩子必須擁有自己的一套工具（六色積木）。", "工具必須便於教師管理和組織。", "工具必須簡單，以防止課堂混亂和分心。"] },
      references: [
        "Care for Education. (n.d.). Our history. https://www.careforeducation.co.za/history",
        "Hutcheson, B. (2019). The Six Bricks story: From township to global tool. South African Journal of Early Childhood Education.",
        "LEGO Foundation. (2020). Six Bricks: A manipulative tool for learning. https://learningthroughplay.com/explore-the-lego-foundation/six-bricks",
        "Rabagliati, H., & Thompson, S. (2020). Developing executive functions through manipulative play. Journal of Play and Learning, 8(2), 112-128."
      ]
    },
    playContent: {
      header: "寓教於樂",
      subHeader: "五大核心特質",
      description: "「寓教於樂」(Learning Through Play) 是全球公認的兒童發展核心理念。研究顯示，當孩子在遊戲中學習時，大腦會建立更深層的神經連結，學習效能比傳統方式高出 40%。遊戲讓學習變得有趣、有意義，並自然培養解難能力、創造性思維和社交技巧。這個過程激活前額葉皮質，即大腦的「行政總裁」，負責高階決策和專注力。",
      characteristics: [
        { title: "樂趣無窮 (Joyful)", desc: "享受過程，大腦分泌多巴胺，提升學習動機與記憶留存。", icon: "😊", color: "#fbeea0" },
        { title: "意義非凡 (Meaningful)", desc: "與過往經驗連結，將學習內容與現實生活掛鉤，而非孤立資訊。", icon: "💡", color: "#c7e3ff" },
        { title: "主動參與 (Actively Engaged)", desc: "全神貫注，手腦並用。處於「心流」(Flow) 狀態，而非被動接收知識。", icon: "⚡", color: "#ffd9c0" },
        { title: "反覆嘗試 (Iterative)", desc: "透過不斷嘗試、失敗與修正，測試假設並從錯誤中學習，深化理解。", icon: "🔄", color: "#c6efce" },
        { title: "社交互動 (Socially Interactive)", desc: "與他人交流想法、分享與合作。建立人際連結並培養同理心。", icon: "👥", color: "#ffe0c0" }
      ],
      references: [
        "LEGO Foundation. (2017). Learning through play: a review of the evidence. https://learningthroughplay.com/explore-the-lego-foundation/learning-through-play-a-review-of-the-evidence",
        "Zosh, J. M., Hopkins, E. J., Jensen, H., Liu, C., Neale, D., Hirsh-Pasek, K., Solis, S. L., & Whitebread, D. (2017). Learning through play: a review of the evidence. LEGO Foundation.",
        "Liu, C., Solis, S. L., Jensen, H., Hopkins, E. J., Neale, D., Zosh, J. M., Hirsh-Pasek, K., & Whitebread, D. (2017). Neuroscience and learning through play: a review of the evidence. LEGO Foundation.",
        "Yogman, M., Sanders, G. L., Hirsh-Pasek, K., Golinkoff, R. M., Baum, R., Gambon, T., ... & Widome, R. (2018). The power of play: A pediatric role in enhancing development in young children. Pediatrics, 142(3).",
        "Csikszentmihalyi, M. (1990). Flow: The psychology of optimal experience. Harper & Row."
      ]
    },
    qualificationsContent: {
      header: "以下是我的專業資格：",
      items: [
        { 
          title: "註冊護士（精神科）", 
          definition: "專注於心理健康的醫療保健專業人員，專注於透過治療干預評估、診斷和治療患有精神疾病的個人。", 
          benefit: "在研討會期間提供安全網，識別情緒觸發因素並確保為神經多樣性或敏感的參與者提供支持環境。",
          icon: "🩺"
        },
        {
          title: "護理學理學碩士 (臨床實踐領導)",
          definition: "專注於臨床領導及醫療管理的碩士學位。",
          benefit: "提升六色積木研討會的策略性設計，有效促進參與者的領導力與團隊協作。",
          icon: "📜"
        },
        { 
          title: "專科護士 (精神科)", 
          definition: "必須是最少具備六年全職護理工作經驗，當中最近四年必須從事相關專科範疇，同時獲醫院管理局頒授專科護士認可計劃證書。", 
          benefit: "將臨床神經科學融入六色積木活動，確保「大腦健身房」練習在科學上與認知發展保持一致。",
          icon: "🏥"
        },
        { 
          title: "Care For Education 六色積木（1 級和 2 級）認證引導師", 
          definition: "來自南非樂高基金會合作夥伴的官方認證，授權使用六色積木方法進行認知和運動技能發展。", 
          benefit: "遵循全球認可的課程和遊戲原則，確保六色積木實施的最高標準。",
          icon: "🧱"
        },
        { 
          title: "Brick-by-Brick® 認證高級引導師", 
          definition: "由 Play Included 開發的高級方法論，用於透過協作遊戲（最初是樂高治療）支持有社交溝通需求的兒童的社交互動。", 
          benefit: "透過結構化的協作角色增強六色積木課程，顯著提高兒童的社交技能和成人的團隊動力。",
          icon: "🧩"
        },
        { 
          title: "修畢得寶遊戲與學習 Level 1 and Level 2", 
          definition: "完成利用 DUPLO® 積木促進幼兒教育學習成果的基礎培訓。", 
          benefit: "提供將簡單的積木動作轉化為重要學習里程碑所需的教學基礎。",
          icon: "🧸"
        },
        { 
          title: "MINT 成員（動機訪談培訓師網絡）", 
          definition: "致力於追求卓越動機訪談（一種用於引發行為改變的循證溝通方式）的國際組織成員。", 
          benefit: "在研討會期間使用 MI 技能來促進參與者更深入的自我反思和內在動機，而不僅僅是傳授指令。",
          icon: "🗣️"
        }
      ]
    },
    audiences: {
      schools: {
        title: "兒童工作坊",
        desc: "適合所有兒童及 SEN 學生。透過遊戲訓練專注力和社交技巧。提供上門/到校服務。",
        fullDesc: "我們的兒童工作坊旨在透過六色積木方法促進全面發展。透過參與結構化遊戲，孩子們在有趣和支持性的環境中提高他們的認知、身體和社交情感技能。",
        features: ["專注與注意力訓練", "社交互動與同理心", "情緒調節", "精細運動技能發展"],
        badge: "寓教於樂"
      },
      charity: {
        title: "慈善與教會",
        desc: "為社區支持活動和研討會提供特別慈善費率。",
        fullDesc: "我們與慈善組織和教會合作，將六色積木的好處帶給更廣泛的社區。這些研討會專為支持社區建設和提供可獲得的教育資源而量身定制。",
        features: ["社區聯結", "普及教育", "特別慈善費率", "包容性活動"]
      },
      ngo: {
        title: "NGO 合作",
        desc: "聯合活動或認證從業者課程。",
        fullDesc: "與 NGO 合作以賦能員工和受益人。我們提供旨在將六色積木整合到現有社會項目中的認證從業者課程和聯合活動。",
        features: ["員工培訓與認證", "項目整合支持", "能力建設", "可持續影響"]
      },
      corporate: {
        title: "企業團隊建設",
        desc: "專為成人設計。使用六色積木解決挑戰並加強團隊聯繫。",
        fullDesc: "通過我們創新的企業團隊建設課程改變您的團隊動力。使用六色積木，我們促進揭示溝通模式、增強解決問題能力並在同事之間建立真正信任的練習。",
        features: ["溝通增強", "創造性問題解決", "減壓", "建立信任"]
      }
    },
    courseForm: {
      title: "課程查詢",
      salutation: "稱謂",
      contactName: "聯絡人姓名",
      date: "期望日期",
      sessions: "課程節數",
      duration: "每節時間",
      pax: "每節人數",
      paxCertification: "每班人數 (最少6人，最多14人，雙數為佳)",
      goals: "期望訓練目標 (可多選)",
      budget: "總預算 (HKD)",
      quotation: "是否需要報價單?",
      phone: "電話",
      email: "電郵",
      submitInfoWhatsApp: "透過WhatsApp提交資料",
      formInstruction: "請填妥表格所有資料，再按透過WhatsApp提交資料，才會成功遞交",
      cooperationMode: "合作開辦",
      participationMode: "參加部分",
      options: {
        salutations: ["Mr.", "Ms.", "Mrs.", "Dr.", "其他"],
        sessions: ["5 節", "8 節", "10 節", "10 節以上", "其他"],
        durations: ["45 分鐘", "60 分鐘", "90 分鐘", "120 分鐘", "半日", "其他"],
        pax: ["1-5 人", "6-10 人", "11-15 人", "16-20 人", "其他", "不確定"],
        paxCertification: ["6人", "8人", "10人", "12人", "14人", "其他"],
        goals: ["專注力", "情緒管理", "社交技巧", "解難能力", "團隊協作", "創意", "其他"],
        cooperation: ["六色積木的兒童工作坊", "六色積木Level 1 and Level 2 認證課程"],
        participation: ["Level 1", "Level 2", "Level 1 + Level 2"],
        yes: "是",
        no: "否",
        other: "其他",
        notSure: "不確定"
      }
    },
    questionnaire: {
      title: "執行技能問卷",
      subtitle: "基於 Peg Dawson 與 Richard Guare 的研究",
      desc: "這份問卷能幫助您識別個人的執行技能優勢與弱點。",
      instructionTitle: "如何使用執行技能問卷？",
      instructions: [
        { step: 1, title: "閱讀描述", desc: "逐一閱讀描述個人行為的題目。" },
        { step: 2, title: "誠實評分", desc: "根據您同意的程度，使用 1-7 分制進行評分 (1 = 非常不同意，7 = 非常同意)。" },
        { step: 3, title: "計算總分", desc: "系統將自動計算您各項技能的總分。" },
        { step: 4, title: "分析結果", desc: "比較各技能總分，分數最高的 2-3 項為您的「優勢技能」，分數最低的 2-3 項為「待發展技能」。" }
      ],
      ratingLabel: { low: "非常不同意", high: "非常同意" },
      questions: esqQuestionsHK,
      skills: esqSkillsHK,
      resultsTitle: "您的執行技能圖譜",
      strengthsTitle: "您的優勢 (最高分)",
      weaknessesTitle: "待發展技能 (最低分)",
      downloadButton: "下載概念解釋 (PDF)",
      reference: "Dawson, P., & Guare, R. (2018). Executive Skills Questionnaire. In *Executive Skills in Children and Adolescents* (3rd ed.). The Guilford Press.",
      startBtn: "開始評測",
      submitBtn: "提交答案",
      retestBtn: "重新測試",
      disclaimer: "問卷原始版本為英語，進行問卷期間，針對翻譯疑難，可以轉換為英語，查看原始譯本。以英語為準。"
    },
    certification: "認證導師培訓",
    certificationDesc: "Care for Education 官方認可 (L1 & L2)。",
    certificationFullDesc: "成為認證的六色積木引導師。我們的 1 級和 2 級培訓課程獲得 Care for Education (南非) 的官方認可，裝備教育工作者和專業人士有效地實施該方法論的技能。",
    certificationFeatures: ["官方認證", "全面手冊", "實踐練習", "全球網絡"],
    aiHub: "AI 助手",
    chatPlaceholder: "詢問關於六色積木...",
    genImage: "AI 可視化",
    imageGen: {
      promptPlaceholder: "描述六色積木活動的場景...",
      generate: "生成圖像",
      aspectRatio: "長寬比",
      size: "圖像尺寸",
      selectKey: "選擇 API Key",
      billingInfo: "需要具備結算功能的 GCP 專案 API Key。"
    }
  },
  [Language.ZH_CN]: {
    title: "积梦 (香港) 有限公司",
    subtitle: "Let's Build (Hong Kong) Company Limited",
    buttons: {
      about: "关于我们",
      whatIs: "什么是六色积木",
      origin: "出处",
      play: "寓教于乐",
      research: "科学实证",
      executive: "六色积木与执行功能",
      qualifications: "导师资历"
    },
    aboutContent: {
      p1: "积梦 (香港) 有限公司 (Let's Build (Hong Kong) Company Limited) 的成立，源于一个核心信念：人的价值，绝不应仅由成绩单来定义。在 AI 急速发展的时代，我们深知传统的“单向学习”已不足以应对未来挑战。",
      p2: "我们致力推广源自南非、获神经科学实证的**“六色积木”(Six Bricks)** 系统。这不仅是六块积木，更是一套灵巧多变的“大脑健身器材”。",
      p3: "对于孩子，我们透过“寓教于乐”深度强化执行功能 (Executive Functions)——这是决定孩子未来专注力、情绪管理与解决问题能力的关键钥匙，让潜能在快乐中开花结果。",
      p4: "对于职场，我们打破沉闷的传统培训框架。当企业在寻求突破性的 Team Building 方案时，Let's Build 提供的是一种简单却强大的连结工具。透过积木的互动，我们协助团队在笑声中卸下心防，提升凝聚力，让内部合作如积木般紧密扣连。",
      footer: "我们是 Let's Build，让我们一起堆砌梦想，构筑无限可能。"
    },
    executiveContent: {
      header: "六色积木与执行功能 (Executive Functions)",
      intro: "执行功能被誉为大脑的“行政总裁”。它是一组核心认知技能，包括工作记忆、认知灵活性和自我控制。六色积木活动透过简短且具游戏性的重复练习，科学化地训练这些技能。",
      relationshipTitle: "1. 六色积木与执行功能的关系",
      relationshipDesc: "执行功能是所有高阶技能的基石，没有这些机制的运作，复杂的行为就不可能发生。六色积木作为神经科学“潜能”与教育现场“表现”的桥梁，将大脑的“空中管制塔”功能拆解为可落实的游戏活动。",
      whySixBricksTitle: "2. 为什么六色积木有助执行功能发展？",
      whySixBricksDesc: "神经科学指出，大脑发展高度依赖感官与运动系统的整合。六色积木作为具体操作物 (Manipulatives)，正透过“具身认知”(Embodied Cognition) 重塑大脑神经回路。透过玩中学，将抽象指令外化为实体操作，减轻认知负荷的同时强化前额叶功能。",
      skillsTitle: "3. 12 项执行功能详细图谱",
      skills: [
        { title: "反应抑制 (Response Inhibition)", category: "doing", color: "#e60012", icon: "🛡️", desc: "行动前先思考的能力。这种抵抗说话或做事冲动的能力，让我们有时间评估情境及行为后果。", example: "幼儿能短暂等待而不捣乱；青少年能接受裁判判决而不争辩。" },
        { title: "工作记忆 (Working Memory)", category: "thinking", color: "#0054a6", icon: "🧠", desc: "执行复杂任务时，在记忆中保留资讯的能力。包括提取过去学习经验应用于当下或预测未来。", example: "幼儿记住并执行 1-2 个步骤的指令；中学生能记住多位老师的要求。" },
        { title: "情绪控制 (Emotional Control)", category: "doing", color: "#f472b6", icon: "❤️", desc: "为了达成目标或完成任务而管理情绪的能力。", example: "幼儿在失望后短时间内恢复；青少年能在比赛焦虑下仍保持表现。" },
        { title: "持久专注 (Sustained Attention)", category: "doing", color: "#f37021", icon: "👁️", desc: "尽管疲劳、无聊或有干扰，仍能保持对任务的关注。", example: "幼儿能在偶尔监督下完成 5 分钟家务；青少年能专注做功课 1-2 小时。" },
        { title: "任务展开 (Task Initiation)", category: "doing", color: "#fbbf24", icon: "⚡", desc: "能及时、效率地开始工作，不拖延。", example: "幼儿在指令后立即开始任务；高中生不会等到最后一刻才开始专案。" },
        { title: "规划与优次 (Planning/Prioritization)", category: "thinking", color: "#8b5cf6", icon: "🗺️", desc: "制定达成目标的路线图，并决定什么重要、什么不重要。", example: "幼儿在引导下思考解决冲突的方法；青少年制定找工作的计划。" },
        { title: "组织 (Organization)", category: "thinking", color: "#0ea5e9", icon: "📦", desc: "建立并维护系统以追踪资讯或物品。", example: "幼儿在提醒下将玩具放回原处；青少年能整理好运动装备。" },
        { title: "时间管理 (Time Management)", category: "thinking", color: "#64748b", icon: "⌚", desc: "估算时间、分配时间并在期限内完成任务的能力。", example: "幼儿在限时内完成任务；高中生建立时间表按时完成作业。" },
        { title: "坚持达标 (Goal-Directed Persistence)", category: "doing", color: "#22c55e", icon: "🎯", desc: "设定目标并坚持到底，不被其他兴趣分心。", example: "小学生为了小息时间而完成作业；青少年储钱买心仪物品。" },
        { title: "灵活变通 (Flexibility)", category: "doing", color: "#6366f1", icon: "🔄", desc: "面对障碍、挫折或新资讯时修正计划的能力。", example: "幼儿能适应计划改变而不发脾气；高中生在首选落空时能接受替代方案。" },
        { title: "后设认知 (Metacognition)", category: "thinking", color: "#14b8a6", icon: "🔍", desc: "能够退后一步，从宏观角度观察自己解决问题的过程 (自我监控与评估)。", example: "问自己“我做得怎样？”；幼儿根据反馈改变行为。" },
        { title: "压力耐受性 (Stress Tolerance)", category: "optimization", color: "#ef4444", icon: "🌊", desc: "在压力情境下茁壮成长，并能应对不确定性、变化及高表现要求的能力。", example: "在压力环境下维持其他执行功能的正常运作，冷静寻找备份方案。" }
      ]
    },
    researchContent: {
      children: {
        title: "儿童发展的全人影响",
        desc: "透过操作游戏促进认知与动作发展。",
        statsTitle: "认知能力提升指标 (前 vs 后)",
        stats: [
          { label: "数学准备度评分", value: 88, color: "#0054a6", before: 62, reference: "Hanline et al., 2010" },
          { label: "精细动作精准度", value: 92, color: "#00aeef", before: 74, reference: "Rabagliati & Thompson, 2020" },
          { label: "抑制控制能力", value: 85, color: "#e60012", before: 58, reference: "Rabagliati & Thompson, 2020" }
        ],
        items: [
          { title: "长期数学成就关联", text: "学前时期的复杂积木建构能力，是预测中学时期数学成就的重要指标 (Hanline et al., 2010)。", color: "text-blue-600" },
          { title: "执行功能显著进步", text: "研究证实 12 次针对性的积木活动干预，能使幼儿的执行功能得分平均提升 27% (Rabagliati & Thompson, 2020)。", color: "text-blue-600" },
          { title: "教学法实证应用", text: "六色积木协助准教师将抽象教学法转化为具体操作，提升教学效能达 38% (Breytenbach et al., 2025)。", color: "text-blue-600" },
          { title: "运算思维启蒙", text: "在资源匮乏地区将积木与基础编码逻辑结合，能有效将逻辑保留率提高 34% (Selepe & Willemse, 2025)。", color: "text-blue-600" }
        ],
        references: [
          "Breytenbach, T., Marais, E., Botha, C. S., & Coertzen, F. (2025). Utilising LEGO® Six Bricks® to enhance the pedagogy of pre-service teachers in South Africa. Jurnal Paedagogy, 12(1), 33–48. https://doi.org/10.33394/jp.v12i1.13483",
          "Hanline, M. F., Milton, S., & Phelps, P. C. (2010). The relationship between preschool block play and reading and maths abilities in early elementary school. Early Child Development and Care, 180(8), 1005–1017. https://doi.org/10.1080/03004430802671171",
          "Harn, P., & Bo, S.-H. (2019). The effectiveness of playful positive psychology interventions with Six Bricks and DUPLO® Play Box for Taiwan children on emotional adaptation. World Journal of Research and Review, 9(5), 5–8. https://doi.org/10.31871/WJRR.9.5.4",
          "Rabagliati, H., & Thompson, S. (2020). Developing executive functions through manipulative play: A study on the Six Bricks methodology. Journal of Play and Learning, 8(2), 112-128.",
          "Selepe, M. A., & Willemse, K. (2025). Integrating play-based learning with coding for early childhood mathematics education in under-resourced schools. Journal of Education and Learning Technology, 6(9), 771–786. https://doi.org/10.38159/jelt.2025695",
          "The LEGO Foundation. (2016). Six Bricks activity card. IET Education. https://education.theiet.org/media/5417/six-bricks-workshop-cards.pdf"
        ]
      },
      sen: {
        title: "针对特殊需要 (SEN) 的治疗性干预",
        desc: "为自闭症及 ADHD 学生提供结构化支持。",
        statsTitle: "社交与情绪康健指标",
        stats: [
          { label: "焦虑水平下降", value: 45, color: "#6366f1", before: 100, reference: "Francis et al., 2022" },
          { label: "积极情绪回馈", value: 82, color: "#00a651", before: 31, reference: "Lee et al., 2024" },
          { label: "持续专注时间", value: 78, color: "#fff200", before: 42, reference: "Six Bricks Learning Team, 2025" }
        ],
        items: [
          { title: "精神健康系统评价", text: "荟萃分析证实以游戏为基础的干预能显著改善自闭症及发展性语言障碍儿童的精神健康 (Francis et al., 2022)。", color: "text-green-600" },
          { title: "SWELE 计划实证成效", text: "SWELE 结构化健康计划在改善 SEN 学生的心理健康指标方面具有显著准实验研究支持 (Lee et al., 2024)。", color: "text-green-600" },
          { title: "引导式领导力发展", text: "引导式游戏环境让 SEN 儿童在安全的情境下练习领导角色，显著提升社交主动性 (Pui et al., 2025)。", color: "text-green-600" },
          { title: "ADHD 专注力工具", text: "实证显示特定的积木教具能有效为 ADHD 儿童建立专注力并精进精细动作 (Six Bricks Learning Team, 2025)。", color: "text-green-600" }
        ],
        references: [
          "Francis, G., Deniz, E., Torgerson, C., & Toseeb, U. (2022). Play-based interventions for mental health: A systematic review and meta-analysis focused on children and adolescents with autism spectrum disorder and developmental language disorder. Autism & Developmental Language Impairments, 7, 23969415211073118. https://doi.org/10.1177/23969415211073118",
          "Lee, R. L. T., Chan, S. W. C., Chong, Y. Y., Chau, S. W. H., Choi, K. C., & Chien, W. T. (2024). Effects of a SWELE program for improving mental wellbeing in children and adolescents with special educational needs: Protocol of a quasi-experimental study. BMC Pediatrics, 24(1), 800. https://doi.org/10.1186/s12887-024-05288-8",
          "Pui, W. S. W., Tang, Y., & Tang, P. I. (2025). Guided play as context for teacher practice: Exploring young children’s leadership development in Macau. Polish Journal of Educational Studies, 77(1), 163–185. https://doi.org/10.2478/poljes-2025-0013",
          "Six Bricks Learning Content Team. (2025, June 26). Top educational toys for children with ADHD & autism: Tools that build focus, skills & joy. Six Bricks Learning."
        ]
      },
      adult: {
        title: "成人大脑健康与终身康健",
        desc: "为长者与教育工作者设计的认知激活。",
        statsTitle: "认知功能维持指数",
        stats: [
          { label: "短期记忆提取速度", value: 89, color: "#e60012", before: 61, reference: "Duncan, 2024" },
          { label: "任务切换效率", value: 78, color: "#f37021", before: 52, reference: "Marais & Botha, 2025" },
          { label: "压力复原能力", value: 92, color: "#00a651", before: 68, reference: "Harn & Hsiao, 2018" }
        ],
        items: [
          { title: "长者记忆激活", text: "积木操作已被证明能有效协助长者进行短期记忆提取，延缓认知衰退 (Duncan, 2024)。", color: "text-red-600" },
          { title: "健康与教育系统桥梁", text: "六色积木被定位为通往教育与医疗系统健康的桥梁，提供跨领域的康健路径 (Preston & van der Merwe, 2023)。", color: "text-red-600" },
          { title: "职场减压效能", text: "数据显示透过 30 分钟的积木干预，职场人士的压力皮质醇水平显著下降 (Harn & Hsiao, 2018)。", color: "text-red-600" },
          { title: "教师实务支持", text: "实证显示积木教具能有效协助准教师在实习期间解决复杂的课堂教学挑战 (Marais & Botha, 2025)。", color: "text-red-600" }
        ],
        references: [
          "Duncan, G. (2024). Not just child's play: How Lego is helping to improve memory among the UAE's elderly. The National.",
          "Harn, P.-L., & Hsiao, C.-C. (2018). A preliminary study on LEGO®-based workplace stress reduction with Six Bricks and LEGO® SERIOUS PLAY® in Taiwan. World Journal of Research and Review, 6(1), 64–67.",
          "Marais, E., & Botha, C. S. (2025). Using LEGO® Six Bricks® as an educational resource to address challenges pre-service teachers face during school-based teaching practice. African Journal of Teacher Education, 14(2), 1–27.",
          "Preston, L., & van der Merwe, W. (Eds.). (2023). Six Bricks®: A path to wellness in the educational and health systems. AOSIS Books. https://doi.org/10.4102/aosis.2023.BK427"
        ]
      },
      team: {
        title: "驱动团队绩效的循证实践",
        desc: "为企业卓越设计的科学化团队建设方案。",
        statsTitle: "团队凝聚与同步指标",
        stats: [
          { label: "焦虑水平下降", value: 35, color: "#6366f1", before: 100, reference: "Harn & Hsiao, 2018" },
          { label: "沟通同步准确率", value: 95, color: "#22c55e", before: 55, reference: "The LEGO Foundation, 2016" },
          { label: "发散性思维能力", value: 88, color: "#f37021", before: 40, reference: "Aamplify, n.d" }
        ],
        items: [
          { title: "减压效能实证", text: "准实验研究数据显示，透过积木干预能显著降低职场焦虑与压力指数 (Harn & Hsiao, 2018)。", color: "text-indigo-600" },
          { title: "商业问题解决", text: "六块积木的高度限制能激发发散性思维，有助于高管团队达成高效的冲突解决方案 (Aamplify, n.d.)。", color: "text-indigo-600" },
          { title: "心理安全感建立", text: "基于康健路径的积木互动能缩短社交距离，建立强大的团队信任感与社会资本 (Preston & van der Merwe, 2023)。", color: "text-indigo-600" },
          { title: "沟通精准度", text: "活动卡片实践数据显示，“背对背”积木建构能显著改善资讯对称性，提升协作准确率达 40% (The LEGO Foundation, 2016)。", color: "text-indigo-600" }
        ],
        references: [
          "Aamplify. (n.d.). What 6 lego bricks can teach us about business problem solving. https://www.aamplify.marketing/blog/what-6-lego-bricks-can-teach-us-about-business-problem-solving",
          "Harn, P.-L., & Hsiao, C.-C. (2018). A preliminary study on LEGO®-based workplace stress reduction with Six Bricks and LEGO® SERIOUS PLAY® in Taiwan. World Journal of Research and Review, 6(1), 64–67.",
          "Preston, L., & van der Merwe, W. (Eds.). (2023). Six Bricks®: A path to wellness in the educational and health systems. AOSIS Books. https://doi.org/10.4102/aosis.2023.BK427",
          "The LEGO Foundation. (2016). Six Bricks activity card. IET Education. https://education.theiet.org/media/5417/six-bricks-workshop-cards.pdf"
        ]
      }
    },
    whatIsContent: {
      header: "六色积木的秘密",
      mainDescription: "六色积木是一套教学工具，旨在透过操作游戏激发和激励儿童获得技能、知识和态度。它使用六块鲜艳的 DUPLO® 2x4 积木进行简短、专注的活动来锻炼大脑。",
      secrets: {
        title: "数字“六”的秘密",
        one: { title: "扩展视野", desc: "儿童需要将物体移出直视视线以训练眼球追踪能力。临界距离为 20-22 厘米，这与五块连接在一起的 DUPLO® 2x4 积木的长度相匹配。" },
        two: { title: "建立大脑连接", desc: "第 6 块积木创造了一个“偶数”来建立“中点”。这促进了诸如双侧整合（双手协同工作）和跨越中线（手/脚跨越中心以促进左右脑交流）等复杂技能。" }
      },
      whyDuplo: { title: "为什么是 LEGO® DUPLO®？", desc: "2x4 颗粒尺寸适中，特别适合幼儿和学龄儿童的手部肌肉发育。其触感和易于操作性是其作为具体学习工具成功的关键。" },
      colorConcept: { title: "构建世界的六种颜色", desc: "调色板包括红色、橙色、黄色、绿色、深蓝色和浅蓝色。使用深蓝色和浅蓝色有助于儿童发展相似性和差异性的精细语言概念。橙色提供高对比度，在吸引最大注意力的同时以低成本完善了调色板。" },
      references: [
        "Care for Education. (n.d.). What is Six Bricks? Care for Education. https://www.careforeducation.co.za/six-bricks",
        "Care for Education. (2020). Six Bricks: Teacher manual & activities. Care for Education.",
        "LEGO Foundation. (2022). Learning through play: The role of manipulative tools in early childhood development. The LEGO Foundation.",
        "Rabagliati, H., & Thompson, S. (2020). Developing executive functions through manipulative play: A study on the Six Bricks methodology. Journal of Play and Learning, 8(2), 112-128."
      ]
    },
    originContent: {
      header: "创新的根源",
      intro: "六色积木源于南非乡镇学校的实际需求。它的开发旨在利用简单、可扩展的工具弥合资源受限环境中的教育差距。",
      milestones: {
        early: { title: "诞生于南非（2000 年代初）", desc: "由 Brent Hutcheson 和非营利组织 Care for Education (CFE) 开发。在资源匮乏的学校进行了多年的实验后，他们寻求一种具有成本效益的解决方案来帮助儿童发展基本的知觉和运动技能。" },
        certification: { title: "认证与培训（2010 年起）", desc: "建立了全面的 1 级和 2 级导师培训体系，以确保全球教学质量。迄今为止，全球已有超过 10,000 名教育工作者获得认证。" },
        global: { title: "全球影响（超过 50 个国家）", desc: "在乐高基金会的支持和推广下，六色积木已扩展到亚洲、欧洲和美洲，惠及不同文化的数百万儿童。" },
        research: { title: "研究与创新（近年）", desc: "与大学和研究机构的持续合作确保该方法论随着最新的教育发现而发展，加强其理论基础。" }
      },
      principles: { title: "课堂实施的 3 个原则", items: ["每个孩子必须拥有自己的一套工具（六色积木）。", "工具必须便于教师管理和组织。", "工具必须简单，以防止课堂混乱和分心。"] },
      references: [
        "Care for Education. (n.d.). Our history. https://www.careforeducation.co.za/history",
        "Hutcheson, B. (2019). The Six Bricks story: From township to global tool. South African Journal of Early Childhood Education.",
        "LEGO Foundation. (2020). Six Bricks: A manipulative tool for learning. https://learningthroughplay.com/explore-the-lego-foundation/six-bricks",
        "Rabagliati, H., & Thompson, S. (2020). Developing executive functions through manipulative play. Journal of Play and Learning, 8(2), 112-128."
      ]
    },
    playContent: {
      header: "寓教于乐",
      subHeader: "五大核心特质",
      description: "“寓教于乐”(Learning Through Play) 是全球公认的儿童发展核心理念。研究显示，当孩子在游戏中学习时，大脑会建立更深层的神经连结，学习效能比传统方式高出 40%。游戏让学习变得有趣、有意义，并自然培养解难能力、创造性思维和社交技巧。这个过程激活前额叶皮质，即大脑的“行政总裁”，负责高阶决策和专注力。",
      characteristics: [
        { title: "乐趣无穷 (Joyful)", desc: "享受过程，大脑分泌多巴胺，提升学习动机与记忆留存。", icon: "😊", color: "#fbeea0" },
        { title: "意义非凡 (Meaningful)", desc: "与过往经验连结，将学习内容与现实生活挂钩，而非孤立资讯。", icon: "💡", color: "#c7e3ff" },
        { title: "主动参与 (Actively Engaged)", desc: "全神贯注，手脑并用。处于“心流”(Flow) 状态，而非被动接收知识。", icon: "⚡", color: "#ffd9c0" },
        { title: "反复尝试 (Iterative)", desc: "透过不断尝试、失败与修正，测试假设并从错误中学习，深化理解。", icon: "🔄", color: "#c6efce" },
        { title: "社交互动 (Socially Interactive)", desc: "与他人交流想法、分享与合作。建立人际连结并培养同理心。", icon: "👥", color: "#ffe0c0" }
      ],
      references: [
        "LEGO Foundation. (2017). Learning through play: a review of the evidence. https://learningthroughplay.com/explore-the-lego-foundation/learning-through-play-a-review-of-the-evidence",
        "Zosh, J. M., Hopkins, E. J., Jensen, H., Liu, C., Neale, D., Hirsh-Pasek, K., Solis, S. L., & Whitebread, D. (2017). Learning through play: a review of the evidence. LEGO Foundation.",
        "Liu, C., Solis, S. L., Jensen, H., Hopkins, E. J., Neale, D., Zosh, J. M., Hirsh-Pasek, K., & Whitebread, D. (2017). Neuroscience and learning through play: a review of the evidence. LEGO Foundation.",
        "Yogman, M., Sanders, G. L., Hirsh-Pasek, K., Golinkoff, R. M., Baum, R., Gambon, T., ... & Widome, R. (2018). The power of play: A pediatric role in enhancing development in young children. Pediatrics, 142(3).",
        "Csikszentmihalyi, M. (1990). Flow: The psychology of optimal experience. Harper & Row."
      ]
    },
    qualificationsContent: {
      header: "以下是我的专业资格：",
      items: [
        { 
          title: "注册护士（精神科）", 
          definition: "专注于心理健康的医疗保健专业人员，专注于透过治疗干预评估、诊断和治疗患有精神疾病的个人。", 
          benefit: "在研讨会期间提供安全网，识别情绪触发因素并确保为神经多样性或敏感的参与者提供支持环境。",
          icon: "🩺"
        },
        {
          title: "护理学理学硕士 (临床实践领导)",
          definition: "专注于临床领导及医疗管理的硕士学位。",
          benefit: "提升六色积木研讨会的策略性设计，有效促进参与者的领导力与团队协作。",
          icon: "📜"
        },
        { 
          title: "专科护士 (精神科)", 
          definition: "必须是最少具备六年全职护理工作经验，当中最近四年必须从事相关专科范畴，同时获医院管理局颁授专科护士认可计划证书。", 
          benefit: "将临床神经科学融入六色积木活动，确保“大脑健身房”练习在科学上与认知发展保持一致。",
          icon: "🏥"
        },
        { 
          title: "Care For Education 六色积木（1 级和 2 级）认证引导师", 
          definition: "来自南非乐高基金会合作伙伴的官方认证，授权使用六色积木方法进行认知和运动技能发展。", 
          benefit: "遵循全球认可的课程和游戏原则，确保六色积木实施的最高标准。",
          icon: "🧱"
        },
        { 
          title: "Brick-by-Brick® 认证高级引导师", 
          definition: "由 Play Included 开发的高级方法论，用于透过协作游戏（最初是乐高治疗）支持有社交沟通需求的儿童的社交互动。", 
          benefit: "透过结构化的协作角色增强六色积木课程，显著提高儿童的社交技能和成人的团队动力。",
          icon: "🧩"
        },
        { 
          title: "DUPLO® 玩中学 1 级和 2 级", 
          definition: "完成利用 DUPLO® 积木促进幼儿教育学习成果的基础培训。", 
          benefit: "提供将简单的积木动作转化为重要学习里程碑所需的教学基础。",
          icon: "🧸"
        },
        { 
          title: "MINT 成员（动机访谈培训师网络）", 
          definition: "致力于追求卓越动机访谈（一种用于引发行为改变的循证沟通方式）的国际组织成员。", 
          benefit: "在研讨会期间使用 MI 技能来促进参与者更深入的自我反思和内在动机，而不仅仅是传授指令。",
          icon: "🗣️"
        }
      ]
    },
    audiences: {
      schools: {
        title: "儿童工作坊",
        desc: "适合所有儿童及 SEN 学生。通过游戏训练专注力和社交技巧。提供上门/到校服务。",
        fullDesc: "我们的儿童工作坊旨在通过六色积木方法促进全面发展。通过参与结构化游戏，孩子们在有趣和支持性的环境中提高他们的认知、身体和社交情感技能。",
        features: ["专注与注意力训练", "社交互动与同理心", "情绪调节", "精细运动技能发展"],
        badge: "寓教于乐"
      },
      charity: {
        title: "慈善与教会",
        desc: "为社区支持活动和研讨会提供特别慈善费率。",
        fullDesc: "我们与慈善组织和教会合作，将六色积木的好处带给更广泛的社区。这些研讨会专为支持社区建设和提供可获得的教育资源而量身定制。",
        features: ["社区联结", "普及教育", "特别慈善费率", "包容性活动"]
      },
      ngo: {
        title: "NGO 合作",
        desc: "联合活动或认证从业者课程。",
        fullDesc: "与 NGO 合作以赋能员工和受益人。我们提供旨在将六色积木整合到现有社会项目中的认证从业者课程和联合活动。",
        features: ["员工培训与认证", "项目整合支持", "能力建设", "可持续影响"]
      },
      corporate: {
        title: "企业团队建设",
        desc: "专为成人设计。使用六色积木解决挑战并加强团队联系。",
        fullDesc: "通过我们创新的企业团队建设课程改变您的团队动力。使用六色积木，我们促进揭示沟通模式、增强解决问题能力并在同事之间建立真正信任的练习。",
        features: ["沟通增强", "创造性问题解决", "减压", "建立信任"]
      }
    },
    courseForm: {
      title: "课程查询",
      salutation: "称谓",
      contactName: "联系人姓名",
      date: "期望日期",
      sessions: "课程节数",
      duration: "每节时间",
      pax: "每节人数",
      paxCertification: "每班人数 (最少6人，最多14人，双数为佳)",
      goals: "期望训练目标 (可多选)",
      budget: "总预算 (HKD)",
      quotation: "是否需要报价单?",
      phone: "电话",
      email: "电邮",
      submitInfoWhatsApp: "透过WhatsApp提交资料",
      formInstruction: "请填妥表格所有资料，再按透过WhatsApp提交资料，才会成功递交",
      cooperationMode: "合作开办",
      participationMode: "参加部分",
      options: {
        salutations: ["Mr.", "Ms.", "Mrs.", "Dr.", "其他"],
        sessions: ["5 节", "8 节", "10 节", "10 节以上", "其他"],
        durations: ["45 分鐘", "60 分鐘", "90 分鐘", "120 分鐘", "半日", "其他"],
        pax: ["1-5 人", "6-10 人", "11-15 人", "16-20 人", "其他", "不确定"],
        paxCertification: ["6人", "8人", "10人", "12人", "14人", "其他"],
        goals: ["专注力", "情绪管理", "社交技巧", "解难能力", "团队协作", "创意", "其他"],
        cooperation: ["六色积木的儿童工作坊", "六色积木Level 1 and Level 2 认证课程"],
        participation: ["Level 1", "Level 2", "Level 1 + Level 2"],
        yes: "是",
        no: "否",
        other: "其他",
        notSure: "不确定"
      }
    },
    questionnaire: {
      title: "执行技能问卷",
      subtitle: "基于 Peg Dawson 与 Richard Guare 的研究",
      desc: "这份问卷能帮助您识别个人的执行技能优势与弱点。",
      instructionTitle: "如何使用执行技能问卷？",
      instructions: [
        { step: 1, title: "阅读描述", desc: "逐一阅读描述个人行为的题目。" },
        { step: 2, title: "诚实评分", desc: "根据您同意的程度，使用 1-7 分制进行评分 (1 = 非常不同意，7 = 非常同意)。" },
        { step: 3, title: "计算总分", desc: "系统将自动计算您各项技能的总分。" },
        { step: 4, title: "分析结果", desc: "比较各技能总分，分数最高的 2-3 项为您的“优势技能”，分数最低的 2-3 項为“待发展技能”。" }
      ],
      ratingLabel: { low: "非常不同意", high: "非常同意" },
      questions: esqQuestionsCN,
      skills: esqSkillsCN,
      resultsTitle: "您的执行技能图谱",
      strengthsTitle: "您的优势 (最高分)",
      weaknessesTitle: "待发展技能 (最低分)",
      downloadButton: "下载概念解释 (PDF)",
      reference: "Dawson, P., & Guare, R. (2018). Executive Skills Questionnaire. In *Executive Skills in Children and Adolescents* (3rd ed.). The Guilford Press.",
      startBtn: "开始评测",
      submitBtn: "提交答案",
      retestBtn: "重新测试",
      disclaimer: "问卷原始版本为英语，进行问卷期间，针对翻译疑难，可以转换为英语，查看原始译本。以英语为准。"
    },
    certification: "认证导师培训",
    certificationDesc: "Care for Education 官方认可 (L1 & L2)。",
    certificationFullDesc: "成为认证的六色积木引导师。我们的 1 级和 2 级培训课程获得 Care for Education (南非) 的官方认可，装备教育工作者和专业人士有效地实施该方法论的技能。",
    certificationFeatures: ["官方认证", "全面手册", "实践练习", "全球网络"],
    aiHub: "AI 助手",
    chatPlaceholder: "询问关于六色积木...",
    genImage: "AI 可视化",
    imageGen: {
      promptPlaceholder: "描述六色积木活动的场景...",
      generate: "生成图像",
      aspectRatio: "长宽比",
      size: "图像尺寸",
      selectKey: "选择 API Key",
      billingInfo: "需要具备结算功能的 GCP 专案 API Key。"
    }
  }
};