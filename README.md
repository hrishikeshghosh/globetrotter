# Globetrotter - The Ultimate Travel Guessing Game

## 🌍 About the Project
Globetrotter is a full-stack web application where users receive cryptic clues about famous destinations and must guess the correct location. Once guessed, they unlock fun facts, trivia, and surprises about the destination. The game also allows users to challenge friends, track scores, and engage with dynamically generated clues.

## 🚀 Why Next.js 14 for This Project?
Next.js 14 is the perfect choice for building Globetrotter due to its cutting-edge features, seamless backend integration, and optimized performance. Here’s why:

- **App Router & Server Actions**: Enables smooth API handling and data fetching.
- **Incremental Static Regeneration (ISR)**: Ensures optimal performance with dynamic content updates.
- **Optimized SEO & Metadata**: Open Graph and structured metadata enhance sharing experience.
- **Server-Side Rendering (SSR) & Static Generation (SSG)**: Improves load times and user experience.
- **API Routes**: Securely fetch and store dataset without exposing it to the client.
- **Built-in Image Optimization**: Efficiently serves dynamically generated game images.

## 🔹 Core Features
### 1️⃣ Dataset Management
- Dataset with 100+ destinations.
- Clues, fun facts, and trivia for each destination.

### 2️⃣ Functional Web App
✅ Displays random cryptic clues for a destination.
✅ Allows users to select multiple-choice answers.
✅ Provides instant feedback:
   - 🎉 Correct Answer: Confetti animation + fun fact.
   - 😢 Incorrect Answer: Sad-face animation + fun fact.
✅ ‘Play Again’ and ‘Next’ button to continue.
✅ Score tracking for correct & incorrect answers.
✅ Secure backend storage of dataset.

### 3️⃣ "Challenge a Friend" Feature
✅ User registers with a unique username.
✅ Generates a shareable invite link with metadata & preview image.
✅ Shows invitee’s score before playing.
✅ Anyone with the link can play with full features.

## 🔧 Tech Stack
- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, Node.js, Express (if required)
- **Database**: PostgreSQL / MongoDB
- **Authentication**: NextAuth.js / Supabase Auth
- **Deployment**: Vercel (Frontend), Railway (Backend), AWS S3 (Media)

## 🛠️ Setup & Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/hrishikeshghosh/globetrotter.git
   cd globetrotter
   ```
2. Install dependencies:
   ```bash
   npm install  # or yarn install
   ```
3. Set up environment variables (`.env.local`):
   ```env
   NEXT_PUBLIC_API_URL=https://your-api-url.com
   DATABASE_URL=your_database_url
   ```
4. Start the development server:
   ```bash
   npm run dev  # or yarn dev
   ```
5. Access the app at `http://localhost:3000`

## 🎮 Live Demo & Deployment
- **GitHub Repo**: [Globetrotter](https://github.com/hrishikeshghosh/globetrotter/tree/beta)
- **Live Hosted Link**: [Globetrotter](https://globetrotter-beta.netlify.app/)

## 📺 Loom Walkthrough
[📹 Watch the Demo](your_loom_video_link_here)

## ✅ Extensibility & Future Enhancements
🔹 Timer-based game-ending logic.
🔹 Image-based clues instead of text-based.
🔹 User leaderboard and global ranking system.

## 📌 Contribution & Feedback
If you have suggestions or want to contribute, feel free to fork the repo and submit a PR. Feedback is always welcome!

🚀 Happy coding & guessing! 🌍

