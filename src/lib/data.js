// Define string literal arrays for categories, levels, types, and location types
export const jobCategories = [
  { id: "it", name: "IT & Software" },
  { id: "marketing", name: "Marketing" },
  { id: "finance", name: "Finance" },
  { id: "healthcare", name: "Healthcare" },
  { id: "government", name: "Government & Public Sector" },
]

export const experienceLevels = [
  { id: "entry", name: "Entry Level" },
  { id: "mid", name: "Mid Level" },
  { id: "senior", name: "Senior Level" },
]

export const jobTypes = [
  { id: "full-time", name: "Full-time" },
  { id: "part-time", name: "Part-time" },
  { id: "internship", name: "Internship" },
  { id: "contract", name: "Contract" },
]

export const locationTypes = [
  { id: "remote", name: "Remote" },
  { id: "onsite", name: "Onsite" },
  { id: "hybrid", name: "Hybrid" },
]

export const companyNames = [
  "TechCorp",
  "BrandBoost",
  "MoneyWise",
  "HealthFirst Hospital",
  "Government Affairs Office",
  "WebSolutions",
  "DigitalEdge",
  "FinancePro",
  "CarePoint Clinic",
  "Government Communications Office",
  "DataInsights",
  "ContentCraft"
]

function getRandomJobType() {
  const types = ["full-time", "part-time", "internship", "contract"];

  const weights = [0.5, 0.2, 0.15, 0.15];
  const r = Math.random();
  let acc = 0;
  for (let i = 0; i < types.length; i++) {
    acc += weights[i];
    if (r < acc) return [types[i]];
  }
  return ["full-time"];
}

