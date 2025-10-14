# Leap Forward Assessment - Interactive Quiz App

An interactive quiz application built with Next.js featuring engaging animations, sound effects, and AI-powered voice hints.

## 🌐 Live Demo

**[View Live Demo](https://leap-forward-assessment.vercel.app/)**

> **Note:** The AI voice hint feature requires API keys to function. To experience the full AI-powered voice hints, please use the live demo link above. Running the app locally without API keys will have limited functionality.

## 🚀 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd leap-forward-assessment
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open the app**

   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Technologies Used

- **[Next.js 15.5.4](https://nextjs.org)** - React framework with App Router and Turbopack
- **[React 19.1.0](https://react.dev)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[TailwindCSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[TanStack React Query](https://tanstack.com/query)** - Server state management and data fetching
- **[GSAP](https://greensock.com/gsap/)** - Professional-grade animation library
- **[OpenAI API](https://openai.com/)** - AI-powered voice hints using GPT and TTS models
- **[FontAwesome](https://fontawesome.com/)** - Icon library
- **[Radix UI](https://www.radix-ui.com/)** - Accessible UI components (Tooltip)
- **[use-sound](https://github.com/joshwcomeau/use-sound)** - Sound effects hook

## 🎮 App Instructions

### Navigation Flow

1. **Home Page**

   - Select one of the 3 available levels

2. **Map Page**

   - "Unlock" buttons lead to the quiz

3. **Quiz Page** - Interactive quiz experience
   - **Sound Effects**: Background sounds play throughout the quiz
   - **Timer**: Each question has a countdown timer
   - **Multiple Choice**: Select one or more answers
   - **Visual Feedback**: Selected answers are highlighted
   - **Answer Validation**: Submit to see if your answers are correct
   - **Smooth Animations**: GSAP-powered entrance and transition animations

### 🤖 AI Feature - Voice Hints

Although not originally required, this app includes an **AI-powered voice hint feature**:

- Click the **"Geef me een tip..."** (Give me a tip) button
- The app generates a personalized hint using OpenAI's GPT model
- The hint is converted to speech using OpenAI's TTS (Text-to-Speech)
- A voice will play the hint in Dutch to help you answer the question
- The audio automatically stops when you move to the next question
- //TODO: cancel AI generation when moving to next question

## 🎨 Key Features

- ✨ Smooth GSAP animations throughout the app
- 🔊 Interactive sound effects for user actions
- ⏱️ Real-time countdown timers with visual warnings
- 🎯 Answer validation with visual feedback
- 📱 Responsive design for all screen sizes
- 🌐 Server-side data prefetching for instant page loads
- 🎤 AI-generated voice hints in Dutch
- ♿ Accessible UI components

## 🛠️ Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📂 Project Structure

```
app/
├── (main)/          # Home page with level selection
├── (map)/           # Map navigation page
├── (quiz)/          # Quiz functionality
│   ├── _components/ # Quiz-specific components
│   ├── _hooks/      # Custom hooks (timer, sounds, AI hints)
│   └── actions.ts   # Server actions for AI features
components/          # Shared components
lib/                 # Utilities and constants
public/              # Static assets (images, sounds)
```
