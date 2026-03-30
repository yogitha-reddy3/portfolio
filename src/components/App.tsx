import React, { useState, useEffect, useRef, useMemo } from 'react';
import ProjectModal from './ProjectModal';
import MouseReactiveBackground from './MouseReactiveBackground';

interface Project {
  id: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  technologies: string[];
  icon: React.JSX.Element;
  link?: string | null;
  gradient: string;
}
const MOBILE_BREAKPOINT = 768;

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= MOBILE_BREAKPOINT) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set(prev).add(entry.target.id));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const projects = useMemo<Project[]>(() => [
    {
      id: 'End-to-End Secure E-Commerce System',
      title: 'End-to-End Secure E-Commerce System',
      shortDescription: 'Designed and secured a full-stack e-commerce application by implementing authentication, input validation, AWS WAF protection, and CI/CD security checks, reducing vulnerabilities and improving overall system resilience.',
      detailedDescription: "Designed and secured a full-stack e-commerce application with a focus on application and cloud security, implementing secure authentication, robust input validation, and protections against XSS and SQL injection. Leveraged AWS WAF for web-layer defense and integrated security scanning into the CI/CD pipeline, enabling early vulnerability detection and reducing security incidents by 30% while improving overall deployment confidence.",
      technologies: ['AppSec', 'AWS', 'WAF', 'CI/CD', 'DevSecOps', 'XSS', 'SQLi', 'Authentication', 'Validation', 'Security'],
      // link: 'https://mse.s3d.cmu.edu/applicants/mse-ap/studio.html',
      icon: (
        <svg className="w-16 h-16 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
        </svg>
      ),
      gradient: 'from-blue-500/30 to-purple-500/30'
    },
    {
      id: 'Cloud Security Monitoring & Alerting',
      title: 'Cloud Security Monitoring & Alerting',
      shortDescription: 'Set up cloud log monitoring to track user activity, identify suspicious behavior, and generate alerts for basic incident investigation.',
      detailedDescription: "Built a basic cloud monitoring setup to better understand how activity in an AWS environment can be tracked and analyzed. I worked with services like CloudTrail to capture logs and connected them to a SIEM tool so I could monitor events in one place and explore how detection works in practice. I focused on identifying simple but important scenarios like unusual logins, changes in permissions, or unexpected API activity. \n Through this project, I spent time going through logs, learning what normal behavior looks like, and setting up alerts to flag anything suspicious. It gave me a good foundation in how monitoring and alerting support incident response, and helped me understand how visibility plays a key role in securing cloud environments.",
      technologies: ['AWS', 'CloudTrail', 'SIEM', 'Logs', 'Monitoring', 'Alerts', 'Detection'],
      // link: 'https://www.cs.cmu.edu/~msakr/15619-s18/recitations/S18_Recitation10.pdf',
      icon: (
        <svg className="w-16 h-16 text-white/80" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm10-3h-2V4h-2v3h-3v2h3v2h2v-2h2V7zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z"/>
        </svg>
      ),
      gradient: 'from-green-500/30 to-blue-500/30'
    }
    // {
    //   id: 'social-media',
    //   title: 'Social Media Clone with Heterogeneous Storage',
    //   shortDescription: 'Architected social media platform leveraging MySQL, Neo4J, and MongoDB for optimized data retrieval and 25% improved query response time.',
    //   detailedDescription: "This project explored the use of different database technologies to support various features of a social media application. User profiles and posts were stored in MongoDB (NoSQL document store) for flexibility. The social graph (follows, friendships) was managed in Neo4j (graph database) for efficient traversal and relationship queries. MySQL (relational database) handled transactional data like user authentication and settings. This polyglot persistence approach allowed for optimized performance for different data types and access patterns.\n\nThis was a core project in the \"Database Systems\" course, emphasizing data modeling and a multi-database strategy.",
    //   technologies: ['MongoDB', 'Neo4j', 'MySQL', 'Java', 'Spring Boot', 'React'],
    //   link: 'https://www.cs.cmu.edu/~msakr/15619-s18/recitations/S18_Recitation10.pdf',
    //   icon: (
    //     <svg className="w-16 h-16 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
    //     </svg>
    //   ),
    //   gradient: 'from-purple-500/30 to-pink-500/30'
    // },
    // {
    //   id: 'twitter-analysis',
    //   title: 'Twitter Social Graph Analysis with Apache Spark',
    //   shortDescription: 'Implemented PageRank algorithm using Apache Spark to analyze Twitter social graph, identifying top 5% most influential users with 30% performance improvement.',
    //   detailedDescription: "Using Apache Spark and the PageRank algorithm, this project analyzed a large dataset of Twitter user interactions to identify influential users. The data processing pipeline was built to efficiently handle the scale of the social graph, and various optimizations were applied to the Spark jobs to improve performance. The results provided insights into network structures and influence patterns within the Twitter ecosystem.\n\nThis project from the \"Big Data Analytics\" course focused on distributed data processing and graph algorithms.",
    //   technologies: ['Apache Spark', 'Scala', 'HDFS', 'PageRank', 'Zeppelin'],
    //   link: 'https://www.cs.cmu.edu/~msakr/15619-s18/recitations/S18_Recitation10.pdf',
    //   icon: (
    //     <svg className="w-16 h-16 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z"/>
    //     </svg>
    //   ),
    //   gradient: 'from-orange-500/30 to-red-500/30'
    // },
    // {
    //   id: 'rfid-calibration',
    //   title: 'ML-based RFID Calibration Microservice',
    //   shortDescription: 'Built machine learning microservice that reduced RFID scan error rate from 8% to <0.5%, saving $1.2M/year in logistics costs at Myntra.',
    //   detailedDescription: "During my internship at Myntra, I developed a microservice that used machine learning to calibrate RFID scanners in real-time. This significantly reduced scan errors in warehouses, leading to improved inventory accuracy and substantial cost savings. The model was trained on historical scan data and environmental factors, and deployed as a lightweight service integrated into the existing warehouse management system.\n\nThis work involved data preprocessing, model selection (ensembled tree-based models), deployment using Docker and Kubernetes, and continuous monitoring of model performance.",
    //   technologies: ['Python', 'Scikit-learn', 'Flask', 'Docker', 'Kubernetes', 'Kafka'],
    //   link: null,
    //   icon: (
    //     <svg className="w-16 h-16 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
    //     </svg>
    //   ),
    //   gradient: 'from-teal-500/30 to-cyan-500/30'
    // },
    // {
    //   id: 'samsung-database',
    //   title: 'Samsung Smart TV Distributed Database System',
    //   shortDescription: 'Designed and implemented distributed database using MySQL Cluster achieving 75% faster query resolution for Samsung Smart TV log collection and analysis.',
    //   detailedDescription: "As part of my undergraduate thesis, I worked on designing a distributed database system for Samsung Smart TVs to collect and analyze user interaction logs. We utilized MySQL Cluster for its high availability and scalability features. The project involved schema design for efficient log storage, data partitioning strategies, and performance tuning of distributed queries. The system was able to handle a large volume of incoming log data and provide significantly faster analytics capabilities compared to the previous centralized solution.\n\nThis project gave me hands-on experience with distributed database design, data replication, and consistency models.",
    //   technologies: ['MySQL Cluster', 'NDB API', 'C++', 'Python', 'Data Partitioning'],
    //   link: null,
    //   icon: (
    //     <svg className="w-16 h-16 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/>
    //     </svg>
    //   ),
    //   gradient: 'from-indigo-500/30 to-blue-500/30'
    // }
  ], []);



  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false); // Close mobile menu on scroll
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.offsetTop - navbarHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false); // Close mobile menu on scroll
  };

  const isSectionVisible = (sectionId: string) => visibleSections.has(sectionId);

  const openExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsProjectModalOpen(false);
    setSelectedProject(null);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  
  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },  
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ];

  // Enhanced Send Email URL
  const emailSubject = encodeURIComponent("Connecting from Your Portfolio");
  const emailBody = encodeURIComponent("Hi Yogitha,\n\nI saw your portfolio and wanted to reach out...\n\nRegards,\n[Your Name]");
  const mailtoLink = `mailto:yogitharrondla@gmail.com?subject=${emailSubject}&body=${emailBody}`;

  return (
    <div 
      className={`min-h-screen transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'} relative overflow-x-hidden`}
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)'
      }}
    >
      <MouseReactiveBackground />

      <div className="relative z-10">
        <nav className={`fixed top-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20 transform transition-all duration-700 ${isLoaded ? 'translate-y-0' : '-translate-y-full'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <button 
                onClick={scrollToTop}
                className="text-white font-bold text-xl hover:text-blue-300 transition-colors cursor-pointer"
              >
                Yogitha
              </button>
              <div className="hidden md:flex space-x-6">
                {navLinks.map(link => (
                    <button key={link.id} onClick={() => scrollToSection(link.id)} className="text-white/80 hover:text-white transition-colors text-sm">
                        {link.label}
                    </button>
                ))}
              </div>
              <div className="md:hidden">
                <button 
                  onClick={toggleMobileMenu} 
                  className="text-white/80 hover:text-white focus:outline-none"
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-slate-800/95 backdrop-blur-md shadow-lg py-2">
              {navLinks.map(link => (
                <button 
                  key={link.id} 
                  onClick={() => scrollToSection(link.id)} 
                  className="block w-full text-left px-6 py-3 text-white/90 hover:bg-slate-700/50 transition-colors text-base"
                >
                  {link.label}
                </button>
              ))}
            </div>
          )}
        </nav>

        <section className={`pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden transform transition-all duration-1000 delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div 
            className="absolute inset-0 opacity-30 bg-no-repeat bg-center bg-contain"
            style={{
              backgroundImage: 'url(/seattle.png)',
              backgroundSize: '80%',
              backgroundPosition: 'center 60%',
              maskImage: 'radial-gradient(ellipse 70% 60% at center, black 30%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at center, black 30%, transparent 80%)'
            }}
          ></div>
          
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="text-left">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                  Hi, I'm <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Yogitha</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-xl">
                  Security Engineer, focused on building secure, scalable systems and implementing robust architectural patterns to protect data and infrastructure.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => scrollToSection('projects')}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all"
                  >
                    View My Work
                  </button>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="border border-white/30 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-all"
                  >
                    Get In Touch
                  </button>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-white/20">
                  <img
                    src="yogitha.jpeg.jfif"
                    alt="Yogitha"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section 
          id="about" 
          ref={(el) => { sectionRefs.current['about'] = el; }}
          className={`py-20 px-4 sm:px-6 lg:px-8 transform transition-all duration-1000 ${isSectionVisible('about') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-white mb-6">About Me</h2>
                <p className="text-white/80 text-lg mb-6">
                  I’m a Cloud Security Engineer who enjoys building secure systems and figuring out how things can break before they actually do. My work focuses on securing cloud environments, improving detection, and reducing risk across real-world systems.💻
                </p>
                <p className="text-white/80 text-lg mb-8">
                  Over the past couple of years, I’ve worked on everything from investigating security incidents and tuning SIEM detections to fixing IAM misconfigurations and strengthening access controls in AWS. I’ve also partnered closely with engineering teams to remediate vulnerabilities and improve how security is built into day-to-day workflows. What I enjoy most is making security practical, whether that’s improving visibility through better logging, automating repetitive tasks, or refining detection so teams can focus on what actually matters. I like approaching problems with a mix of technical depth and curiosity, always looking for ways to make systems more resilient.👩🏻‍💻
                </p>
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <span className="text-white/80">Security Engineer at Compass</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                      <span className="text-white/80">University of Cincinnati, MS IT Graduate</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                      <span className="text-white/80">Security Monitoring & Risk Management</span>
                    </div>
                    {/* <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <span className="text-white/80">Big Data & Distributed Systems</span>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="space-y-5">
                  {[
                    { icon: '☁️', heading: 'Cloud & Security Tools', skills: ['AWS', 'Azure', 'Splunk', 'Microsoft Sentinel', 'Wireshark', 'Burp Suite'] },
                    { icon: '🔍', heading: 'Detection & Threat Monitoring', skills: ['Log Analysis', 'SIEM Monitoring', 'Alert Triage', 'MITRE ATT&CK', 'Threat Hunting (basic)'] },
                    { icon: '🚨', heading: 'Incident Response', skills: ['Incident Triage', 'Investigation', 'Root Cause Analysis (RCA)', 'Documentation & Playbooks'] },
                    { icon: '💻', heading: 'Programming & Automation', skills: ['Python', 'PowerShell', 'Scripting for security tasks'] },
                    { icon: '🌐', heading: 'Networking & Infrastructure Security', skills: ['TCP/IP', 'DNS', 'HTTP/HTTPS', 'Firewalls', 'Network Traffic Analysis'] },
                    { icon: '🖥️', heading: 'Operating Systems & Security Fundamentals', skills: ['Linux', 'Windows', 'System Hardening Basics', 'NIST', 'CIS Benchmarks'] },
                  ].map(({ icon, heading, skills }) => (
                    <div key={heading}>
                      <h4 className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-2">{icon} {heading}</h4>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                          <span key={skill} className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs border border-white/10">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="experience"
          ref={(el) => { sectionRefs.current['experience'] = el; }}
          className={`py-20 px-4 sm:px-6 lg:px-8 transform transition-all duration-1000 ${isSectionVisible('experience') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Experience</h2>
            <div className="space-y-8">
              {[
                {
                  href: "https://www.compass.com/",
                  title: "Cloud Security Engineer",
                  company: "Compass",
                  dates: "Sep 2025 – Present",
                  description: "At Compass Management Holdings LLC, I focused on securing AWS environments by identifying misconfigurations, strengthening IAM controls, and improving visibility through better logging and monitoring. I also worked on investigating incidents and partnering with engineering teams to reduce risk and build more secure, scalable cloud systems.",
                  tech: ['AWS', 'IAM', 'SIEM', 'Logging', 'IR'],
                  techColor: "blue"
                },
                {
                  href: "https://www.53.com/content/fifth-third/en/personal-banking/bank.html",
                  title: "Security Engineer",
                  company: "Fifth Third Bank",
                  dates: "Feb 2024 – Dec 2024",
                  description: "At Fifth Third Bank, I worked on monitoring and analyzing security alerts, helping investigate incidents and improve how threats were detected and handled. I spent a lot of time tuning SIEM rules, reducing false positives, and collaborating with teams to strengthen overall security and response processes.",
                  tech: ['SIEM', 'Detection', 'Triage', 'Analysis', 'Compliance'],
                  techColor: "purple"
                },
                {
                  href: "https://maxfinancialservices.com/insurance",
                  title: "Security Analyst",
                  company: "Axis Max Life Insurance Limited",
                  dates: "JUl 2022 – Jun 2023",
                  description: "At Max Life Insurance, I got hands-on experience with security monitoring and log analysis, supporting incident investigations and day-to-day security operations. I also worked on basic automation and vulnerability tracking, which helped improve efficiency and maintain a strong security posture.",
                  tech: ['Monitoring', 'SIEM', 'Python', 'Vulnerabilities', 'IR'],
                  techColor: "yellow"
                }
              ].map((exp, idx) => (
                <button
                  key={idx} 
                  onClick={() => exp.href && openExternalLink(exp.href)}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/20 transition-all group block w-full text-left"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-white group-hover:text-blue-300 transition-colors">{exp.title}</h3>
                      <p className={`text-${exp.techColor}-300 text-lg`}>{exp.company}</p>
                    </div>
                    <span className="text-white/60 text-sm md:text-base mt-2 md:mt-0">{exp.dates}</span>
                  </div>
                  <p className="text-white/80 mb-4">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech) => (
                      <span 
                        key={tech} 
                        className={`${
                          exp.company.includes("Linden Evenings") 
                            ? 'bg-yellow-500/20 text-yellow-300' 
                            : `bg-${exp.techColor}-500/20 text-${exp.techColor}-300`
                        } px-3 py-1 rounded-full text-sm`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

       

        <section 
          id="projects" 
          ref={(el) => { sectionRefs.current['projects'] = el; }}
          className={`py-20 px-4 sm:px-6 lg:px-8 transform transition-all duration-1000 ${isSectionVisible('projects') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className={`max-w-6xl mx-auto transform transition-all duration-1000 ${isSectionVisible('projects') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-5xl font-bold text-center text-white mb-4">Featured Projects</h2>
            <p className="text-xl text-center text-white/70 mb-16">A few highlights of my work and academic explorations.</p>
            <div className="flex flex-wrap justify-center gap-10">
              {projects.map((project) => (
                <div 
                  key={project.id}
                  onClick={() => openProjectModal(project)}
                  className={`group relative rounded-xl p-8 bg-gradient-to-br ${project.gradient} shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer w-full max-w-sm`}
                >
                  <div className="absolute inset-0 bg-slate-900/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="flex justify-center mb-6 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                      {project.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 text-center">{project.title}</h3>
                    <p className="text-white/70 mb-4 text-sm text-center h-20 overflow-hidden">{project.shortDescription}</p>
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                      {project.technologies.map(tech => (
                        <span key={tech} className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs font-medium group-hover:bg-blue-500/30 group-hover:text-blue-200 transition-colors">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section 
          id="education" 
          ref={(el) => { sectionRefs.current['education'] = el; }}
          className={`py-20 px-4 sm:px-6 lg:px-8 transform transition-all duration-1000 ${isSectionVisible('education') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Education</h2>
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {[
                {
                  href: "https://www.uc.edu/",
                  logo: "UClogo.png",
                  alt: "University of Cincinnati",
                  name: "University of Cincinnati",
                  degree: "Master of Information Technology",
                  year: "2023 - 2024",
                  description: "Specialized in distributed systems, cloud computing, and software architecture. Capstone project on cloud-native service mesh accelerator."
                },
                {
                  href: "https://www.cvr.ac.in/",
                  logo: "CVRlogo",
                  alt: "CVR College of Engineering",
                  name: "CVR College of Engineering",
                  degree: "Bachelor of Engineering",
                  year: "2019 - 2023",
                  description: "Computer Science & Engineering. Strong foundation in algorithms, data structures, and software engineering principles."
                }
              ].map((edu, idx) => (
                <button
                  key={idx}
                  onClick={() => edu.href && openExternalLink(edu.href)}
                  className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/20 transition-all group block w-full"
                >
                  <div className="w-24 h-24 mx-auto mb-6 bg-white rounded-full p-4 flex items-center justify-center">
                    <img 
                      src={edu.logo} 
                      alt={edu.alt} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">{edu.name}</h3>
                  <p className="text-blue-300 text-lg mb-2">{edu.degree}</p>
                  <p className="text-white/60 text-sm mb-4">{edu.year}</p>
                  <p className="text-white/80 text-sm">
                    {edu.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>

       

        <section 
          id="contact" 
          ref={(el) => { sectionRefs.current['contact'] = el; }}
          className={`py-20 px-4 sm:px-6 lg:px-8 transform transition-all duration-1000 ${isSectionVisible('contact') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Let's Connect!</h2>
            <p className="text-white/80 text-lg mb-8">
              Always excited to discuss security engineering, system protection strategies, or just chat about tech, feel free to reach out!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href={mailtoLink}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all"
              >
                Send Email
              </a>
              <a 
                href="https://www.linkedin.com/in/yogitha-r-056208191/"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/30 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-all"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </section>

        <footer className={`py-16 bg-slate-900/50 text-center transform transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-white/60">&copy; {new Date().getFullYear()} Yogitha Rondla. All rights reserved.</p>
          <p className="text-white/50 text-sm mt-2">
            Built with React, TypeScript, Vite, and Tailwind CSS.
          </p>
        </footer>
      </div>

      {isProjectModalOpen && <ProjectModal project={selectedProject} onClose={closeProjectModal} />}
    </div>
  );
}

export default App;
