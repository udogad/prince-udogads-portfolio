
import { Project, Experience, InterestCategory } from './types.ts';

export const NAME = "Prince Udochukwu Ukasoanya";
export const CONTACT_EMAIL = "smileud76@gmail.com";
export const GITHUB_URL = "https://github.com/udogad";
export const LINKEDIN_URL = "https://linkedin.com/in/udogad";
export const TWITTER_URL = "https://twitter.com/princeudogod";

export const PROFILE_IMAGE_URL = "https://pbs.twimg.com/profile_images/1977078962758021120/l5kv-QyP.jpg";

// Notification Webhook for Sentinel System
export const SENTINEL_WEBHOOK_URL = "";

// Technical Interest Categories
export const INTERESTS: { id: InterestCategory; label: string }[] = [
  { id: 'WEB', label: 'Web Development' },
  { id: 'MOBILE', label: 'Mobile App Development' },
  { id: 'AI_SYSTEMS', label: 'AI Systems' },
];

// Proficiency Data for Skills Radar
export const SKILLS = [
  {
    name: 'WEB',
    value: 98,
    description: 'Expertise in high-performance web systems, distributed architectures, and modern frontend ecosystems.'
  },
  {
    name: 'MOBILE',
    value: 92,
    description: 'Specialized in cross-platform mobile solutions, background synchronization, and native hardware integration.'
  },
  {
    name: 'AI',
    value: 95,
    description: 'Specialist in Generative AI integration, autonomous agent swarms, and LLM-driven system automation.'
  },
];

// Specialized Tech Stack Modules
export const TECH_STACK = [
  {
    category: 'Web Development',
    icon: 'Monitor',
    description: 'Building resilient, scalable web infrastructures and immersive user experiences.',
    items: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS']
  },
  {
    category: 'Mobile App Development',
    icon: 'Smartphone',
    description: 'Engineering fluid mobile interfaces with robust offline capabilities and native performance.',
    items: ['React Native', 'Flutter', 'Firebase', 'Supabase', 'Expo']
  },
  {
    category: 'AI Systems',
    icon: 'BrainCircuit',
    description: 'Deploying sophisticated AI agents and integrating intelligent reasoning into production workflows.',
    items: ['LLMs', 'FastAPI', 'Python', 'Vector DBs']
  }
];

