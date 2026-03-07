# Prince Udochukwu Portfolio

Professional portfolio website built with React and TypeScript to showcase selected web, mobile, and AI systems projects.

## Overview

This repository powers a single-page portfolio with:
- project filtering by domain (Web, Mobile, AI Systems)
- detailed case-study modals for each project
- an AI assistant powered by Google Gemini
- skills visualization and technology stack sections
- contact form workflow with optional webhook notifications

## Source Code Visibility (Public vs NDA)

Each project supports explicit source-code visibility:
- `sourceCodeUrl` present: visitors see a clickable **Source Code** button
- `isSourceCodePrivate: true`: visitors see a professional NDA/confidentiality notice
- neither set: visitors see **Source Code Unavailable**

This keeps public work accessible while handling confidential client work cleanly.

## Tech Stack

- React 19
- TypeScript 5
- Vite 6
- Lucide React
- Recharts
- Google Generative AI (`@google/genai`)
- Tailwind utility classes (loaded via CDN in `index.html`)

## Project Configuration

Portfolio content is managed in `constants.tsx`.

Project schema (simplified):

```ts
{
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link: string;
  sourceCodeUrl?: string;
  isSourceCodePrivate?: boolean;
  year: string;
  techDetails: string;
  category: 'WEB' | 'MOBILE' | 'AI_SYSTEMS';
  status: 'Completed' | 'In Progress' | 'Beta';
  role: string;
  keyFeatures: string[];
  theBrief: string;
  theExecution: string;
  theChallenges: string;
  theImpact: string;
}
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/udogad/prince-udogads-portfolio.git
cd prince-udogads-portfolio
npm install
```

### Environment Variables

Create `.env.local` in the project root:

```env
API_KEY=your_gemini_api_key
```

| Variable | Required | Description |
| --- | --- | --- |
| `API_KEY` | Yes | Gemini API key used by `services/geminiService.ts` |

### Run Locally

```bash
npm run dev
```

Default local URL: `http://localhost:5173`

## Build and Preview

```bash
npm run build
npm run preview
```

## Scripts

- `npm run dev`: start development server
- `npm run build`: create production build
- `npm run preview`: preview production build locally

## Deployment

The repo includes `netlify.toml` and works with standard Vite deployment flows.

General steps:
1. Set `API_KEY` in your hosting environment.
2. Run build (`npm run build`) during deploy.
3. Publish the `dist/` directory.

## Repository Structure

```text
components/        UI components
services/          External service integrations (Gemini)
App.tsx            Main application
constants.tsx      Portfolio content and configuration
types.ts           Shared TypeScript types
index.tsx          Application entry
```

## Contact

Prince Udochukwu Ukasoanya
- Email: smileud76@gmail.com
- LinkedIn: https://linkedin.com/in/udogad
- GitHub: https://github.com/udogad
- Twitter: https://twitter.com/princeudogod

## License

`LICENSE` exists in this repository but currently contains no finalized license text.
