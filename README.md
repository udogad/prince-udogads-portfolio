# 🚀 Prince Udochukwu - Senior Systems Architect Portfolio

A modern, interactive portfolio website showcasing expertise in **Web Development**, **Mobile App Development**, and **AI Systems Integration**. Built with cutting-edge technologies and featuring AI-powered assistance, real-time visitor analytics, and immersive user experience.


[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Built with React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org/)


---

## ✨ Features

### 🤖 AI-Powered Chat Assistant
- **Gemini AI Integration**: Real-time conversational assistant that can answer questions about projects, skills, and experience
- **Context-Aware Responses**: The AI understands the entire portfolio context and can provide detailed technical insights
- **Smart Function Calling**: Can retrieve specific project details, skills, and contact information on demand

### 📊 Interactive Visualizations
- **Skills Radar Chart**: Visual representation of proficiency across Web, Mobile, and AI domains using Recharts
- **Tech Stack Display**: Organized showcase of technologies categorized by specialty areas
- **Project Filtering**: Filter projects by category (Web, Mobile, AI Systems)

### 🎯 Sentinel Protocol (Visitor Analytics)
- **Real-time Engagement Tracking**: Monitor visitor interactions and engagement patterns
- **Geolocation Integration**: Track visitor demographics and locations
- **Webhook Notifications**: Instant alerts for new contacts via Discord/Slack webhooks
- **Contact Form Integration**: Seamless inquiry management with instant notifications

### 🎨 Premium UI/UX
- **Glassmorphism Design**: Modern frosted-glass aesthetic with backdrop blur effects
- **Smooth Animations**: Fluid transitions and micro-interactions using CSS animations
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Dark Mode Theme**: Eye-friendly color scheme with cinematic contrast
- **Accessibility**: ARIA labels and semantic HTML for screen reader compatibility

### 📱 Project Showcase
- **Detailed Case Studies**: Each project includes brief, execution strategy, challenges, and impact
- **Image Galleries**: High-quality project screenshots and demos
- **Live Demo Links**: Direct links to deployed applications
- **GitHub Repository Links**: Access to source code
- **Technology Tags**: Clear indication of tech stack used

---

## 🛠️ Tech Stack

### **Frontend**
- **React 19.2** - Latest React with concurrent features
- **TypeScript 5.8** - Type-safe development
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first styling (configured via inline classes)

### **UI Components & Icons**
- **Lucide React** - Beautiful, customizable SVG icons
- **Recharts** - Composable charting library for data visualization

### **AI & Integration**
- **Google Generative AI (@google/genai)** - Gemini Flash model integration
- **Geolocation API** - Visitor tracking and analytics
- **Webhook Integration** - Discord/Slack notifications

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager


### Installation