// Portfolio Project Vault - 6 High-Impact Projects (2 Web, 2 Mobile, 2 AI)
export const PROJECTS: Project[] = [
  {
    id: 'sentinel-protocol',
    title: 'Sentinel Protocol',
    description: 'An AI-powered monitoring system that detects threats in real-time.',
    tags: ['AI Systems', 'Real-time', 'Security'],
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070',
    link: '#',
    year: '2025',
    techDetails: 'Built with Node.js and Gemini 2.5 Flash for automated system analysis.',
    category: 'AI_SYSTEMS',
    status: 'Completed',
    role: 'Lead Developer',
    keyFeatures: ['Live Threat Detection', 'Smart Alerts', 'System Monitoring'],
    theBrief: 'Create a fully autonomous system that uses AI to monitor server health and security logs in real-time.',
    theExecution: 'Engineered a multi-threaded data pipeline that feeds system metrics into an LLM for rapid anomaly detection and classification.',
    theChallenges: 'The primary challenge was the "Noisy Signal" problem—filtering out benign system fluctuations from actual security threats. I solved this by implementing a secondary AI layer that cross-references current anomalies with historical baseline data before triggering an alert.',
    theImpact: 'Reduced critical incident response time by 65% and successfully identified three zero-day vulnerability attempts during the initial beta phase.'
  },
  {
    id: 'cognitive-ledger',
    title: 'Cognitive Ledger',
    description: 'Predictive financial modeling using distributed LLMs for real-time risk assessment.',
    tags: ['AI Systems', 'FinTech', 'LLMs'],
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2070',
    link: '#',
    year: '2025',
    techDetails: 'Python, FastAPI, Vector Databases (Pinecone), and RAG Architecture.',
    category: 'AI_SYSTEMS',
    status: 'Completed',
    role: 'AI Architect',
    keyFeatures: ['Sentiment Analysis', 'Risk Forecasting', 'Distributed Agents'],
    theBrief: 'Developing a risk-assessment engine that interprets global financial news to predict potential market volatility shifts.',
    theExecution: 'Implemented a Retrieval-Augmented Generation (RAG) system using Vector DBs to allow the model to access proprietary financial datasets instantly.',
    theChallenges: 'Handling "Context Drift"—where the AI would lose track of chronological relevance in news cycles. I implemented a time-decay weighting algorithm on retrieved documents to ensure recent data had the highest impact on output.',
    theImpact: 'Outperformed traditional statistical models by 22% in predicting short-term market corrections for our pilot clients.'
  },
  {
    id: 'novain-connect',
    title: 'Novain Connect',
    description: 'A unified platform for seamless organization management including members, elections, dues, and AI-powered announcements.',
    tags: ['Web Development', 'SaaS', 'AI Integration'],
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=2070',
    link: 'https://novainconnect.com/',
    year: '2025',
    techDetails: 'Built using Next.js, PostgreSQL, AI integration for announcement generation, and secure voting systems.',
    category: 'WEB',
    status: 'Completed',
    role: 'Senior Fullstack Developer',
    keyFeatures: ['Member Management', 'Secure Elections', 'Financial Tracking', 'AI Announcements'],
    theBrief: 'Create a comprehensive SaaS platform that enables organizations to manage members, conduct transparent elections, track finances, and communicate effectively from a single dashboard.',
    theExecution: 'Built a multi-tenant architecture with role-based access control, implemented cryptographically secure online/offline election systems, integrated AI for content generation, and developed financial tools for dues and donation tracking.',
    theChallenges: 'Ensuring election integrity while supporting both online and offline voting modes. Implemented a hybrid cryptographic verification system with paper trail backups and real-time vote validation to prevent fraud while maintaining transparency.',
    theImpact: 'Successfully deployed for multiple organizations with unlimited member support, enabling transparent democratic processes and streamlined operations. The platform reduced administrative overhead by 70% and increased member engagement by 45%.'
  },
  {
    id: 'novain-health',
    title: 'Novain Health',
    description: 'A comprehensive telemedicine platform connecting patients with certified medical professionals for 24/7 healthcare access.',
    tags: ['Web Development', 'HealthTech', 'Telemedicine'],
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2070',
    link: 'https://novainhealth.com/',
    year: '2025',
    techDetails: 'Next.js, React, TypeScript, real-time booking system, and integrated payment processing.',
    category: 'WEB',
    status: 'Completed',
    role: 'Lead Frontend Developer',
    keyFeatures: ['Doctor Booking', 'Emergency Consultations', 'Clinic Finder', 'Prescription Management'],
    theBrief: 'Build a scalable healthcare platform that provides instant access to verified medical professionals with appointment scheduling, emergency services, and comprehensive clinic management.',
    theExecution: 'Developed a responsive web application with location-based doctor search, real-time availability tracking, multi-specialty clinic integration, and a seamless booking flow supporting 24/7 emergency medical consultations.',
    theChallenges: 'Ensuring HIPAA compliance while maintaining a smooth user experience across doctor-patient interactions. Implemented end-to-end encryption for medical records and consultations while keeping the interface intuitive for non-technical users.',
    theImpact: 'Successfully onboarded 100+ certified medical professionals across multiple specialties, providing healthcare access to thousands of patients with features like emergency response, lab testing coordination, and specialized treatment options.'
  },
  {
    id: 'pulse-health',
    title: 'Pulse Health',
    description: 'High-performance fitness tracking app with real-time biometric synchronization.',
    tags: ['Mobile App', 'HealthTech', 'IoT'],
    imageUrl: 'https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&q=80&w=2070',
    link: '#',
    year: '2025',
    techDetails: 'React Native, Bluetooth Low Energy (BLE), and HealthKit.',
    category: 'MOBILE',
    status: 'Completed',
    role: 'Mobile Lead',
    keyFeatures: ['BLE Syncing', 'Offline Mode', 'Workout Insights'],
    theBrief: 'Create a mobile application that bridges the gap between consumer wearables and professional health data analysis.',
    theExecution: 'Developed a custom BLE wrapper to handle multi-device heart rate and SPO2 sensor streams simultaneously.',
    theChallenges: 'Inconsistent background processing rules between iOS and Android. I engineered a persistent background task scheduler that utilized native platform hooks to ensure zero data loss during active workouts.',
    theImpact: 'Achieved 99.9% data sync accuracy across 15+ different wearable brands, supporting over 100,000 active daily users.'
  },
  {
    id: 'orbit-travel',
    title: 'Orbit Travel',
    description: 'An AR-enhanced travel companion for seamless itinerary management and discovery.',
    tags: ['Mobile App', 'AR', 'Travel'],
    imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2070',
    link: '#',
    year: '2024',
    techDetails: 'Flutter, ARCore, and Google Maps SDK.',
    category: 'MOBILE',
    status: 'Completed',
    role: 'Fullstack Mobile Developer',
    keyFeatures: ['AR Wayfinding', 'Social Planning', 'Smart Itineraries'],
    theBrief: 'Design a mobile application that uses Augmented Reality to help travelers navigate complex airports and city centers.',
    theExecution: 'Leveraged ARCore for spatial mapping and integrated a custom social networking layer for shared travel itineraries.',
    theChallenges: 'Device thermal throttling during intense AR sessions in warm climates. I optimized the vertex shader complexity and implemented a dynamic LOD (Level of Detail) system to reduce GPU load by 40% based on device temperature.',
    theImpact: 'Adopted as the official companion app for three major international travel hubs, serving as the primary wayfinding tool for 2M+ travelers annually.'
  }
];
