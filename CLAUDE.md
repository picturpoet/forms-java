# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based web application called "Form APR Reconciler" that reviews filled-in Form APRs (Annual Performance Reports) for FEMA compliance under India's Overseas Investment regulations. The app uses Mistral AI's OCR and analysis capabilities to scan documents, flag issues, and recommend corrections.

## Development Commands

### Development
```bash
npm run dev          # Start development server on localhost:5173
npm install         # Install dependencies
```

### Build & Deployment
```bash
npm run build       # Build for production (outputs to /dist)
npm run preview     # Preview production build locally
```

### Deployment to Netlify
- Build command: `npm run build`
- Publish directory: `dist`
- Environment variable required: `VITE_MISTRAL_API_KEY`

## Architecture Overview

### Technology Stack
- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom brand colors
- **Routing**: React Router DOM
- **AI Integration**: Mistral AI API (OCR and chat completions)
- **Icons**: Lucide React
- **PDF Processing**: Client-side via Mistral OCR API

### Application Structure

The app follows a page-based routing structure:

```
src/
├── pages/
│   ├── LandingPage.tsx    # Homepage (/)
│   └── AprPage.tsx        # Main analysis page (/apr)
├── components/
│   ├── FileUpload.tsx     # Document upload interface
│   ├── ReviewOutput.tsx   # Analysis results display
│   ├── Header.tsx         # Navigation header
│   └── ui/                # Reusable UI components
├── services/
│   └── mistralApi.ts      # Mistral AI integration
```

### Key Components

**AprPage.tsx** (`src/pages/AprPage.tsx`)
- Main analysis interface with collapsible upload section
- Handles file uploads, API key management, and analysis orchestration
- Manages analysis progress states and error handling

**MistralApiService** (`src/services/mistralApi.ts`)
- Core AI integration service
- Processes documents using `mistral-ocr-latest` model
- Performs FEMA compliance analysis using `mistral-medium-latest`
- Contains comprehensive system prompt for APR-Guardian analysis

**FileUpload Component** (`src/components/FileUpload.tsx`)
- Handles Form APR (required) and supporting documents (optional)
- File validation (10MB limit for main PDF)
- Supports PDF, XLSX, CSV file types

### Data Flow

1. **Document Upload**: Users upload Form APR (required) + supporting docs
2. **OCR Processing**: Mistral OCR extracts text from all PDFs
3. **Analysis**: Extracted content + comprehensive system prompt → compliance review
4. **Output**: Structured report with executive summary, detailed field review, and verdict

### AI Integration Pattern

The application implements a sophisticated AI analysis system:
- Uses Mistral's OCR API for document text extraction
- Employs a detailed system prompt (APR-Guardian) for compliance checking
- Structured analysis output with severity classifications and corrective actions

### Environment Configuration

Required environment variables:
- `VITE_MISTRAL_API_KEY`: Mistral AI API key for OCR and analysis

### Styling System

Uses Tailwind with custom design tokens:
- **Brand Colors**: `brand-dark` (#44087D), `brand-light` (#E6E6F8)
- **Accent Colors**: `mna-yellow` (#F2BA46), `mna-orange` (#F2AA5C)
- **Typography**: Inter font family for UI, EB Garamond for headers
- **Custom Shadows**: `shadow-card`, `shadow-focus` for consistent elevation

### File Size & Type Restrictions

- Main Form APR: PDF only, 10MB limit
- Supporting docs: PDF, XLSX, CSV accepted
- Client-side processing only (no server-side storage)

### Error Handling Strategy

The app implements comprehensive error handling:
- API key validation and missing key messaging
- File size and type validation
- Mistral API error categorization (401, 429, 413, general)
- OCR confidence indicators and processing errors
- Graceful degradation for unreadable documents

## Development Guidelines

### Working with the Mistral Integration
- All API calls go through the `MistralApiService` class
- OCR processing uses base64 encoding with `data:application/pdf;base64,` prefix
- Analysis uses structured system prompts - modify carefully to maintain compliance logic
- Temperature is set to 0.3 for consistent analysis results

### Component Development
- Follow the established Tailwind design system with custom brand colors
- Use Lucide React for consistent iconography
- Maintain responsive design patterns (mobile-first approach)
- Implement loading states for async operations

### State Management
- Uses React's built-in state management (useState)
- File state managed in parent components and passed down
- Analysis progress tracked with descriptive status messages

### Testing Considerations
- No automated tests currently configured
- Manual testing required for file upload flows
- Test with various PDF formats and sizes
- Verify Mistral API integration with valid API keys