export const mockJobs = [
  {
    id: "job-001",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    salary: { from: 120000, to: 150000 },
    experienceLevel: ["senior"],
    jobType: ["full-time"],
    locationType: ["remote"],
    category: ["it"],
    workMode: ["Remote"],
    description:
      "We are looking for a Senior Frontend Developer to join our team. You will be responsible for building user interfaces for our web applications using React and Next.js.",
    qualifications: [
      "Bachelor's degree in Computer Science or related field",
      "5+ years of experience in frontend development",
      "Strong knowledge of React, Next.js, and TypeScript",
      "Experience with state management libraries like Redux or Zustand",
      "Experience with CSS frameworks like Tailwind CSS",
    ],
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux"],
    perks: ["Competitive salary", "Remote work", "Health insurance", "401(k) matching", "Unlimited PTO"],
    postedDate: "2023-05-01",
    deadline: "2023-06-01",
    companyDescription:
      "TechCorp is a leading technology company specializing in web and mobile application development.",
    companyLogo: "https://i.pinimg.com/736x/62/3e/08/623e0857a16d805b077b1155cd656489.jpg",
  },
  {
    id: "job-002",
    title: "Marketing Manager",
    company: "BrandBoost",
    location: "New York, NY",
    salary: { from: 90000, to: 110000 },
    experienceLevel: ["mid"],
    jobType: ["full-time"],
    locationType: ["hybrid"],
    category: ["marketing"],
    workMode: ["Hybrid"],
    description:
      "We are seeking a Marketing Manager to develop and implement marketing strategies to promote our products and services.",
    qualifications: [
      "Bachelor's degree in Marketing or related field",
      "3+ years of experience in marketing",
      "Experience with digital marketing campaigns",
      "Strong analytical skills",
      "Excellent communication skills",
    ],
    skills: ["Digital Marketing", "SEO", "Social Media Marketing", "Content Marketing", "Analytics"],
    perks: ["Competitive salary", "Hybrid work model", "Health insurance", "Professional development budget"],
    postedDate: "2023-05-05",
    deadline: "2023-06-05",
    companyDescription:
      "BrandBoost is a marketing agency that helps businesses grow their brand presence and reach their target audience.",
    companyLogo: "https://i.pinimg.com/736x/88/85/de/8885de3758607c3f87f26a8b5105eb76.jpg",
  },
  {
    id: "job-003",
    title: "Financial Analyst",
    company: "MoneyWise",
    location: "Chicago, IL",
    salary: { from: 80000, to: 95000 },
    experienceLevel: ["mid"],
    jobType: ["full-time"],
    locationType: ["onsite"],
    category: ["finance"],
    workMode: ["Onsite"],
    description:
      "We are looking for a Financial Analyst to join our team. You will be responsible for analyzing financial data and providing insights to support business decisions.",
    qualifications: [
      "Bachelor's degree in Finance, Accounting, or related field",
      "3+ years of experience in financial analysis",
      "Proficiency in Excel and financial modeling",
      "Knowledge of financial reporting and analysis",
      "Strong analytical skills",
    ],
    skills: ["Financial Analysis", "Excel", "Financial Modeling", "Budgeting", "Forecasting"],
    perks: ["Competitive salary", "Bonus potential", "Health insurance", "401(k) matching", "Professional development"],
    postedDate: "2023-05-10",
    deadline: "2023-06-10",
    companyDescription:
      "MoneyWise is a financial services company that provides financial planning and investment management services.",
    companyLogo: "https://cdn-icons-png.flaticon.com/256/10384/10384161.png",
  },
  {
    id: "job-004",
    title: "Registered Nurse",
    company: "HealthFirst Hospital",
    location: "Boston, MA",
    salary: { from: 75000, to: 90000 },
    experienceLevel: ["mid"],
    jobType: ["full-time"],
    locationType: ["onsite"],
    category: ["healthcare"],
    workMode: ["Onsite"],
    description: "We are seeking a Registered Nurse to provide patient care in our medical-surgical unit.",
    qualifications: [
      "Bachelor's degree in Nursing",
      "Current RN license",
      "2+ years of experience in a hospital setting",
      "BLS certification",
      "Excellent communication and interpersonal skills",
    ],
    skills: [
      "Patient Care",
      "Medical-Surgical Nursing",
      "Electronic Health Records",
      "Patient Education",
      "Medication Administration",
    ],
    perks: ["Competitive salary", "Sign-on bonus", "Health insurance", "Retirement plan", "Tuition reimbursement"],
    postedDate: "2023-05-15",
    deadline: "2023-06-15",
    companyDescription:
      "HealthFirst Hospital is a leading healthcare provider committed to delivering high-quality patient care.",
    companyLogo: "https://i.pinimg.com/736x/25/dc/47/25dc4724f96ecead1872f71ec2b4c57d.jpg",
  },
  {
    id: "job-005",
    title: "Policy Analyst",
    company: "Government Affairs Office",
    location: "Washington, DC",
    salary: { from: 85000, to: 100000 },
    experienceLevel: ["mid"],
    jobType: ["full-time"],
    locationType: ["hybrid"],
    category: ["government"],
    workMode: ["Hybrid"],
    description:
      "We are looking for a Policy Analyst to research and analyze policy issues and provide recommendations to government officials.",
    qualifications: [
      "Master's degree in Public Policy, Political Science, or related field",
      "3+ years of experience in policy analysis",
      "Knowledge of legislative processes",
      "Strong research and analytical skills",
      "Excellent writing and communication skills",
    ],
    skills: ["Policy Analysis", "Research", "Government Relations", "Legislative Analysis", "Report Writing"],
    perks: [
      "Competitive salary",
      "Government benefits",
      "Retirement plan",
      "Professional development",
      "Work-life balance",
    ],
    postedDate: "2023-05-20",
    deadline: "2023-06-20",
    companyDescription:
      "The Government Affairs Office is a government agency that develops and implements public policies.",
    companyLogo: "https://cdn-icons-png.flaticon.com/256/6715/6715901.png",
  },
  {
    id: "job-006",
    title: "Junior Web Developer",
    company: "WebSolutions",
    location: "Austin, TX",
    salary: { from: 70000, to: 85000 },
    experienceLevel: ["entry"],
    jobType: ["full-time"],
    locationType: ["hybrid"],
    category: ["it"],
    workMode: ["Hybrid"],
    description:
      "We are seeking a Junior Web Developer to join our team. You will be responsible for developing and maintaining web applications.",
    qualifications: [
      "Bachelor's degree in Computer Science or related field",
      "1+ years of experience in web development",
      "Knowledge of HTML, CSS, and JavaScript",
      "Familiarity with React or other frontend frameworks",
      "Basic understanding of backend technologies",
    ],
    skills: ["HTML", "CSS", "JavaScript", "React", "Git"],
    perks: [
      "Competitive salary",
      "Hybrid work model",
      "Health insurance",
      "Professional development",
      "Casual work environment",
    ],
    postedDate: "2023-05-25",
    deadline: "2023-06-25",
    companyDescription:
      "WebSolutions is a web development agency that creates custom websites and web applications for businesses.",
    companyLogo: "https://cdn-icons-png.flaticon.com/256/1055/1055666.png",
  },
  {
    id: "job-007",
    title: "Social Media Specialist",
    company: "DigitalEdge",
    location: "Los Angeles, CA",
    salary: { from: 60000, to: 75000 },
    experienceLevel: ["entry"],
    jobType: ["full-time"],
    locationType: ["remote"],
    category: ["marketing"],
    workMode: ["Remote"],
    description:
      "We are looking for a Social Media Specialist to create and manage content for our social media platforms.",
    qualifications: [
      "Bachelor's degree in Marketing, Communications, or related field",
      "1+ years of experience in social media management",
      "Experience with social media platforms and analytics tools",
      "Strong writing and communication skills",
      "Creative mindset",
    ],
    skills: ["Social Media Management", "Content Creation", "Analytics", "Copywriting", "Graphic Design"],
    perks: [
      "Competitive salary",
      "Remote work",
      "Health insurance",
      "Professional development",
      "Creative work environment",
    ],
    postedDate: "2023-05-30",
    deadline: "2023-06-30",
    companyDescription: "DigitalEdge is a digital marketing agency that helps businesses grow their online presence.",
    companyLogo: "https://cdn-icons-png.flaticon.com/256/1814/1814562.png",
  },
  {
    id: "job-008",
    title: "Accountant",
    company: "FinancePro",
    location: "Denver, CO",
    salary: { from: 65000, to: 80000 },
    experienceLevel: ["mid"],
    jobType: ["full-time"],
    locationType: ["onsite"],
    category: ["finance"],
    workMode: ["Onsite"],
    description: "We are seeking an Accountant to maintain financial records and prepare financial reports.",
    qualifications: [
      "Bachelor's degree in Accounting or related field",
      "2+ years of experience in accounting",
      "Knowledge of accounting principles and practices",
      "Proficiency in accounting software",
      "Attention to detail",
    ],
    skills: ["Accounting", "Financial Reporting", "Bookkeeping", "Tax Preparation", "QuickBooks"],
    perks: ["Competitive salary", "Health insurance", "401(k) matching", "Professional development", "Paid time off"],
    postedDate: "2023-06-01",
    deadline: "2023-07-01",
    companyDescription:
      "FinancePro is an accounting firm that provides accounting and tax services to individuals and businesses.",
    companyLogo: "https://cdn-icons-png.flaticon.com/256/16119/16119891.png",
  },
  {
    id: "job-009",
    title: "Medical Assistant",
    company: "CarePoint Clinic",
    location: "Seattle, WA",
    salary: { from: 50000, to: 60000 },
    experienceLevel: ["entry"],
    jobType: ["full-time"],
    locationType: ["onsite"],
    category: ["healthcare"],
    workMode: ["Onsite"],
    description: "We are looking for a Medical Assistant to perform clinical and administrative duties in our clinic.",
    qualifications: [
      "Medical Assistant certification",
      "1+ years of experience as a Medical Assistant",
      "Knowledge of medical terminology and procedures",
      "Electronic health record experience",
      "Strong communication skills",
    ],
    skills: ["Patient Care", "Vital Signs", "Medical Records", "Appointment Scheduling", "Patient Education"],
    perks: ["Competitive salary", "Health insurance", "Retirement plan", "Paid time off", "Professional development"],
    postedDate: "2023-06-05",
    deadline: "2023-07-05",
    companyDescription:
      "CarePoint Clinic is a primary care clinic that provides comprehensive healthcare services to patients.",
    companyLogo: "https://i.pinimg.com/736x/8f/62/20/8f6220c9aef7c82f41271a90f3867abe.jpg",
  },
  {
    id: "job-010",
    title: "Public Relations Specialist",
    company: "Government Communications Office",
    location: "Atlanta, GA",
    salary: { from: 70000, to: 85000 },
    experienceLevel: ["mid"],
    jobType: ["full-time"],
    locationType: ["hybrid"],
    category: ["government"],
    workMode: ["Hybrid"],
    description:
      "We are seeking a Public Relations Specialist to develop and implement communication strategies for government initiatives.",
    qualifications: [
      "Bachelor's degree in Public Relations, Communications, or related field",
      "3+ years of experience in public relations",
      "Experience with media relations",
      "Strong writing and communication skills",
      "Knowledge of government operations",
    ],
    skills: ["Public Relations", "Media Relations", "Press Releases", "Communication Strategy", "Crisis Management"],
    perks: [
      "Competitive salary",
      "Government benefits",
      "Retirement plan",
      "Professional development",
      "Work-life balance",
    ],
    postedDate: "2023-06-10",
    deadline: "2023-07-10",
    companyDescription:
      "The Government Communications Office is responsible for managing public communications for government agencies.",
    companyLogo: "https://i.pinimg.com/736x/ca/f4/6e/caf46ee845e170e055876e3e7ff854d5.jpg",
  },
  {
    id: "job-011",
    title: "Data Scientist",
    company: "DataInsights",
    location: "Seattle, WA",
    salary: { from: 110000, to: 140000 },
    experienceLevel: ["senior"],
    jobType: ["full-time"],
    locationType: ["remote"],
    category: ["it"],
    workMode: ["Remote"],
    description:
      "We are looking for a Data Scientist to analyze complex data sets and develop machine learning models to solve business problems.",
    qualifications: [
      "Master's or PhD in Computer Science, Statistics, or related field",
      "5+ years of experience in data science",
      "Proficiency in Python and data analysis libraries",
      "Experience with machine learning algorithms",
      "Strong statistical knowledge",
    ],
    skills: ["Python", "Machine Learning", "Data Analysis", "Statistics", "SQL"],
    perks: ["Competitive salary", "Remote work", "Health insurance", "401(k) matching", "Professional development"],
    postedDate: "2023-06-15",
    deadline: "2023-07-15",
    companyDescription: "DataInsights is a data analytics company that helps businesses make data-driven decisions.",
    companyLogo: "https://cdn-icons-png.flaticon.com/256/9672/9672242.png",
  },
  {
    id: "job-012",
    title: "Content Marketing Manager",
    company: "ContentCraft",
    location: "Chicago, IL",
    salary: { from: 85000, to: 105000 },
    experienceLevel: ["mid"],
    jobType: ["full-time"],
    locationType: ["hybrid"],
    category: ["marketing"],
    workMode: ["Hybrid"],
    description:
      "We are seeking a Content Marketing Manager to develop and execute content strategies that drive engagement and conversions.",
    qualifications: [
      "Bachelor's degree in Marketing, Communications, or related field",
      "4+ years of experience in content marketing",
      "Experience with content management systems",
      "Strong writing and editing skills",
      "Knowledge of SEO best practices",
    ],
    skills: ["Content Strategy", "SEO", "Content Creation", "Editorial Planning", "Analytics"],
    perks: [
      "Competitive salary",
      "Hybrid work model",
      "Health insurance",
      "Professional development",
      "Creative work environment",
    ],
    postedDate: "2023-06-20",
    deadline: "2023-07-20",
    companyDescription:
      "ContentCraft is a content marketing agency that helps businesses create and distribute valuable content.",
    companyLogo: "https://cdn-icons-png.flaticon.com/256/8164/8164154.png",
  },
  {
    id: "job-013",
    title: "Backend Developer",
    company: "TechCorp",
    location: "San Jose, CA",
    salary: { from: 115000, to: 135000 },
    experienceLevel: ["mid"],
    jobType: ["full-time"],
    locationType: ["onsite"],
    category: ["it"],
    workMode: ["Onsite"],
    description: "Join our backend team to build scalable APIs and services.",
    qualifications: [
      "Bachelor's degree in Computer Science or related field",
      "3+ years of experience in backend development",
      "Experience with Node.js and databases",
      "Familiarity with cloud platforms",
      "Strong problem-solving skills"
    ],
    skills: ["Node.js", "Express", "SQL", "AWS", "API Design"],
    perks: ["Competitive salary", "Onsite gym", "Health insurance", "401(k) matching", "Flexible hours"],
    postedDate: "2023-06-18",
    deadline: "2023-07-18",
    companyDescription: "TechCorp is a leading technology company specializing in web and mobile application development.",
    companyLogo: "https://i.pinimg.com/736x/62/3e/08/623e0857a16d805b077b1155cd656489.jpg"
  },
  {
    id: "job-014",
    title: "SEO Specialist",
    company: "BrandBoost",
    location: "Remote",
    salary: { from: 70000, to: 85000 },
    experienceLevel: ["entry"],
    jobType: ["full-time"],
    locationType: ["remote"],
    category: ["marketing"],
    workMode: ["Remote"],
    description: "Optimize websites and content for search engines.",
    qualifications: [
      "Bachelor's degree in Marketing or related field",
      "1+ years of experience in SEO",
      "Knowledge of SEO tools",
      "Analytical mindset",
      "Excellent communication skills"
    ],
    skills: ["SEO", "Google Analytics", "Content Optimization", "Keyword Research", "Link Building"],
    perks: ["Remote work", "Health insurance", "Professional development", "Flexible schedule", "Performance bonus"],
    postedDate: "2023-06-19",
    deadline: "2023-07-19",
    companyDescription: "BrandBoost is a marketing agency that helps businesses grow their brand presence and reach their target audience.",
    companyLogo: "https://i.pinimg.com/736x/88/85/de/8885de3758607c3f87f26a8b5105eb76.jpg"
  },
  {
    id: "job-015",
    title: "Investment Advisor",
    company: "MoneyWise",
    location: "Chicago, IL",
    salary: { from: 90000, to: 120000 },
    experienceLevel: ["senior"],
    jobType: ["full-time"],
    locationType: ["hybrid"],
    category: ["finance"],
    workMode: ["Hybrid"],
    description: "Advise clients on investment strategies and portfolio management.",
    qualifications: [
      "Bachelor's degree in Finance or related field",
      "5+ years of experience in investment advising",
      "Strong analytical and communication skills",
      "FINRA Series 7 license",
      "Client-focused attitude"
    ],
    skills: ["Investment Strategies", "Portfolio Management", "Client Relations", "Financial Planning", "Risk Assessment"],
    perks: ["Bonus potential", "Hybrid work", "Health insurance", "401(k) matching", "Professional development"],
    postedDate: "2023-06-20",
    deadline: "2023-07-20",
    companyDescription: "MoneyWise is a financial services company that provides financial planning and investment management services.",
    companyLogo: "https://cdn-icons-png.flaticon.com/256/10384/10384161.png"
  },
  {
    id: "job-016",
    title: "Research Coordinator",
    company: "HealthFirst Hospital",
    location: "Boston, MA",
    salary: { from: 80000, to: 95000 },
    experienceLevel: ["mid"],
    jobType: ["full-time"],
    locationType: ["onsite"],
    category: ["healthcare"],
    workMode: ["Onsite"],
    description: "Coordinate and manage clinical research studies.",
    qualifications: [
      "Bachelor's degree in Life Sciences or related field",
      "2+ years of experience in clinical research",
      "Knowledge of GCP guidelines",
      "Strong organizational skills",
      "Attention to detail"
    ],
    skills: ["Clinical Research", "GCP", "Data Management", "Patient Recruitment", "Regulatory Compliance"],
    perks: ["Health insurance", "Retirement plan", "Professional development", "Paid time off", "Onsite cafeteria"],
    postedDate: "2023-06-21",
    deadline: "2023-07-21",
    companyDescription: "HealthFirst Hospital is a leading healthcare provider committed to delivering high-quality patient care.",
    companyLogo: "https://i.pinimg.com/736x/25/dc/47/25dc4724f96ecead1872f71ec2b4c57d.jpg"
  },
  {
    id: "job-017",
    title: "Public Policy Advisor",
    company: "Government Affairs Office",
    location: "Washington, DC",
    salary: { from: 110000, to: 130000 },
    experienceLevel: ["senior"],
    jobType: ["full-time"],
    locationType: ["hybrid"],
    category: ["government"],
    workMode: ["Hybrid"],
    description: "Advise on public policy development and implementation.",
    qualifications: [
      "Master's degree in Public Policy or related field",
      "7+ years of experience in policy advisory roles",
      "Strong research and analytical skills",
      "Excellent communication skills",
      "Experience with legislative processes"
    ],
    skills: ["Policy Advisory", "Legislative Analysis", "Research", "Stakeholder Engagement", "Report Writing"],
    perks: ["Government benefits", "Retirement plan", "Professional development", "Work-life balance", "Flexible schedule"],
    postedDate: "2023-06-22",
    deadline: "2023-07-22",
    companyDescription: "The Government Affairs Office is a government agency that develops and implements public policies.",
    companyLogo: "https://cdn-icons-png.flaticon.com/256/6715/6715901.png"
  },
  {
    id: "job-018",
    title: "UI/UX Designer",
    company: "WebSolutions",
    location: "Austin, TX",
    salary: { from: 85000, to: 100000 },
    experienceLevel: ["mid"],
    jobType: ["full-time"],
    locationType: ["hybrid"],
    category: ["it"],
    workMode: ["Hybrid"],
    description: "Design user interfaces and experiences for web applications.",
    qualifications: [
      "Bachelor's degree in Design or related field",
      "2+ years of experience in UI/UX design",
      "Proficiency in Figma or Adobe XD",
      "Strong portfolio of design projects",
      "Attention to detail"
    ],
    skills: ["UI Design", "UX Research", "Figma", "Prototyping", "Wireframing"],
    perks: ["Hybrid work model", "Health insurance", "Professional development", "Casual work environment", "Flexible hours"],
    postedDate: "2023-06-23",
    deadline: "2023-07-23",
    companyDescription: "WebSolutions is a web development agency that creates custom websites and web applications for businesses.",
    companyLogo: "https://cdn-icons-png.flaticon.com/256/1055/1055666.png"
  },
  {
    id: "job-019",
    title: "Digital Marketing Analyst",
    company: "DigitalEdge",
    location: "Los Angeles, CA",
    salary: { from: 75000, to: 90000 },
    experienceLevel: ["mid"],
    jobType: ["full-time"],
    locationType: ["remote"],
    category: ["marketing"],
    workMode: ["Remote"],
    description: "Analyze digital marketing campaigns and provide insights.",
    qualifications: [
      "Bachelor's degree in Marketing or related field",
      "2+ years of experience in digital marketing analysis",
      "Experience with analytics tools",
      "Strong analytical skills",
      "Excellent communication skills"
    ],
    skills: ["Digital Marketing", "Google Analytics", "Data Analysis", "SEO", "Reporting"],
    perks: ["Remote work", "Health insurance", "Professional development", "Creative work environment", "Performance bonus"],
    postedDate: "2023-06-24",
    deadline: "2023-07-24",
    companyDescription: "DigitalEdge is a digital marketing agency that helps businesses grow their online presence.",
    companyLogo: "https://cdn-icons-png.flaticon.com/256/1814/1814562.png"
  },
  {
    id: "job-020",
    title: "Tax Consultant",
    company: "FinancePro",
    location: "Denver, CO",
    salary: { from: 80000, to: 100000 },
    experienceLevel: ["mid"],
    jobType: ["full-time"],
    locationType: ["onsite"],
    category: ["finance"],
    workMode: ["Onsite"],
    description: "Provide tax consulting services to clients.",
    qualifications: [
      "Bachelor's degree in Accounting or related field",
      "3+ years of experience in tax consulting",
      "CPA certification preferred",
      "Strong attention to detail",
      "Excellent communication skills"
    ],
    skills: ["Tax Consulting", "Accounting", "Tax Preparation", "Client Relations", "QuickBooks"],
    perks: ["Health insurance", "401(k) matching", "Professional development", "Paid time off", "Flexible schedule"],
    postedDate: "2023-06-25",
    deadline: "2023-07-25",
    companyDescription: "FinancePro is an accounting firm that provides accounting and tax services to individuals and businesses.",
    companyLogo: "https://cdn-icons-png.flaticon.com/256/16119/16119891.png"
  },
  {
    id: "job-021",
    title: "Patient Services Coordinator",
    company: "CarePoint Clinic",
    location: "Seattle, WA",
    salary: { from: 55000, to: 65000 },
    experienceLevel: ["entry"],
    jobType: ["full-time"],
    locationType: ["onsite"],
    category: ["healthcare"],
    workMode: ["Onsite"],
    description: "Coordinate patient services and administrative tasks.",
    qualifications: [
      "Associate's degree or equivalent experience",
      "1+ years of experience in healthcare administration",
      "Strong organizational skills",
      "Excellent communication skills",
      "Knowledge of medical terminology"
    ],
    skills: ["Patient Services", "Scheduling", "Medical Records", "Customer Service", "Data Entry"],
    perks: ["Health insurance", "Retirement plan", "Paid time off", "Professional development", "Flexible schedule"],
    postedDate: "2023-06-26",
    deadline: "2023-07-26",
    companyDescription: "CarePoint Clinic is a primary care clinic that provides comprehensive healthcare services to patients.",
    companyLogo: "https://i.pinimg.com/736x/8f/62/20/8f6220c9aef7c82f41271a90f3867abe.jpg"
  },
  {
    id: "job-022",
    title: "Communications Officer",
    company: "Government Communications Office",
    location: "Atlanta, GA",
    salary: { from: 80000, to: 95000 },
    experienceLevel: ["mid"],
    jobType: ["full-time"],
    locationType: ["hybrid"],
    category: ["government"],
    workMode: ["Hybrid"],
    description: "Manage internal and external communications for government initiatives.",
    qualifications: [
      "Bachelor's degree in Communications or related field",
      "3+ years of experience in communications",
      "Experience with media relations",
      "Strong writing and editing skills",
      "Knowledge of government operations"
    ],
    skills: ["Communications", "Media Relations", "Press Releases", "Editing", "Public Speaking"],
    perks: ["Government benefits", "Retirement plan", "Professional development", "Work-life balance", "Flexible schedule"],
    postedDate: "2023-06-27",
    deadline: "2023-07-27",
    companyDescription: "The Government Communications Office is responsible for managing public communications for government agencies.",
    companyLogo: "https://i.pinimg.com/736x/ca/f4/6e/caf46ee845e170e055876e3e7ff854d5.jpg"
  },
  {
    id: "job-023",
    title: "Machine Learning Engineer",
    company: "DataInsights",
    location: "Seattle, WA",
    salary: { from: 120000, to: 150000 },
    experienceLevel: ["senior"],
    jobType: ["full-time"],
    locationType: ["remote"],
    category: ["it"],
    workMode: ["Remote"],
    description: "Develop and deploy machine learning models for business applications.",
    qualifications: [
      "Master's degree in Computer Science or related field",
      "5+ years of experience in machine learning",
      "Proficiency in Python and ML frameworks",
      "Experience with cloud platforms",
      "Strong problem-solving skills"
    ],
    skills: ["Machine Learning", "Python", "TensorFlow", "AWS", "Data Engineering"],
    perks: ["Remote work", "Health insurance", "401(k) matching", "Professional development", "Flexible schedule"],
    postedDate: "2023-06-28",
    deadline: "2023-07-28",
    companyDescription: "DataInsights is a data analytics company that helps businesses make data-driven decisions.",
    companyLogo: "https://cdn-icons-png.flaticon.com/256/9672/9672242.png"
  },
  {
    id: "job-024",
    title: "Copywriter",
    company: "ContentCraft",
    location: "Chicago, IL",
    salary: { from: 65000, to: 80000 },
    experienceLevel: ["entry"],
    jobType: ["full-time"],
    locationType: ["hybrid"],
    category: ["marketing"],
    workMode: ["Hybrid"],
    description: "Write compelling copy for marketing campaigns and content.",
    qualifications: [
      "Bachelor's degree in Communications, Marketing, or related field",
      "1+ years of experience in copywriting",
      "Strong writing and editing skills",
      "Creative mindset",
      "Attention to detail"
    ],
    skills: ["Copywriting", "Editing", "Content Creation", "SEO", "Storytelling"],
    perks: ["Hybrid work model", "Health insurance", "Professional development", "Creative work environment", "Flexible schedule"],
    postedDate: "2023-06-29",
    deadline: "2023-07-29",
    companyDescription: "ContentCraft is a content marketing agency that helps businesses create and distribute valuable content.",
    companyLogo: "https://cdn-icons-png.flaticon.com/256/8164/8164154.png"
  },
  {
    id: "job-025",
    title: "Cloud Solutions Architect",
    company: "TechCorp",
    location: "San Francisco, CA",
    salary: { from: 140000, to: 170000 },
    experienceLevel: ["senior"],
    jobType: ["full-time"],
    locationType: ["remote"],
    category: ["it"],
    workMode: ["Remote"],
    description: "Design and implement cloud solutions for enterprise clients.",
    qualifications: [
      "Bachelor's degree in Computer Science or related field",
      "7+ years of experience in cloud architecture",
      "Expertise in AWS or Azure",
      "Strong communication skills",
      "Experience with DevOps practices"
    ],
    skills: ["Cloud Architecture", "AWS", "Azure", "DevOps", "Infrastructure as Code"],
    perks: ["Remote work", "Health insurance", "401(k) matching", "Professional development", "Flexible schedule"],
    postedDate: "2023-06-30",
    deadline: "2023-07-30",
    companyDescription: "TechCorp is a leading technology company specializing in web and mobile application development.",
    companyLogo: "https://i.pinimg.com/736x/62/3e/08/623e0857a16d805b077b1155cd656489.jpg"
  },
  {
    id: "job-026",
    title: "Brand Strategist",
    company: "BrandBoost",
    location: "New York, NY",
    salary: { from: 95000, to: 115000 },
    experienceLevel: ["mid"],
    jobType: ["full-time"],
    locationType: ["hybrid"],
    category: ["marketing"],
    workMode: ["Hybrid"],
    description: "Develop and execute brand strategies for clients.",
    qualifications: [
      "Bachelor's degree in Marketing or related field",
      "3+ years of experience in brand strategy",
      "Strong analytical and creative skills",
      "Experience with brand management",
      "Excellent communication skills"
    ],
    skills: ["Brand Strategy", "Market Research", "Creative Direction", "Analytics", "Client Relations"],
    perks: ["Hybrid work model", "Health insurance", "Professional development", "Creative work environment", "Performance bonus"],
    postedDate: "2023-07-01",
    deadline: "2023-08-01",
    companyDescription: "BrandBoost is a marketing agency that helps businesses grow their brand presence and reach their target audience.",
    companyLogo: "https://i.pinimg.com/736x/88/85/de/8885de3758607c3f87f26a8b5105eb76.jpg"
  },
  {
    id: "job-027",
    title: "Financial Controller",
    company: "FinancePro",
    location: "Denver, CO",
    salary: { from: 110000, to: 130000 },
    experienceLevel: ["senior"],
    jobType: ["full-time"],
    locationType: ["onsite"],
    category: ["finance"],
    workMode: ["Onsite"],
    description: "Oversee financial operations and reporting for clients.",
    qualifications: [
      "Bachelor's degree in Accounting or related field",
      "7+ years of experience in financial management",
      "CPA certification required",
      "Strong leadership skills",
      "Attention to detail"
    ],
    skills: ["Financial Management", "Accounting", "Leadership", "Financial Reporting", "Budgeting"],
    perks: ["Health insurance", "401(k) matching", "Professional development", "Paid time off", "Flexible schedule"],
    postedDate: "2023-07-02",
    deadline: "2023-08-02",
    companyDescription: "FinancePro is an accounting firm that provides accounting and tax services to individuals and businesses.",
    companyLogo: "https://cdn-icons-png.flaticon.com/256/16119/16119891.png"
  },
  {
    id: "job-028",
    title: "Nurse Practitioner",
    company: "HealthFirst Hospital",
    location: "Boston, MA",
    salary: { from: 100000, to: 120000 },
    experienceLevel: ["senior"],
    jobType: ["full-time"],
    locationType: ["onsite"],
    category: ["healthcare"],
    workMode: ["Onsite"],
    description: "Provide advanced nursing care to patients in a hospital setting.",
    qualifications: [
      "Master's degree in Nursing",
      "5+ years of experience as a nurse practitioner",
      "Current NP license",
      "Strong clinical skills",
      "Excellent communication skills"
    ],
    skills: ["Nursing", "Patient Care", "Clinical Assessment", "Medication Management", "Team Leadership"],
    perks: ["Health insurance", "Retirement plan", "Professional development", "Paid time off", "Onsite cafeteria"],
    postedDate: "2023-07-03",
    deadline: "2023-08-03",
    companyDescription: "HealthFirst Hospital is a leading healthcare provider committed to delivering high-quality patient care.",
    companyLogo: "https://i.pinimg.com/736x/25/dc/47/25dc4724f96ecead1872f71ec2b4c57d.jpg"
  },
  {
    id: "job-029",
    title: "Legislative Assistant",
    company: "Government Affairs Office",
    location: "Washington, DC",
    salary: { from: 75000, to: 90000 },
    experienceLevel: ["entry"],
    jobType: ["full-time"],
    locationType: ["hybrid"],
    category: ["government"],
    workMode: ["Hybrid"],
    description: "Assist with legislative research and administrative tasks.",
    qualifications: [
      "Bachelor's degree in Political Science or related field",
      "1+ years of experience in legislative support",
      "Strong research and writing skills",
      "Attention to detail",
      "Excellent communication skills"
    ],
    skills: ["Legislative Research", "Writing", "Administrative Support", "Policy Analysis", "Scheduling"],
    perks: ["Government benefits", "Retirement plan", "Professional development", "Work-life balance", "Flexible schedule"],
    postedDate: "2023-07-04",
    deadline: "2023-08-04",
    companyDescription: "The Government Affairs Office is a government agency that develops and implements public policies.",
    companyLogo: "https://cdn-icons-png.flaticon.com/256/6715/6715901.png"
  },
  {
    id: "job-030",
    title: "Full Stack Developer",
    company: "WebSolutions",
    location: "Austin, TX",
    salary: { from: 105000, to: 125000 },
    experienceLevel: ["mid"],
    jobType: ["full-time"],
    locationType: ["hybrid"],
    category: ["it"],
    workMode: ["Hybrid"],
    description: "Develop and maintain full stack web applications.",
    qualifications: [
      "Bachelor's degree in Computer Science or related field",
      "3+ years of experience in full stack development",
      "Experience with React and Node.js",
      "Knowledge of databases",
      "Strong problem-solving skills"
    ],
    skills: ["React", "Node.js", "SQL", "TypeScript", "API Development"],
    perks: ["Hybrid work model", "Health insurance", "Professional development", "Casual work environment", "Flexible hours"],
    postedDate: "2023-07-05",
    deadline: "2023-08-05",
    companyDescription: "WebSolutions is a web development agency that creates custom websites and web applications for businesses.",
    companyLogo: "https://cdn-icons-png.flaticon.com/256/1055/1055666.png"
  }
].map((job, idx) => {

  if (idx < 5) return job;
  return {
    ...job,
    jobType: getRandomJobType(),
  };
})

