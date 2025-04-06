# VetAI Vision

A modern veterinary imaging analysis platform that uses AI to assist in diagnosing medical conditions from X-rays and other medical imaging.

![VetAI Vision Demo](https://images.unsplash.com/photo-1584486483122-af7d49cf2992?auto=format&fit=crop&q=80&w=2000)

## 🌟 Features

- 🔍 AI-powered image analysis for veterinary diagnostics
- 📊 Detailed analysis findings with confidence scores
- 📋 Patient information management
- 📜 Medical history tracking
- 🧪 Laboratory results monitoring
- 💊 Medication tracking
- 🔒 Secure and privacy-focused

## 🚀 Live Demo

Check out the live demo: [VetAI Vision Demo](https://kaleidoscopic-kleicha-fbfbcd.netlify.app)

## 🛠️ Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React Icons
- Supabase Edge Functions

## 📋 Prerequisites

- Node.js 18+ 
- npm 9+

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 📁 Project Structure

```
├── src/
│   ├── App.tsx           # Main application component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles
├── supabase/
│   └── functions/       # Supabase Edge Functions
│       └── analyze-image/
│           └── index.ts # Image analysis function
└── public/             # Static assets
```

## 🔧 Configuration

The project uses the following environment variables:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🤝 Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.