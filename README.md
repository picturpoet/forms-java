# 📋 Form APR Reconciler - powered by Regality

![React](https://img.shields.io/badge/React-18+-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue.svg)
![Vite](https://img.shields.io/badge/Vite-5+-green.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3+-blue.svg)

**Version:** v2.0  
**Author:** Srinivas Maddury  
**Date:** January 2025

---

## 🧠 Overview

This application reviews filled-in Form APRs (Annual Performance Reports) submitted under India's Overseas Investment (FEMA, 1999; OI Rules, 2022). It uses Mistral's cloud API (including mistral-ocr-latest) to scan each field, flag issues, and recommend corrections.

**Now built as a modern React web application compatible with Netlify deployment!**

---

## ⚡ Quick Start

### Prerequisites
- Node.js 18 or higher
- Mistral API key ([Get one here](https://console.mistral.ai/))

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd form-apr-reconciler
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to: http://localhost:5173

### Deployment to Netlify

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect your repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `dist`

---

## 📁 How to Use

1. **API Setup**
   - Enter your Mistral API key when prompted
   - Key is stored locally in your browser

2. **Upload Documents**
   - Upload a filled Form APR (PDF format)
   - Optionally upload supporting documents (PDFs, XLSX, CSV)

3. **Configure Analysis**
   - Choose AI model (default: Mistral OCR)
   - Adjust "Analysis Creativity" slider (0 = strict, 1 = creative)

4. **Review Results**
   - ✅ Executive Summary
   - ✅ Field-by-field issues
   - ✅ Missing-docs checklist
   - ✅ FEMA rule violations
   - ✅ Download review summary as .txt file

---

## 🛠 Technical Stack

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **PDF Processing:** Client-side PDF parsing
- **AI/ML:** Mistral AI API
- **Deployment:** Netlify compatible

---

## 📦 Project Structure

```
form-apr-reconciler/
├── src/
│   ├── components/
│   │   ├── ApiKeySetup.tsx     # API key configuration
│   │   ├── FileUpload.tsx      # File upload interface
│   │   ├── ConfigPanel.tsx     # Analysis settings
│   │   └── ReviewOutput.tsx    # Results display
│   ├── App.tsx                 # Main application
│   ├── main.tsx               # React entry point
│   └── index.css              # Global styles
├── public/                    # Static assets
├── package.json              # Dependencies
├── tailwind.config.js        # Tailwind configuration
├── vite.config.ts           # Vite configuration
└── README.md                # This documentation
```

---

## 🔐 Security Features

- ✅ Client-side API key storage (localStorage)
- ✅ HTTPS API communication with Mistral
- ✅ No server-side data storage
- ✅ Document processing in browser memory only
- ✅ No persistent storage of uploaded documents

---

## 💡 Key Improvements from Streamlit Version

- **✅ Netlify Compatible:** Static site deployment
- **✅ Modern UI:** React + Tailwind CSS design
- **✅ Better UX:** Drag & drop file uploads
- **✅ Responsive:** Mobile-friendly interface
- **✅ Type Safety:** Full TypeScript implementation
- **✅ Performance:** Vite build optimization

---

## 🚀 Development Roadmap

- ✅ **Phase 1:** Reconciler (current)
- 🔜 **Phase 2:** Form Filler
- 🔜 **Phase 3:** FEMA Q&A Chatbot (RAG based)
- 🔜 **Phase 4:** Real-time collaboration features

---

## 📊 API Usage

This application uses the following Mistral AI models:
- `mistral-ocr-latest` - For OCR processing (recommended)
- `mistral-large-latest` - For comprehensive analysis
- `mistral-medium-latest` - For balanced performance

---

## 🛟 Support

For technical support or questions, please contact: [Insert your email]

---

## ⚖️ License

This project is private and proprietary. Unauthorized copying, distribution, or modification is prohibited.

---

*Built with ❤️ for regulatory compliance automation*