1. **Clone the repository**
```bash
git clone https://github.com/udogad/prince-udogads-portfolio.git
cd prince-udogads-portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:
```env
API_KEY=your_gemini_api_key_here
```

4. **Run the development server**
```bash
npm run dev
```

The application will start at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized production build will be generated in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## ⚙️ Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|


### Customization Guide

All content can be customized by editing `constants.tsx`:

#### **Personal Information**
```typescript
export const NAME = "Your Name";
export const CONTACT_EMAIL = "your.email@example.com";
export const GITHUB_URL = "https://github.com/yourusername";
export const LINKEDIN_URL = "https://linkedin.com/in/yourusername";
export const TWITTER_URL = "https://twitter.com/yourusername";
export const PROFILE_IMAGE_URL = "your_image_url";
```

#### **Projects**
Add/edit projects in the `PROJECTS` array:
```typescript
{
  id: 'unique-id',
  title: 'Project Name',
  year: '2024',
  category: 'WEB', // 'WEB' | 'MOBILE' | 'AI_SYSTEMS'
  tags: ['React', 'Node.js'],
  imageUrl: 'project_image_url',
  description: 'Short description',
  brief: 'Detailed brief',
  execution: 'Technical approach',
  challenges: 'Problems solved',
  impact: 'Results achieved',
  liveUrl: 'https://demo.com',
  githubUrl: 'https://github.com/username/repo'
}
```

#### **Skills & Tech Stack**
Modify `SKILLS` and `TECH_STACK` arrays to reflect your expertise.

#### **Webhook Notifications**
Enable Sentinel Protocol by adding your webhook URL:
```typescript
export const SENTINEL_WEBHOOK_URL = "your_discord_or_slack_webhook_url";
```

---

## 📂 Project Structure

```
prince-udogads-portfolio/
├── components/              # React components
│   ├── AIChatBot.tsx       # Gemini AI chat interface
│   ├── JourneyModal.tsx    # Career journey timeline
│   ├── Navbar.tsx          # Navigation header
│   ├── ProjectCarousel.tsx # Project slideshow
│   ├── ProjectModal.tsx    # Project detail modal
│   ├── SentinelPulse.tsx   # Visitor analytics
│   ├── SkillsRadar.tsx     # Skills visualization
│   ├── TechStack.tsx       # Technology showcase
│   └── TourGuide.tsx       # Interactive tour
├── services/
│   └── geminiService.ts    # Gemini AI integration
├── App.tsx                 # Main application component
├── constants.tsx           # Configuration & content data
├── types.ts                # TypeScript type definitions
├── index.tsx               # Application entry point
├── index.html              # HTML template
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies & scripts
└── netlify.toml            # Netlify deployment config
```

---

## 🌐 Deployment

### Netlify (Recommended)

This project is configured for Netlify deployment with `netlify.toml`.

1. **Connect your repository** to Netlify
2. **Set environment variables** in Netlify dashboard:
   - `API_KEY`: Your Gemini API key
3. **Deploy** - Netlify will automatically build and deploy

### Vercel

```bash
npm install -g vercel
vercel --prod
```

### Manual Deployment

1. Build the project: `npm run build`
2. Upload the `dist/` folder to your hosting provider
3. Ensure environment variables are configured on the server

---

## 🎨 Key Components

### AI Chat Assistant
Located in `components/AIChatBot.tsx`, powered by Google Gemini Flash model. Supports:
- Project information retrieval
- Skills and experience queries
- Contact information
- Technical discussions

### Sentinel Protocol
Real-time visitor tracking in `components/SentinelPulse.tsx`:
- Captures visitor location via Geolocation API
- Sends webhook notifications for new contacts
- Displays engagement metrics

### Skills Radar
Interactive radar chart in `components/SkillsRadar.tsx` visualizing proficiency across:
- Web Development
- Mobile App Development
- AI Systems

---

## 📸 Features Showcase

- **Hero Section**: Full-screen introduction with animated gradients and profile image
- **Project Gallery**: Filterable grid layout with hover effects and modal details
- **Tech Stack**: Categorized technology display with descriptions
- **About Section**: Career philosophy and work process
- **Contact Form**: Direct inquiry submission with webhook notifications
- **Responsive Navigation**: Smooth scroll anchors and mobile-friendly menu

---

## 🔧 Development

### Code Style
- **TypeScript** for type safety
- **Functional Components** with React Hooks
- **Tailwind CSS** for styling (utility-first approach)
- **ESM** module system

### Performance Optimizations
- Lazy loading for images (`loading="lazy"`)
- Optimized asset delivery with Vite
- Minimal dependencies for faster load times
- CSS-in-JS avoided for better performance

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👤 Contact

**Prince Udochukwu Ukasoanya**

- **Email**: smileud76@gmail.com
- **GitHub**: [@udogad](https://github.com/udogad)
- **LinkedIn**: [linkedin.com/in/udogad](https://linkedin.com/in/udogad)
- **Twitter**: [@princeudogod](https://twitter.com/princeudogod)

---

## 🙏 Acknowledgments

- ** Prince Udochukwu for his tenacity
- ** Rosemary Ekeagwu for her review
- **React Team** for the amazing framework
- **Vite** for the blazing-fast build tool
- **Tailwind CSS** for the utility-first styling system
- **Lucide Icons** for beautiful SVG icons

---

## 🌟 Show Your Support

If you found this portfolio template helpful, please consider:
- ⭐ Starring this repository
- 🍴 Forking it for your own use
- 📢 Sharing it with others

---

**Built with ❤️ by Prince Udochukwu Ukasoanya**
