# Reverie Synaptic Pulse (RSP) — Full-Stack Platform

> **"Systems • Strategy • Scale"**  
> High-performance algorithmic trading infrastructure, IT consulting, and custom enterprise software development.  
> Official Website: [reveriesynapticpulse.com](https://www.reveriesynapticpulse.com)

---

## Architecture Overview

This repository contains the complete frontend and backend reconstruction of the Reverie Synaptic Pulse platform, engineered with high-frequency fintech aesthetics, glassmorphism, and live interactive modeling tools.

```
RSP/
├── client/                     # Frontend Application (React 18 + Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Dynamic glassmorphism nav with mobile drawer & active indicators
│   │   │   ├── Footer.jsx          # Comprehensive footer with sitemap & newsletter engine
│   │   │   ├── MarketTicker.jsx    # Live streaming market feed (auto-refreshing)
│   │   │   └── WhatsAppButton.jsx  # Floating instant communication action (+91 93637 05613)
│   │   ├── pages/
│   │   │   ├── HomePage.jsx                # Full landing experience with 3 core pillars & methodology
│   │   │   ├── AlgoTradingPage.jsx         # Algorithmic Trading with Performance Simulator
│   │   │   ├── ITConsultingPage.jsx        # Enterprise infrastructure & full tech stack matrix
│   │   │   ├── DigitalSolutionsPage.jsx    # Growth engine with Interactive ROI Modeler
│   │   │   ├── ChallengePage.jsx           # 48-Hour Architecture Challenge & Application Gateway
│   │   │   ├── AboutFounderPage.jsx        # Abishek S J profile, verified achievements & timeline
│   │   │   ├── PortfolioPage.jsx           # Filterable institutional case studies & live stats
│   │   │   ├── ContactPage.jsx             # Terminal-themed handshake protocol contact form
│   │   │   ├── RiskDisclosurePage.jsx      # Non-custodial institutional risk disclosures
│   │   │   ├── PrivacyPolicyPage.jsx       # Privacy protection protocols
│   │   │   └── TermsPage.jsx               # Master service agreement & institutional terms
│   │   ├── utils/
│   │   │   └── api.js              # Resilient API communication client with fallback mocks
│   │   ├── App.jsx                 # Single-page router with automatic scroll restoration
│   │   └── index.css               # Cyberpunk & fintech dark glassmorphism design system
│   ├── public/
│   │   └── favicon.svg             # Custom RSP geometric brand glyph
│   └── vite.config.js              # Port 3000, API proxy to :5000
│
└── server/                     # Backend API (Node.js + Express)
    ├── data/                   # Persistent JSON datastores
    │   ├── contacts.json           # Inquiries from Contact page
    │   ├── challenges.json         # Submissions from 48-Hour Challenge
    │   └── subscribers.json        # Newsletter subscribers
    ├── index.js                # Express server with RESTful API endpoints & CORS
    └── package.json
```

---

## Live Interactive Features

1. **Interactive Strategy Performance Simulator** (`/algorithmic-trading-solutions`):
   - Capital allocation slider ($10,000 to $1,000,000+)
   - Risk profiles: Conservative (1.8 - 2.4 Sharpe), Balanced (2.2 - 2.8 Sharpe), Aggressive (2.6 - 3.2 Sharpe)
   - Real-time projected annual yield, monthly return, win rate (68%-78%), and max drawdown calculations.

2. **Inbound Pipeline ROI Modeler** (`/digital-solutions`):
   - Monthly ad budget & targeted cost-per-lead (CPL) dynamically computing high-intent leads, closed accounts, and projected pipeline revenue.

3. **48-Hour Architecture Intervention Gateway** (`/48-hour-challenge`):
   - Interactive diagnosis form submitting company details, technical bottlenecks, and revenue tier to the backend.

4. **Live Market Data Ticker**:
   - Streaming quotes for `XAUUSD`, `EURUSD`, `GBPUSD`, `US30`, and `BTCUSD` updating continuously from the backend.

5. **Terminal-themed Contact Handshake** (`/contact`):
   - Structured protocol intake generating persistent server-side ticket IDs.

---

## Quickstart

### Prerequisites
- Node.js v18+ and npm installed.

### 1. Start Backend API
```bash
cd server
npm install
node index.js
```
*Backend runs on `http://localhost:5000` with automatic persistence in `server/data/`.*

### 2. Start Frontend Application
```bash
cd client
npm install
npm run dev
```
*Frontend runs on `http://localhost:3000`.*

### 3. Run Production Build
```bash
cd client
npm run build
npm run preview
```

---

## API Documentation

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health & telemetry |
| `GET` | `/api/market-data` | Real-time synthetic market quotes with price deltas |
| `GET` | `/api/case-studies` | Institutional case studies portfolio data |
| `POST` | `/api/contact` | Submits inquiry; returns confirmation ticket ID |
| `POST` | `/api/challenge` | Submits 48-hour challenge diagnostic application |
| `POST` | `/api/newsletter` | Subscribes an email to the intelligence dispatch |
| `GET` | `/api/admin/submissions` | Administrative view of all collected submissions |

---

## Corporate Information

- **Organization**: Reverie Synaptic Pulse (RSP)
- **Founder**: Abishek S J
- **Headquarters**: Erode, Tamil Nadu, India
- **WhatsApp Support**: `+91 93637 05613`
- **Email**: `admin@reveriesynapticpulse.com`
- **Architecture Principle**: 100% Non-Custodial — Execution algorithmic software connecting directly to client broker accounts via encrypted API tokens.
