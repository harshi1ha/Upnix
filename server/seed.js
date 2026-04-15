const mongoose = require('mongoose');
const Company = require('./models/Company');
require('dotenv').config();

const companies = [
  // ==========================================
  // PRODUCT BASED COMPANIES
  // ==========================================
  // 1. GOOGLE
  {
    name: "Google",
    industry: "Tech",
    type: "Product-Based",
    roles: [
      {
        roleName: "Software Engineer (L3 - Entry)",
        rounds: [
          { roundName: "Phone Screen", duration: "45 mins", topics: ["Arrays", "Strings"], difficulty: "Medium", description: "One coding problem. Must solve perfectly." },
          { roundName: "Onsite Round 1 (Coding)", duration: "45 mins", topics: ["Graphs", "DP"], difficulty: "Hard", description: "Focus on Graph traversal (BFS/DFS)." },
          { roundName: "Onsite Round 2 (Coding)", duration: "45 mins", topics: ["Recursion", "Trees"], difficulty: "Hard", description: "Tree path finding or manipulation." },
          { roundName: "Googlyness (Behavioral)", duration: "45 mins", topics: ["Culture Fit"], difficulty: "Easy", description: "Situational questions." }
        ],
        lastMinuteChecklist: ["Revise Dijkstra", "Practice Recursion", "Big O Notation"],
        resumeKeywords: ["C++", "Python", "DSA", "Competitive Programming"],
        hrQuestions: [
          { question: "Tell me about a time you failed.", context: "Humility", starTip: "Focus on learning and improvement." }
        ]
      },
      {
        roleName: "Software Engineer (L4 - Mid)",
        rounds: [
          { roundName: "System Design", duration: "60 mins", topics: ["Scalability"], difficulty: "Hard", description: "Design Google Photos or Maps." },
          { roundName: "Coding Round 1", duration: "45 mins", topics: ["DP", "Tries"], difficulty: "Hard", description: "Optimization focus." }
        ],
        lastMinuteChecklist: ["System Design Primer", "CAP Theorem"],
        resumeKeywords: ["Distributed Systems", "Scalability", "Java", "Go"],
        hrQuestions: [
          { question: "How do you handle disagreement with a PM?", context: "Collaboration", starTip: "Data-driven negotiation." }
        ]
      },
      {
        roleName: "Site Reliability Engineer (SRE)",
        rounds: [
          { roundName: "Linux Internals", duration: "45 mins", topics: ["OS", "Networking"], difficulty: "Medium", description: "Sysadmin skills + coding." },
          { roundName: "Non-Abstract Large System Design", duration: "60 mins", topics: ["Reliability"], difficulty: "Hard", description: "Design a monitoring system." }
        ],
        lastMinuteChecklist: ["Linux Boot Process", "TCP/IP Handshake", "Inode concepts"],
        resumeKeywords: ["Linux", "Bash", "Python", "Kubernetes", "Ansible"],
        hrQuestions: [
          { question: "Describe a production outage you fixed.", context: "Grace under pressure", starTip: "Root cause analysis + Prevention." }
        ]
      },
      {
        roleName: "Product Manager",
        rounds: [
          { roundName: "Product Sense", duration: "45 mins", topics: ["Strategy"], difficulty: "Hard", description: "Design a feature for the blind." },
          { roundName: "Analytical", duration: "45 mins", topics: ["Metrics"], difficulty: "Medium", description: "Estimate number of piano tuners in Chicago." }
        ],
        lastMinuteChecklist: ["Product Execution", "Metric Defination"],
        resumeKeywords: ["Strategy", "Roadmap", "SQL", "User Research"],
        hrQuestions: [
          { question: "Favorite product and why?", context: "Product Taste", starTip: "Critique the UX and business model." }
        ]
      },
      {
        roleName: "UX Engineer",
        rounds: [
          { roundName: "Portfolio Review", duration: "60 mins", topics: ["Design"], difficulty: "Medium", description: "Walk through 2 past projects." },
          { roundName: "Frontend Coding", duration: "45 mins", topics: ["JS", "CSS"], difficulty: "Medium", description: "Build a widget in vanilla JS." }
        ],
        lastMinuteChecklist: ["A11y Standards", "CSS Grid/Flexbox"],
        resumeKeywords: ["Figma", "React", "Accessibility", "Prototyping"],
        hrQuestions: [
          { question: "How do you compromise with Engineering?", context: "Cross-functional", starTip: "Balancing user needs vs tech debt." }
        ]
      },
      {
        roleName: "Security Engineer",
        rounds: [
          { roundName: "Security Domain", duration: "45 mins", topics: ["OWASP", "Crypto"], difficulty: "Hard", description: "Find vulnerabilities in code snippets." },
          { roundName: "Coding", duration: "45 mins", topics: ["Scripting"], difficulty: "Medium", description: "Automate a security check." }
        ],
        lastMinuteChecklist: ["XSS/CSRF", "Crypto basics", "TLS Handshake"],
        resumeKeywords: ["Pen Testing", "Python", "AppSec", "Cryptography"],
        hrQuestions: [
          { question: "Explain SSL to a 5 year old.", context: "Communication", starTip: "Use simple analogies (lock and key)." }
        ]
      },
      {
        roleName: "Technical Program Manager (TPM)",
        rounds: [
          { roundName: "Program Management", duration: "45 mins", topics: ["Risk", "Timeline"], difficulty: "Medium", description: "Handling a late project." },
          { roundName: "Technical Judgment", duration: "45 mins", topics: ["Architecture"], difficulty: "Medium", description: "Tradeoffs between SQL vs NoSQL." }
        ],
        lastMinuteChecklist: ["Agile/Scrum", "Risk Management Matrix"],
        resumeKeywords: ["JIRA", "Agile", "Cross-functional", "Leadership"],
        hrQuestions: [
          { question: "Managed a dependency that failed?", context: "Execution", starTip: "Communication overhead and backup plans." }
        ]
      },
      {
        roleName: "Data Scientist",
        rounds: [
          { roundName: "Statistics", duration: "45 mins", topics: ["Probability"], difficulty: "Hard", description: "Hypothesis testing & p-values." },
          { roundName: "ML Design", duration: "60 mins", topics: ["Modeling"], difficulty: "Hard", description: "Design a recommendation system." }
        ],
        lastMinuteChecklist: ["Bayes Theorem", "Regression vs Classification"],
        resumeKeywords: ["Python", "Pandas", "TensorFlow", "SQL", "Statistics"],
        hrQuestions: [
          { question: "Explain a complex model to a stakeholder.", context: "Communication", starTip: "Focus on business value, not math." }
        ]
      },
      {
        roleName: "Frontend Engineer",
        rounds: [
          { roundName: "JS Fundamentals", duration: "45 mins", topics: ["Closures", "DOM"], difficulty: "Medium", description: "Implement Debounce/Throttle." },
          { roundName: "UI Architecture", duration: "60 mins", topics: ["State Management"], difficulty: "Hard", description: "Design a News Feed widget." }
        ],
        lastMinuteChecklist: ["Event Bubbling", "React Lifecycle", "Performance"],
        resumeKeywords: ["React", "TypeScript", "Redux", "Webpack"],
        hrQuestions: [
          { question: "Opinion on Tailwind vs CSS-in-JS?", context: "Tech Opinion", starTip: "Discuss tradeoffs, don't just pick one." }
        ]
      }
    ]
  },
  // 2. AMAZON
  {
    name: "Amazon",
    industry: "E-Commerce",
    type: "Product-Based",
    roles: [
      {
        roleName: "SDE I (New Grad)",
        rounds: [
          { roundName: "Online Assessment (OA)", duration: "90 mins", topics: ["Arrays", "DP"], difficulty: "Medium", description: "2 Coding Qs + LP Survey." },
          { roundName: "Final Loop 1", duration: "60 mins", topics: ["Coding", "LP"], difficulty: "Medium", description: "Dictionary/HashMap problem." }
        ],
        lastMinuteChecklist: ["16 Leadership Principles", "HashMap implementation"],
        resumeKeywords: ["Java", "C++", "Project Experience", "Internship"],
        hrQuestions: [
          { question: "Time you disagreed with a boss?", context: "Have Backbone", starTip: "Respectful challenge + commitment." }
        ]
      },
      {
        roleName: "SDE II",
        rounds: [
          { roundName: "System Design", duration: "60 mins", topics: ["LLD/HLD"], difficulty: "Hard", description: "Design Fulfillment Center System." },
          { roundName: "Bar Raiser", duration: "60 mins", topics: ["LP"], difficulty: "Hard", description: "Grills you on behaviors." }
        ],
        lastMinuteChecklist: ["System Design", "LP Stories (STAR method)"],
        resumeKeywords: ["Distributed Systems", "Microservices", "AWS"],
        hrQuestions: [
          { question: "Time you simplified a process?", context: "Invent and Simplify", starTip: "Removed manual steps." }
        ]
      },
      {
        roleName: "Frontend Engineer",
        rounds: [
          { roundName: "Logical Coding", duration: "60 mins", topics: ["DOM"], difficulty: "Medium", description: "Build a star rating component." },
          { roundName: "FE System Design", duration: "60 mins", topics: ["Rendering"], difficulty: "Hard", description: "Optimization of large lists." }
        ],
        lastMinuteChecklist: ["Critical Rendering Path", "Box Model"],
        resumeKeywords: ["React", "JavaScript", "CSS3", "Performance"],
        hrQuestions: [
          { question: "Customer obsession example?", context: "Customer Obsession", starTip: "Solved user pain point proactively." }
        ]
      },
      {
        roleName: "Applied Scientist",
        rounds: [
          { roundName: "ML Breadth", duration: "60 mins", topics: ["ML"], difficulty: "Hard", description: "Bias/Variance tradeoff." },
          { roundName: "Coding", duration: "60 mins", topics: ["DSA"], difficulty: "Medium", description: "Standard LeetCode Medium." }
        ],
        lastMinuteChecklist: ["Gradient Descent", "NLP/CV basics"],
        resumeKeywords: ["PyTorch", "AWS SageMaker", "Research Papers"],
        hrQuestions: [
          { question: "Deep dive example?", context: "Dive Deep", starTip: "Went to source code or raw data." }
        ]
      },
      {
        roleName: "Business Intelligence Engineer (BIE)",
        rounds: [
          { roundName: "SQL Coding", duration: "60 mins", topics: ["SQL"], difficulty: "Medium", description: "Complex joins and window functions." },
          { roundName: "Data Modeling", duration: "60 mins", topics: ["Schema"], difficulty: "Medium", description: "Star vs Snowflake schema." }
        ],
        lastMinuteChecklist: ["Window Functions", "ETL Pipelines"],
        resumeKeywords: ["SQL", "Tableau", "Redshift", "QuickSight"],
        hrQuestions: [
          { question: "Delivered results under tight deadline?", context: "Deliver Results", starTip: "Prioritization hacks." }
        ]
      },
      {
        roleName: "Data Engineer",
        rounds: [
          { roundName: "Big Data", duration: "60 mins", topics: ["Spark"], difficulty: "Hard", description: "Handling TB scale data." },
          { roundName: "SQL & Python", duration: "60 mins", topics: ["Scripting"], difficulty: "Medium", description: "Data transformation script." }
        ],
        lastMinuteChecklist: ["Hadoop ecosystem", "Spark RDD/Dataframes"],
        resumeKeywords: ["Spark", "Airflow", "Python", "SQL"],
        hrQuestions: [
          { question: "Improvement example?", context: "Insist on Highest Standards", starTip: "Refactored legacy pipeline." }
        ]
      },
      {
        roleName: "Cloud Support Engineer",
        rounds: [
          { roundName: "Troubleshooting", duration: "60 mins", topics: ["Networking"], difficulty: "Medium", description: "Debug connectivity issue." },
          { roundName: "OS Basics", duration: "45 mins", topics: ["Linux"], difficulty: "Medium", description: "Process management." }
        ],
        lastMinuteChecklist: ["DNS", "HTTP Codes", "Linux Commands"],
        resumeKeywords: ["AWS", "Networking", "Linux", "Troubleshooting"],
        hrQuestions: [
          { question: "Handled difficult customer?", context: "Customer Obsession", starTip: "Empathy + Solution." }
        ]
      },
      {
        roleName: "Manager (SDM)",
        rounds: [
          { roundName: "Team Management", duration: "60 mins", topics: ["People"], difficulty: "Hard", description: "Hiring and firing scenarios." },
          { roundName: "Project Delivery", duration: "60 mins", topics: ["Execution"], difficulty: "Hard", description: "Roadmap planning." }
        ],
        lastMinuteChecklist: ["Servant Leadership", "Hiring Bar"],
        resumeKeywords: ["Leadership", "Agile", "Mentorship", "Roadmap"],
        hrQuestions: [
          { question: "Developed a team member?", context: "Hire and Develop the Best", starTip: "Promotion story." }
        ]
      }
    ]
  },
  // 3. MICROSOFT
  {
    name: "Microsoft",
    industry: "Tech",
    type: "Product-Based",
    roles: [
      {
        roleName: "Software Engineer",
        rounds: [
          { roundName: "Codility", duration: "90 mins", topics: ["Implementation"], difficulty: "Medium", description: "3 Questions." },
          { roundName: "Onsite 1", duration: "45 mins", topics: ["Strings"], difficulty: "Medium", description: "Reverse word in sentence." }
        ],
        lastMinuteChecklist: ["String Manipulation", "Unit Testing"],
        resumeKeywords: ["C#", ".NET", "Azure", "Java"],
        hrQuestions: [{ question: "Why Microsoft?", context: "Culture", starTip: "Growth mindset." }]
      },
      {
        roleName: "Senior SWE",
        rounds: [
          { roundName: "System Design", duration: "60 mins", topics: ["Azure"], difficulty: "Hard", description: "Design OneDrive." },
          { roundName: "Coding", duration: "60 mins", topics: ["Concurrency"], difficulty: "Hard", description: "Thread safety." }
        ],
        lastMinuteChecklist: ["Microservices patterns", "Azure Services"],
        resumeKeywords: ["Distributed Systems", "Azure", "Leadership"],
        hrQuestions: [{ question: "Mentored a junior?", context: "Leadership", starTip: "Empathy." }]
      },
      {
        roleName: "Data Scientist",
        rounds: [
          { roundName: "ML Algo", duration: "45 mins", topics: ["Trees"], difficulty: "Medium", description: "Random Forest vs XGBoost." }
        ],
        lastMinuteChecklist: ["Model Evaluation Metrics", "Bias"],
        resumeKeywords: ["Python", "Azure ML", "SQL"],
        hrQuestions: [{ question: "Learned from failure?", context: "Growth Mindset", starTip: "Specific example." }]
      },
      {
        roleName: "Support Engineer",
        rounds: [
          { roundName: "Tech Troubleshooting", duration: "60 mins", topics: ["Windows"], difficulty: "Medium", description: "Event logs debugging." }
        ],
        lastMinuteChecklist: ["Windows Internals", "Networking"],
        resumeKeywords: ["Powershell", "Windows Server", "Azure"],
        hrQuestions: [{ question: "Customer handling?", context: "Service", starTip: "Patience." }]
      },
      {
        roleName: "Product Manager",
        rounds: [
          { roundName: "Product Design", duration: "60 mins", topics: ["UX"], difficulty: "Medium", description: "Improve Teams." }
        ],
        lastMinuteChecklist: ["User Journey Map", "KPIs"],
        resumeKeywords: ["Product Management", "Data Analysis", "UX"],
        hrQuestions: [{ question: "Influence without authority?", context: "Collaboration", starTip: "Shared goals." }]
      },
      {
        roleName: "Cloud Solution Architect",
        rounds: [
          { roundName: "Architecture", duration: "60 mins", topics: ["Azure"], difficulty: "Hard", description: "Migrate on-prem to cloud." }
        ],
        lastMinuteChecklist: ["Migration Strategies (6 Rs)", "Security"],
        resumeKeywords: ["Azure", "Migration", "Architecture"],
        hrQuestions: [{ question: "Handled tough client?", context: "Consulting", starTip: "Listening." }]
      },
      {
        roleName: "Research Intern",
        rounds: [
          { roundName: "Research Talk", duration: "60 mins", topics: ["Thesis"], difficulty: "Hard", description: "Present your paper." }
        ],
        lastMinuteChecklist: ["Own Research", "SOTA models"],
        resumeKeywords: ["Publications", "PyTorch", "Research"],
        hrQuestions: [{ question: "Future Research?", context: "Vision", starTip: "Impact." }]
      },
      {
        roleName: "Hardware Engineer",
        rounds: [
          { roundName: "Circuits", duration: "60 mins", topics: ["Digital"], difficulty: "Hard", description: "Logic gate design." }
        ],
        lastMinuteChecklist: ["Verilog", "FPGA"],
        resumeKeywords: ["Verilog", "Hardware", "Circuits"],
        hrQuestions: [{ question: "Quality control?", context: "Detail", starTip: "Process." }]
      }
    ]
  },
  // 4. NETFLIX
  {
    name: "Netflix",
    industry: "Streaming",
    type: "Product-Based",
    roles: [
      { roleName: "Senior Software Engineer", rounds: [{ roundName: "Tech", duration: "60m", topics: ["SysDesign"], difficulty: "Hard", description: "Video streaming arc." }], lastMinuteChecklist: ["CDN", "Caching"], resumeKeywords: ["Java", "Distributed Systems"], hrQuestions: [{ question: "Context not Control", context: "Culture", starTip: "Autonomy." }] },
      { roleName: "Engineering Manager", rounds: [{ roundName: "Culture", duration: "60m", topics: ["Culture"], difficulty: "Very Hard", description: "Valiant effort required." }], lastMinuteChecklist: ["Memo", "Retention"], resumeKeywords: ["Management", "Culture"], hrQuestions: [{ question: "Radical Candor", context: "Feedback", starTip: "Directness." }] },
      { roleName: "UI Engineer", rounds: [{ roundName: "JS", duration: "60m", topics: ["React"], difficulty: "Hard", description: "TV UI Performance." }], lastMinuteChecklist: ["TV UI constraints", "React"], resumeKeywords: ["React", "Performance"], hrQuestions: [{ question: "High performance?", context: "Excellence", starTip: "Optimization." }] },
      { roleName: "Content Analyst", rounds: [{ roundName: "Analytical", duration: "45m", topics: ["Data"], difficulty: "Medium", description: "Content trends." }], lastMinuteChecklist: ["Excel", "Trends"], resumeKeywords: ["Data", "Content"], hrQuestions: [{ question: "Favorite Show?", context: "Passion", starTip: "Insight." }] },
      { roleName: "Data Engineer", rounds: [{ roundName: "Pipeline", duration: "60m", topics: ["Kafka"], difficulty: "Hard", description: "Real time analytics." }], lastMinuteChecklist: ["Flink", "Kafka"], resumeKeywords: ["Scala", "Big Data"], hrQuestions: [{ question: "Freedom?", context: "Culture", starTip: "Responsibility." }] },
      { roleName: "SRE", rounds: [{ roundName: "Outage", duration: "60m", topics: ["Debug"], difficulty: "Hard", description: "Chaos Monkey scenario." }], lastMinuteChecklist: ["Chaos Engineering", "Linux"], resumeKeywords: ["Chaos Monkey", "AWS"], hrQuestions: [{ question: "Reliability?", context: "Core", starTip: "Uptime." }] },
      { roleName: "Product Designer", rounds: [{ roundName: "Portfolio", duration: "60m", topics: ["UX"], difficulty: "Hard", description: "Global audience design." }], lastMinuteChecklist: ["Global UX", "A/B Testing"], resumeKeywords: ["Figma", "Design"], hrQuestions: [{ question: "User empathy?", context: "User", starTip: "Story." }] },
      { roleName: "Security Engineer", rounds: [{ roundName: "AppSec", duration: "60m", topics: ["DRM"], difficulty: "Hard", description: "Protecting content." }], lastMinuteChecklist: ["DRM", "OAuth"], resumeKeywords: ["Security", "Encryption"], hrQuestions: [{ question: "Integrity?", context: "Values", starTip: "Honesty." }] }
    ]
  },
  // 5. META
  {
    name: "Meta",
    industry: "Social Media",
    type: "Product-Based",
    roles: [
      { roleName: "Rotational Engineer", rounds: [{ roundName: "Ninja", duration: "45m", topics: ["LC Medium"], difficulty: "Medium", description: "2 Qs." }], lastMinuteChecklist: ["Arrays", "Strings"], resumeKeywords: ["Python", "Generalist"], hrQuestions: [{ question: "Move Fast?", context: "Value", starTip: "Speed." }] },
      { roleName: "Production Engineer", rounds: [{ roundName: "Linux", duration: "60m", topics: ["Sysadmin"], difficulty: "Hard", description: "Kernel internals." }], lastMinuteChecklist: ["Linux", "Python"], resumeKeywords: ["SRE", "Linux"], hrQuestions: [{ question: "Fixed production?", context: "Impact", starTip: "Scale." }] },
      { roleName: "Data Scientist", rounds: [{ roundName: "Product Case", duration: "60m", topics: ["Metrics"], difficulty: "Hard", description: "Metric movement." }], lastMinuteChecklist: ["SQL", "Product Sense"], resumeKeywords: ["SQL", "Python"], hrQuestions: [{ question: "Why Meta?", context: "Mission", starTip: "Connection." }] },
      { roleName: "Product Designer", rounds: [{ roundName: "App Critique", duration: "45m", topics: ["Design"], difficulty: "Medium", description: "Critique simple app." }], lastMinuteChecklist: ["Interaction Design", "Visuals"], resumeKeywords: ["Figma", "Prototyping"], hrQuestions: [{ question: "Conflict?", context: "People", starTip: "Empathy." }] },
      { roleName: "Research Scientist", rounds: [{ roundName: "AI Code", duration: "60m", topics: ["PyTorch"], difficulty: "Hard", description: "Implement transformer." }], lastMinuteChecklist: ["Papers", "PyTorch"], resumeKeywords: ["AI", "ML", "PhD"], hrQuestions: [{ question: "Open Source?", context: "Community", starTip: "Contribution." }] },
      { roleName: "Frontend Engineer", rounds: [{ roundName: "Jedi", duration: "45m", topics: ["JS"], difficulty: "Medium", description: "Build emitter." }], lastMinuteChecklist: ["DOM", "JS"], resumeKeywords: ["React", "Relay"], hrQuestions: [{ question: "Boldness?", context: "Value", starTip: "Risk taking." }] },
      { roleName: "Enterprise Engineer", rounds: [{ roundName: "Coding", duration: "45m", topics: ["Fullstack"], difficulty: "Medium", description: "Internal tools." }], lastMinuteChecklist: ["React", "PHP"], resumeKeywords: ["Fullstack", "Internal Tools"], hrQuestions: [{ question: "Impact?", context: "Focus", starTip: "Efficiency." }] },
      { roleName: "Network Engineer", rounds: [{ roundName: "Net Design", duration: "60m", topics: ["BGP"], difficulty: "Hard", description: "Datacenter fabric." }], lastMinuteChecklist: ["BGP", "OSPF"], resumeKeywords: ["Cisco", "Juniper"], hrQuestions: [{ question: "Scale?", context: "Think Big", starTip: "Global." }] }
    ]
  },
  // 6. APPLE
  {
    name: "Apple",
    industry: "Hardware/Tech",
    type: "Product-Based",
    roles: [
      { roleName: "Software Engineer", rounds: [{ roundName: "Coding", duration: "60m", topics: ["Strings"], difficulty: "Medium", description: "Clean code." }], lastMinuteChecklist: ["Code Quality", "Testing"], resumeKeywords: ["C", "C++"], hrQuestions: [{ question: "Why Apple?", context: "Passion", starTip: "Product." }] },
      { roleName: "Hardware Engineer", rounds: [{ roundName: "Circuit", duration: "60m", topics: ["Analog"], difficulty: "Hard", description: "OpAmp design." }], lastMinuteChecklist: ["Circuit Analysis", "Signal Processing"], resumeKeywords: ["EE", "Verilog"], hrQuestions: [{ question: "Detail?", context: "Perfection", starTip: "Precision." }] },
      { roleName: "iOS Engineer", rounds: [{ roundName: "iOS", duration: "60m", topics: ["Swift"], difficulty: "Hard", description: "Memory mgmt ARC." }], lastMinuteChecklist: ["UIKit", "SwiftUI"], resumeKeywords: ["Swift", "Objective-C"], hrQuestions: [{ question: "Favorite App?", context: "Taste", starTip: "Design." }] },
      { roleName: "Siri Engineer", rounds: [{ roundName: "NLP", duration: "60m", topics: ["AI"], difficulty: "Hard", description: "Speech reco." }], lastMinuteChecklist: ["NLP", "ML"], resumeKeywords: ["Python", "NLP"], hrQuestions: [{ question: "Privacy?", context: "Values", starTip: "User Trust." }] },
      { roleName: "Engineering Project Manager (EPM)", rounds: [{ roundName: "Supply Chain", duration: "60m", topics: ["Ops"], difficulty: "Hard", description: "Vendor mgmt." }], lastMinuteChecklist: ["Gantt charts", "Negotiation"], resumeKeywords: ["Manufacturing", "Leadership"], hrQuestions: [{ question: "Vendor conflict?", context: "Ops", starTip: "Win-win." }] },
      { roleName: "Firmware Engineer", rounds: [{ roundName: "Embedded", duration: "60m", topics: ["C"], difficulty: "Hard", description: "Register manipulation." }], lastMinuteChecklist: ["Bitwise Ops", "RTOS"], resumeKeywords: ["C", "RTOS"], hrQuestions: [{ question: "Debugging?", context: "Skill", starTip: "Logic analyzer." }] },
      { roleName: "GPU Engineer", rounds: [{ roundName: "Graphics", duration: "60m", topics: ["OpenGL"], difficulty: "Hard", description: "Shader pipeline." }], lastMinuteChecklist: ["Linear Algebra", "Graphics"], resumeKeywords: ["OpenGL", "Metal"], hrQuestions: [{ question: "Innovation?", context: "Creativity", starTip: "New method." }] },
      { roleName: "Design Engineer", rounds: [{ roundName: "CAD", duration: "60m", topics: ["Mech"], difficulty: "Medium", description: "Part design." }], lastMinuteChecklist: ["Materials", "Tolerances"], resumeKeywords: ["SolidWorks", "NX"], hrQuestions: [{ question: "Craftsmanship?", context: "Quality", starTip: "Fit and finish." }] }
    ]
  },
  // 7. UBER
  {
    name: "Uber",
    industry: "Transportation",
    type: "Product-Based",
    roles: [
      { roleName: "Software Engineer II", rounds: [{ roundName: "Coding Signal", duration: "60m", topics: ["Concurrency"], difficulty: "Hard", description: "Realtime." }], lastMinuteChecklist: ["Concurrency", "Locks"], resumeKeywords: ["Go", "Java"], hrQuestions: [{ question: "Hustle?", context: "Value", starTip: "Grit." }] },
      { roleName: "Product Manager", rounds: [{ roundName: "Jam Session", duration: "60m", topics: ["Product"], difficulty: "Hard", description: "Driver experience." }], lastMinuteChecklist: ["Marketplace Dynamics", "Pricing"], resumeKeywords: ["Economics", "Strategy"], hrQuestions: [{ question: "Data vs Gut?", context: "Decision", starTip: "Balance." }] },
      { roleName: "Data Scientist", rounds: [{ roundName: "Analytics", duration: "60m", topics: ["SQL"], difficulty: "Hard", description: "Surge pricing logic." }], lastMinuteChecklist: ["A/B Testing", "SQL"], resumeKeywords: ["Python", "Stats"], hrQuestions: [{ question: "Impact?", context: "Value", starTip: "Revenue." }] },
      { roleName: "Mobile Engineer", rounds: [{ roundName: "App Arch", duration: "60m", topics: ["RIBs"], difficulty: "Hard", description: "Deep linking." }], lastMinuteChecklist: ["RIBs architecture", "Mobile"], resumeKeywords: ["Android", "iOS"], hrQuestions: [{ question: "Ownership?", context: "Value", starTip: "End to end." }] },
      { roleName: "SRE", rounds: [{ roundName: "System", duration: "60m", topics: ["Scale"], difficulty: "Hard", description: "Global outage." }], lastMinuteChecklist: ["Monitoring", "Alerting"], resumeKeywords: ["Golang", "Isolating"], hrQuestions: [{ question: "Oncall?", context: "Duty", starTip: "Response." }] },
      { roleName: "Marketing Manager", rounds: [{ roundName: "Campaign", duration: "60m", topics: ["Growth"], difficulty: "Medium", description: "User Acquisition." }], lastMinuteChecklist: ["CAC", "LTV"], resumeKeywords: ["Growth", "Marketing"], hrQuestions: [{ question: "Creativity?", context: "Idea", starTip: "Viral." }] },
      { roleName: "Ops Manager", rounds: [{ roundName: "Case Study", duration: "60m", topics: ["Ops"], difficulty: "Hard", description: "City launch." }], lastMinuteChecklist: ["P&L", "Excel"], resumeKeywords: ["Operations", "Strategy"], hrQuestions: [{ question: "Getting hands dirty?", context: "Ops", starTip: "Execution." }] },
      { roleName: "Legal Counsel", rounds: [{ roundName: "Regs", duration: "60m", topics: ["Law"], difficulty: "Hard", description: "Regulatory hurdles." }], lastMinuteChecklist: ["Labor Law", "Policy"], resumeKeywords: ["Law", "Policy"], hrQuestions: [{ question: " Ethics?", context: "Core", starTip: "Compliance." }] }
    ]
  },
  // 8. AIRBNB
  {
    name: "Airbnb",
    industry: "Hospitality",
    type: "Product-Based",
    roles: [
      { roleName: "Full Stack", rounds: [{ roundName: "Coding", duration: "60m", topics: ["String"], difficulty: "Hard", description: "Clean code." }], lastMinuteChecklist: ["React", "Ruby"], resumeKeywords: ["JS", "Ruby"], hrQuestions: [{ question: "Be a Host", context: "Value", starTip: "Hospitality." }] },
      { roleName: "Experience Designer", rounds: [{ roundName: "Portfolio", duration: "60m", topics: ["UX"], difficulty: "Hard", description: "Booking flow." }], lastMinuteChecklist: ["Visuals", "Flow"], resumeKeywords: ["Design", "Travel"], hrQuestions: [{ question: "Adventure?", context: "Value", starTip: "Story." }] },
      { roleName: "Data Scientist", rounds: [{ roundName: "Inference", duration: "60m", topics: ["Stats"], difficulty: "Hard", description: "Booking logic." }], lastMinuteChecklist: ["Causal Inference", "R"], resumeKeywords: ["R", "Python"], hrQuestions: [{ question: "Belonging?", context: "Value", starTip: "Inclusion." }] },
      { roleName: "Engineering Manager", rounds: [{ roundName: "Culture", duration: "60m", topics: ["Values"], difficulty: "Hard", description: "2 Core Value interviews." }], lastMinuteChecklist: ["Core Values", "Management"], resumeKeywords: ["People", "Leadership"], hrQuestions: [{ question: "Cereal Entrepreneur?", context: "Story", starTip: "Origin." }] },
      { roleName: "iOS Engineer", rounds: [{ roundName: "UI", duration: "60m", topics: ["Swift"], difficulty: "Medium", description: "Custom transition." }], lastMinuteChecklist: ["Animations", "CoreData"], resumeKeywords: ["Swift", "Mobile"], hrQuestions: [{ question: "Detail?", context: "Craft", starTip: "Polish." }] },
      { roleName: "PM", rounds: [{ roundName: "Product", duration: "60m", topics: ["Travel"], difficulty: "Medium", description: "New Category." }], lastMinuteChecklist: ["Market Fit", "User"], resumeKeywords: ["Product", "Travel"], hrQuestions: [{ question: "Host experience?", context: "Empathy", starTip: "Perspective." }] },
      { roleName: "QA Engineer", rounds: [{ roundName: "Auto", duration: "60m", topics: ["Selenium"], difficulty: "Medium", description: "Test frame." }], lastMinuteChecklist: ["Appium", "Selenium"], resumeKeywords: ["QA", "Testing"], hrQuestions: [{ question: "Quality?", context: "Standards", starTip: "No bugs." }] },
      { roleName: "Trust & Safety", rounds: [{ roundName: "Case", duration: "60m", topics: ["Risk"], difficulty: "Medium", description: "Fraud detection." }], lastMinuteChecklist: ["Fraud patterns", "SQL"], resumeKeywords: ["Risk", "Fraud"], hrQuestions: [{ question: "Safety?", context: "Priority", starTip: "User Safety." }] }
    ]
  },
  // 9. STRIPE
  {
    name: "Stripe",
    industry: "FinTech",
    type: "Product-Based",
    roles: [
      { roleName: "Backend Engineer", rounds: [{ roundName: "Integration", duration: "60m", topics: ["API"], difficulty: "Medium", description: "Laptop req." }], lastMinuteChecklist: ["Rest API", "HTTP"], resumeKeywords: ["Ruby", "Go"], hrQuestions: [{ question: "User First?", context: "Value", starTip: "DX." }] },
      { roleName: "Frontend Engineer", rounds: [{ roundName: "UI Component", duration: "60m", topics: ["React"], difficulty: "Medium", description: "Payment form." }], lastMinuteChecklist: ["Input masking", "A11y"], resumeKeywords: ["React", "JS"], hrQuestions: [{ question: "Craft?", context: "Value", starTip: "Microinteraction." }] },
      { roleName: "Infrastructure Eng", rounds: [{ roundName: "Debug", duration: "60m", topics: ["Sys"], difficulty: "Hard", description: "Fix broken test." }], lastMinuteChecklist: ["Unix", "Logs"], resumeKeywords: ["Infra", "Terraform"], hrQuestions: [{ question: "Reliability?", context: "Core", starTip: "99.999%." }] },
      { roleName: "Solutions Architect", rounds: [{ roundName: "Design", duration: "60m", topics: ["Integration"], difficulty: "Medium", description: "Client help." }], lastMinuteChecklist: ["Sales Eng", "API"], resumeKeywords: ["Sales", "Tech"], hrQuestions: [{ question: "Helpfulness?", context: "Value", starTip: "Support." }] },
      { roleName: "Technical Writer", rounds: [{ roundName: "Writing", duration: "60m", topics: ["Docs"], difficulty: "Medium", description: "Explain API." }], lastMinuteChecklist: ["Markdown", "Clarity"], resumeKeywords: ["Docs", "Writing"], hrQuestions: [{ question: "Curiosity?", context: "Value", starTip: "Learning." }] },
      { roleName: "Data Analyst", rounds: [{ roundName: "SQL", duration: "60m", topics: ["SQL"], difficulty: "Medium", description: "Transaction analysis." }], lastMinuteChecklist: ["Joins", "Group By"], resumeKeywords: ["SQL", "Looker"], hrQuestions: [{ question: "Macro Optimism?", context: "Value", starTip: "Long term." }] },
      { roleName: "Support Specialist", rounds: [{ roundName: "Email", duration: "45m", topics: ["Writing"], difficulty: "Med", description: "Draft response." }], lastMinuteChecklist: ["Empathy", "Tone"], resumeKeywords: ["Support", "Writing"], hrQuestions: [{ question: "Care?", context: "User", starTip: "Speed." }] },
      { roleName: "Recruiter", rounds: [{ roundName: "Sourcing", duration: "45m", topics: ["Search"], difficulty: "Med", description: "Find candidate." }], lastMinuteChecklist: ["Boolean search", "Sales"], resumeKeywords: ["HR", "Recruiting"], hrQuestions: [{ question: "Drive?", context: "Value", starTip: "Goals." }] }
    ]
  },
  // ==========================================
  // SERVICE BASED COMPANIES
  // ==========================================
  // 10. TCS
  {
    name: "TCS",
    industry: "IT Services",
    type: "Service-Based",
    roles: [
      { roleName: "TCS Ninja (Entry)", rounds: [{ roundName: "NQT", duration: "180m", topics: ["Aptitude"], difficulty: "Medium", description: "National test." }], lastMinuteChecklist: ["Quants", "Verbal"], resumeKeywords: ["Java", "C++"], hrQuestions: [{ question: "Relocation?", context: "Flexibility", starTip: "Yes." }] },
      { roleName: "TCS Digital (Specialist)", rounds: [{ roundName: "Adv Coding", duration: "60m", topics: ["DSA"], difficulty: "Hard", description: "Competitive coding." }], lastMinuteChecklist: ["DP", "Graphs"], resumeKeywords: ["Python", "ML"], hrQuestions: [{ question: "Why Digital?", context: "Ambition", starTip: "Tech passion." }] },
      { roleName: "TCS Prime (High Value)", rounds: [{ roundName: "Design", duration: "60m", topics: ["Fullstack"], difficulty: "Hard", description: "System knowledge." }], lastMinuteChecklist: ["Architecture", "Cloud"], resumeKeywords: ["Fullstack", "Cloud"], hrQuestions: [{ question: "Leadership?", context: "Future", starTip: "Initiative." }] },
      { roleName: "BPO Executive", rounds: [{ roundName: "Comm", duration: "30m", topics: ["English"], difficulty: "Easy", description: "Speaking test." }], lastMinuteChecklist: ["Grammar", "Fluency"], resumeKeywords: ["Communication", "Support"], hrQuestions: [{ question: "Night shift?", context: "Req", starTip: "Yes." }] },
      { roleName: "Innovator (R&D)", rounds: [{ roundName: "Research", duration: "60m", topics: ["Idea"], difficulty: "Hard", description: "Presented idea." }], lastMinuteChecklist: ["Patent", "Research"], resumeKeywords: ["Innovation", "R&D"], hrQuestions: [{ question: "New tech?", context: "Learning", starTip: "Trends." }] },
      { roleName: "Management Trainee", rounds: [{ roundName: "Case", duration: "45m", topics: ["Business"], difficulty: "Medium", description: "MBA Case." }], lastMinuteChecklist: ["SWOT", "Finance"], resumeKeywords: ["MBA", "Mgmt"], hrQuestions: [{ question: "5 years?", context: "Growth", starTip: "Ladder." }] },
      { roleName: "Smart Hiring (BSc)", rounds: [{ roundName: "Basic", duration: "45m", topics: ["Logic"], difficulty: "Easy", description: "Logic test." }], lastMinuteChecklist: ["Logic", "Math"], resumeKeywords: ["Science", "Math"], hrQuestions: [{ question: "Further studies?", context: "Commitment", starTip: "Work first." }] },
      { roleName: "System Administrator", rounds: [{ roundName: "Admin", duration: "45m", topics: ["Network"], difficulty: "Medium", description: "IP config." }], lastMinuteChecklist: ["LAN/WAN", "Windows"], resumeKeywords: ["Networking", "Admin"], hrQuestions: [{ question: "Travel?", context: "Ops", starTip: "Okay." }] }
    ]
  },
  // 11. INFOSYS
  {
    name: "Infosys",
    industry: "IT Services",
    type: "Service-Based",
    roles: [
      { roleName: "Systems Engineer", rounds: [{ roundName: "Test", duration: "120m", topics: ["Aptitude"], difficulty: "Medium", description: "Generic test." }], lastMinuteChecklist: ["Puzzle", "Math"], resumeKeywords: ["Java", "Engineering"], hrQuestions: [{ question: "Why Infosys?", context: "Loyalty", starTip: "Training." }] },
      { roleName: "Power Programmer", rounds: [{ roundName: "HackWithInfy", duration: "3hr", topics: ["Hard DSA"], difficulty: "Very Hard", description: "Contest rank." }], lastMinuteChecklist: ["Adv DSA", "CP"], resumeKeywords: ["CP", "Python"], hrQuestions: [{ question: "Complex code?", context: "Skill", starTip: "Logic." }] },
      { roleName: "Digital Specialist Eng", rounds: [{ roundName: "Tech", duration: "60m", topics: ["Web"], difficulty: "Hard", description: "MERN Stack." }], lastMinuteChecklist: ["React", "Node"], resumeKeywords: ["Fullstack", "Web"], hrQuestions: [{ question: "Projects?", context: "Exp", starTip: "Detail." }] },
      { roleName: "Operation Exec", rounds: [{ roundName: "Basic", duration: "30m", topics: ["Ops"], difficulty: "Easy", description: "Math check." }], lastMinuteChecklist: ["Math", "Excel"], resumeKeywords: ["Ops", "Support"], hrQuestions: [{ question: "Bond?", context: "Contract", starTip: "Agree." }] },
      { roleName: "Tech Analyst", rounds: [{ roundName: "Arch", duration: "60m", topics: ["Design"], difficulty: "Medium", description: "HLD Basics." }], lastMinuteChecklist: ["UML", "DB"], resumeKeywords: ["Analysis", "Design"], hrQuestions: [{ question: "Team conflict?", context: "Behav", starTip: "Resolve." }] },
      { roleName: "Process Executive", rounds: [{ roundName: "Voice", duration: "20m", topics: ["English"], difficulty: "Easy", description: "Accent check." }], lastMinuteChecklist: ["Voice", "Accent"], resumeKeywords: ["BPO", "Voice"], hrQuestions: [{ question: "Shifts?", context: "Time", starTip: "Flexible." }] },
      { roleName: "Testing Engineer", rounds: [{ roundName: "QA", duration: "45m", topics: ["Manual"], difficulty: "Medium", description: "Test cases." }], lastMinuteChecklist: ["STLC", "Jira"], resumeKeywords: ["Testing", "Selenium"], hrQuestions: [{ question: "Monotony?", context: "Work", starTip: "Quality focus." }] },
      { roleName: "Consultant", rounds: [{ roundName: "Case", duration: "60m", topics: ["Business"], difficulty: "Hard", description: "Client problem." }], lastMinuteChecklist: ["Frameworks", "PPT"], resumeKeywords: ["MBA", "Consulting"], hrQuestions: [{ question: "Travel?", context: "Req", starTip: "100%." }] }
    ]
  },
  // 12. ACCENTURE
  {
    name: "Accenture",
    industry: "Consulting",
    type: "Service-Based",
    roles: [
      { roleName: "ASE (Associate SW Eng)", rounds: [{ roundName: "Cog", duration: "60m", topics: ["aptitude"], difficulty: "Med", description: "Elimination." }], lastMinuteChecklist: ["Logic", "Verbal"], resumeKeywords: ["Java", "Fresher"], hrQuestions: [{ question: "Why Accenture?", context: "Brand", starTip: "Innovation." }] },
      { roleName: "FSE (Full Stack Eng)", rounds: [{ roundName: "Code", duration: "45m", topics: ["Java"], difficulty: "Hard", description: "Streams API." }], lastMinuteChecklist: ["Spring", "Angular"], resumeKeywords: ["Fullstack", "Cloud"], hrQuestions: [{ question: "Deadline?", context: "Pressure", starTip: "Plan." }] },
      { roleName: "Packaged App Analyst", rounds: [{ roundName: "SAP", duration: "45m", topics: ["ERP"], difficulty: "Med", description: "SAP basics." }], lastMinuteChecklist: ["SAP", "Salesforce"], resumeKeywords: ["SAP", "CRM"], hrQuestions: [{ question: "Learning?", context: "Growth", starTip: "Certs." }] },
      { roleName: "Data Analyst", rounds: [{ roundName: "SQL", duration: "45m", topics: ["Query"], difficulty: "Med", description: "Data fetch." }], lastMinuteChecklist: ["SQL", "Tableau"], resumeKeywords: ["Data", "Reports"], hrQuestions: [{ question: "Accuracy?", context: "Detail", starTip: "Check." }] },
      { roleName: "Security Analyst", rounds: [{ roundName: "Sec", duration: "45m", topics: ["Cyber"], difficulty: "Med", description: "Firewall." }], lastMinuteChecklist: ["Network", "Security"], resumeKeywords: ["Security", "Cyber"], hrQuestions: [{ question: "Breach?", context: "Scenario", starTip: "Report." }] },
      { roleName: "Cloud Support", rounds: [{ roundName: "Cloud", duration: "45m", topics: ["AWS"], difficulty: "Med", description: "EC2 basics." }], lastMinuteChecklist: ["AWS", "Azure"], resumeKeywords: ["Cloud", "Support"], hrQuestions: [{ question: "Client?", context: "Service", starTip: "Polite." }] },
      { roleName: "Tester", rounds: [{ roundName: "QA", duration: "45m", topics: ["Autom"], difficulty: "Med", description: "Scripts." }], lastMinuteChecklist: ["Selenium", "Java"], resumeKeywords: ["QA", "Auto"], hrQuestions: [{ question: "Bug found?", context: "Process", starTip: "Log it." }] },
      { roleName: "HR Partner", rounds: [{ roundName: "Behav", duration: "45m", topics: ["HR"], difficulty: "Med", description: "Policy." }], lastMinuteChecklist: ["Labor Law", "People"], resumeKeywords: ["HR", "People"], hrQuestions: [{ question: "Conflict?", context: "Res", starTip: "Policy." }] }
    ]
  },
  // 13. WIPRO
  {
    name: "Wipro",
    industry: "IT Services",
    type: "Service-Based",
    roles: [
      { roleName: "Project Engineer", rounds: [{ roundName: "NLTH", duration: "120m", topics: ["Essay"], difficulty: "Med", description: "Written comms." }], lastMinuteChecklist: ["Essay", "Code"], resumeKeywords: ["Java", "Fresher"], hrQuestions: [{ question: "Bond?", context: "Legal", starTip: "Sign." }] },
      { roleName: "Turbo Engineer", rounds: [{ roundName: "Coding", duration: "60m", topics: ["Adv"], difficulty: "Hard", description: "Better package." }], lastMinuteChecklist: ["DSA", "Java"], resumeKeywords: ["Turbo", "Java"], hrQuestions: [{ question: "Why Turbo?", context: "Ambition", starTip: "Challenge." }] },
      { roleName: "Digital Workspace", rounds: [{ roundName: "Infra", duration: "45m", topics: ["Desk"], difficulty: "Easy", description: "Service desk." }], lastMinuteChecklist: ["Windows", "Office"], resumeKeywords: ["Service Desk", "Support"], hrQuestions: [{ question: "Empathy?", context: "Service", starTip: "Listen." }] },
      { roleName: "VLSI Engineer", rounds: [{ roundName: "Tech", duration: "60m", topics: ["Elec"], difficulty: "Hard", description: "Chip design." }], lastMinuteChecklist: ["Verilog", "Digital"], resumeKeywords: ["VLSI", "Electronics"], hrQuestions: [{ question: "Passion?", context: "Core", starTip: "Tech." }] },
      { roleName: "Embedded Eng", rounds: [{ roundName: "C", duration: "60m", topics: ["Micro"], difficulty: "Med", description: "Controller." }], lastMinuteChecklist: ["C", "Microcontroller"], resumeKeywords: ["Embedded", "C"], hrQuestions: [{ question: "Debug?", context: "Skill", starTip: "Tools." }] },
      { roleName: "Content Reviewer", rounds: [{ roundName: "Read", duration: "30m", topics: ["Lang"], difficulty: "Easy", description: "Check text." }], lastMinuteChecklist: ["Reading", "Focus"], resumeKeywords: ["Content", "Mod"], hrQuestions: [{ question: "Disturbing content?", context: "Resilience", starTip: "Policy." }] },
      { roleName: "Network Admin", rounds: [{ roundName: "CCNA", duration: "45m", topics: ["Net"], difficulty: "Med", description: "Router." }], lastMinuteChecklist: ["CCNA", "IP"], resumeKeywords: ["Network", "Cisco"], hrQuestions: [{ question: "Night shift?", context: "Ops", starTip: "Okay." }] },
      { roleName: "Business Analyst", rounds: [{ roundName: "Req", duration: "45m", topics: ["Req"], difficulty: "Med", description: "Gather info." }], lastMinuteChecklist: ["UML", "Docs"], resumeKeywords: ["BA", "Analysis"], hrQuestions: [{ question: "Gap?", context: "Analysis", starTip: "Find it." }] }
    ]
  },
  // 14. COGNIZANT
  {
    name: "Cognizant",
    industry: "IT Services",
    type: "Service-Based",
    roles: [
      { roleName: "GenC", rounds: [{ roundName: "Aptitude", duration: "60m", topics: ["Logic"], difficulty: "Med", description: "Mass hire." }], lastMinuteChecklist: ["Quants", "Logic"], resumeKeywords: ["Java", "Fresher"], hrQuestions: [{ question: "Relocate?", context: "Flex", starTip: "Yes." }] },
      { roleName: "GenC Next", rounds: [{ roundName: "Code", duration: "60m", topics: ["Java"], difficulty: "Hard", description: "Fullstack." }], lastMinuteChecklist: ["Spring", "React"], resumeKeywords: ["Fullstack", "Java"], hrQuestions: [{ question: "Projects?", context: "Tech", starTip: "Details." }] },
      { roleName: "GenC Pro", rounds: [{ roundName: "Ent", duration: "60m", topics: ["Ent"], difficulty: "Med", description: "Enterprise apps." }], lastMinuteChecklist: ["Java", "SQL"], resumeKeywords: ["Enterprise", "Backend"], hrQuestions: [{ question: "Learning?", context: "Growth", starTip: "Courses." }] },
      { roleName: "Process Associate", rounds: [{ roundName: "Typing", duration: "20m", topics: ["Key"], difficulty: "Easy", description: "Speed check." }], lastMinuteChecklist: ["Typing", "English"], resumeKeywords: ["BPO", "Data Entry"], hrQuestions: [{ question: "Repetition?", context: "Job", starTip: "Focus." }] },
      { roleName: "Medical Coder", rounds: [{ roundName: "Bio", duration: "45m", topics: ["Med"], difficulty: "Med", description: "Terminology." }], lastMinuteChecklist: ["Anatomy", "Codes"], resumeKeywords: ["Life Science", "Medical"], hrQuestions: [{ question: "Accuracy?", context: "Vital", starTip: "100%." }] },
      { roleName: "Salesforce Dev", rounds: [{ roundName: "SFDC", duration: "45m", topics: ["Apex"], difficulty: "Hard", description: "Trigger logic." }], lastMinuteChecklist: ["Apex", "LWC"], resumeKeywords: ["Salesforce", "CRM"], hrQuestions: [{ question: "Certifications?", context: "Growth", starTip: "List them." }] },
      { roleName: "QA Lead", rounds: [{ roundName: "Strat", duration: "60m", topics: ["Plan"], difficulty: "Med", description: "Test plan." }], lastMinuteChecklist: ["Strategy", "Risk"], resumeKeywords: ["QA", "Lead"], hrQuestions: [{ question: "Team?", context: "Mgmt", starTip: "Support." }] },
      { roleName: "Big Data Eng", rounds: [{ roundName: "Hadoop", duration: "60m", topics: ["Data"], difficulty: "Hard", description: "MapReduce." }], lastMinuteChecklist: ["Hive", "Spark"], resumeKeywords: ["BigData", "Hadoop"], hrQuestions: [{ question: "Scale?", context: "Tech", starTip: "TB/PB." }] }
    ]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Company.deleteMany({});
    await Company.insertMany(companies);
    console.log("🌱 MASTER UPDATE: 14 Companies * ~8 Roles Inserted!");
    mongoose.connection.close();
  } catch (err) { console.log("❌ Error:", err); }
};

seedDB();