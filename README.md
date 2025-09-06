

# 🚀 AI LinkedIn Post Generator

An AI-powered tool to generate **engaging, LinkedIn-ready posts** from any topic in seconds.  
Built with **Next.js, Gemini AI, and SerpAPI**, it creates multiple variations of posts with hashtags and CTAs optimized for LinkedIn reach.

---

## ✨ Features

- 🤖 **AI-Powered Generation** – Uses Gemini AI to turn your topic into polished LinkedIn posts.  
- 🌐 **Web Insights** – Pulls top web results via SerpAPI to add recent references.  
- 🌟 **Multiple Variations** – Generates at least **3 unique drafts** per topic.  
- 📝 **LinkedIn Ready** – Includes hashtags + call-to-actions for better reach.  
- 📋 **One-Click Copy** – Copy any generated post instantly.  
- 🔄 **Generate Again** – Quickly regenerate new posts with a single click.  

---

## 🛠️ Tech Stack

- **Frontend**: Next.js (App Router, TypeScript, Plain CSS)  
- **Backend**: Next.js API Routes  
- **AI Model**: [Gemini 1.5 Flash](https://deepmind.google/technologies/gemini/)  
- **Search API**: [SerpAPI](https://serpapi.com/) for contextual insights  
- **Styling**: Plain CSS (`page.css`, `results.css`, `globals.css`)  

---

## 📂 Project Structure

```bash
app/
├── api/
│   └── generate/
│       └── route.ts         # API route to call Gemini + SerpAPI
│
├── results/
│   ├── page.tsx             # Results page UI
│   └── results.css          # Results page styles
│
├── globals.css              # Global styles
├── layout.tsx               # Root layout
├── page.tsx                 # Home page
└── page.css                 # Home page styles    # Home page style

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/linkedin-post-generator.git
cd linkedin-post-generator
````

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Add Environment Variables

Create a `.env.local` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key
SERP_API_KEY=your_serpapi_key
```

### 4️⃣ Run the Development Server

```bash
npm run dev
```

Open 👉 [http://localhost:3000](http://localhost:3000)

---

## 🌍 Deployment

This project can be deployed easily on **Vercel**.

To build and deploy manually:

```bash
npm run build
vercel deploy
```

---

## 📸 Screenshots

### 1. 🏠 Home Page
| **Image** | **Description** |
|-----------|-----------------|
| ![Home Page](https://github.com/user-attachments/assets/f3ed37ec-4cea-4c51-9e7b-fa856baf7bb9) | The landing page with hero section, feature cards, and CTA to start generating posts. |

---

### 2. 📝 Form Page
| **Image** | **Description** |
|-----------|-----------------|
| ![Form Page](https://github.com/user-attachments/assets/6f7d05c6-cba5-4ac5-a852-5f9253944f8a) | Input form where users select topic, tone, audience, length, and number of posts. |

---

### 3. 📄 Results Page
| **Image** | **Description** |
|-----------|-----------------|
| ![Result Page](https://github.com/user-attachments/assets/35697d2c-599b-404c-a075-740394a63828) | Displays generated LinkedIn posts in card format with copy button, hashtags, CTAs, and sources. |


---

## 🤝 Contributing

Pull requests are welcome!
If you find an issue, open an [Issue](https://github.com/<your-username>/linkedin-post-generator/issues).

---

## 📜 License

MIT License © 2025 \[Your Name]

---

⚡ *Built with Next.js, Gemini AI, and SerpAPI – to make LinkedIn posting effortless!*