export function getJobById(id) {
  return mockJobs.find((job) => job.id === id)
}

export function getJobsByCategory(category) {
  return mockJobs.filter((job) => job.category === category)
}

export function searchJobs(query) {
  const lowercaseQuery = query.toLowerCase()
  return mockJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(lowercaseQuery) ||
      job.company.toLowerCase().includes(lowercaseQuery) ||
      job.id.toLowerCase().includes(lowercaseQuery),
  )
}

export function filterJobs(
  jobs,
  filters
) {
  return jobs.filter((job) => {
    // category, experienceLevel, jobType, locationType đều là mảng trong job, nên cần kiểm tra giao nhau
    if (filters.category && filters.category.length > 0 && !filters.category.some((cat) => job.category.includes(cat))) return false;
    if (filters.experienceLevel && filters.experienceLevel.length > 0 && !filters.experienceLevel.some((lvl) => job.experienceLevel.includes(lvl))) return false;
    if (filters.jobType && filters.jobType.length > 0 && !filters.jobType.some((type) => job.jobType.includes(type))) return false;
    if (filters.locationType && filters.locationType.length > 0 && !filters.locationType.some((type) => job.locationType.includes(type))) return false;
    if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    if (filters.workMode && filters.workMode.length > 0) {
      if (!filters.workMode.some((mode) => job.workMode.includes(mode))) return false;
    }
    return true;
  });
}

export function sortJobs(jobs, sortBy) {
  const sortedJobs = [...jobs]

  switch (sortBy) {
    case "date":
      return sortedJobs.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime())
    case "salary":
      return sortedJobs.sort((a, b) => {
        const aSalary = a.salary && typeof a.salary === "string" ? Number.parseInt(a.salary.replace(/[^0-9]/g, "")) : 0;
        const bSalary = b.salary && typeof b.salary === "string" ? Number.parseInt(b.salary.replace(/[^0-9]/g, "")) : 0;
        return bSalary - aSalary;
      })
    case "relevance":
    default:
      return sortedJobs
  }
}

export function getSimilarJobs(category, excludeId) {
  return mockJobs.filter((job) => job.category.includes(category) && job.id !== excludeId);
}
