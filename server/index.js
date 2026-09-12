import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const readJsonFile = (filename, defaultVal = []) => {
  const filePath = path.join(dataDir, filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultVal, null, 2));
    return defaultVal;
  }
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
    return defaultVal;
  }
};

const writeJsonFile = (filename, data) => {
  const filePath = path.join(dataDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    system: 'Reverie Synaptic Pulse Core API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    location: 'Tamil Nadu, India',
    version: '2.4.0'
  });
});

// Contact Endpoint
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, phone, service, budget, message, company } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Please provide required fields: name, email, and message.'
      });
    }

    const contacts = readJsonFile('contacts.json');
    const newInquiry = {
      id: 'RSP-' + Date.now().toString(36).toUpperCase(),
      name,
      email,
      phone: phone || 'Not provided',
      company: company || 'Not provided',
      service: service || 'General Consultation',
      budget: budget || 'Undisclosed',
      message,
      status: 'pending_review',
      createdAt: new Date().toISOString(),
      slaReplyHours: 4
    };

    contacts.unshift(newInquiry);
    writeJsonFile('contacts.json', contacts);

    console.log(`[RSP Handshake Protocol] New inquiry received from ${name} (${email}) - ${service}`);

    return res.status(201).json({
      success: true,
      message: 'Handshake protocol initiated. RSP responds within 4 business hours.',
      inquiryId: newInquiry.id
    });
  } catch (err) {
    console.error('Error handling contact submission:', err);
    return res.status(500).json({ success: false, error: 'Internal server error processing request.' });
  }
});

// 48-Hour Challenge Application Endpoint
app.post('/api/challenge', (req, res) => {
  try {
    const {
      yourName,
      emailAddress,
      mobileNumber,
      companyName,
      revenueRange,
      bottleneckDescription,
      preparedToExecute
    } = req.body;

    if (!yourName || !emailAddress || !mobileNumber || !companyName || !bottleneckDescription) {
      return res.status(400).json({
        success: false,
        error: 'All fields marked with an asterisk are required to evaluate challenge eligibility.'
      });
    }

    const challenges = readJsonFile('challenges.json');
    const newApplication = {
      id: 'CHLG-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
      yourName,
      emailAddress,
      mobileNumber,
      companyName,
      revenueRange: revenueRange || 'Confidential',
      bottleneckDescription,
      preparedToExecute: Boolean(preparedToExecute),
      evaluationStatus: 'UNDER_REVIEW',
      submittedAt: new Date().toISOString(),
      priorityTier: 'ELITE_48H'
    };

    challenges.unshift(newApplication);
    writeJsonFile('challenges.json', challenges);

    console.log(`[48-Hour Challenge] New application received for ${companyName} by ${yourName}`);

    return res.status(201).json({
      success: true,
      message: 'Application received. Our diagnostic team will assess the bottleneck within 12 hours.',
      applicationId: newApplication.id
    });
  } catch (err) {
    console.error('Error handling challenge application:', err);
    return res.status(500).json({ success: false, error: 'Internal server error processing application.' });
  }
});

// Newsletter Subscription
app.post('/api/newsletter', (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'Valid email required.' });
    }

    const subscribers = readJsonFile('subscribers.json');
    if (!subscribers.some(s => s.email.toLowerCase() === email.toLowerCase())) {
      subscribers.unshift({
        email,
        subscribedAt: new Date().toISOString()
      });
      writeJsonFile('subscribers.json', subscribers);
    }

    return res.json({ success: true, message: 'Subscribed to RSP Quantitative Insights.' });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Subscription failed.' });
  }
});

import { liveMarketEngine } from './liveMarketEngine.js';

// Live Quantitative Market Feed
app.get('/api/market-data', (req, res) => {
  const now = new Date();
  const pairs = liveMarketEngine.getAllPairs();

  res.json({
    updatedAt: now.toLocaleTimeString(),
    networkStatus: 'SYNCHRONIZED',
    totalExecutionsToday: 1540 + Math.floor(now.getMinutes() * 4),
    avgExecutionLatencyMs: '11.8ms',
    pairs
  });
});

// Live Trading Graph Data for every trading option
app.get('/api/trading-graph/:symbol', (req, res) => {
  const { symbol } = req.params;
  const { timeframe = '15m' } = req.query;

  try {
    const data = liveMarketEngine.getGraphData(symbol, timeframe);
    res.json(data);
  } catch (err) {
    console.error('Error fetching trading graph:', err);
    res.status(500).json({ success: false, error: 'Could not fetch trading graph' });
  }
});

// Real-Time Server-Sent Events (SSE) Live Trading Stream
app.get('/api/trading-stream/:symbol', (req, res) => {
  const symbol = (req.params.symbol || 'XAUUSD').toUpperCase();

  // Set SSE Headers
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*'
  });

  // Send initial snapshot
  const initialSnapshot = liveMarketEngine.getGraphData(symbol, '15m');
  res.write(`data: ${JSON.stringify({ type: 'snapshot', ...initialSnapshot })}\n\n`);

  // Listener for live ticks
  const tickListener = (tickData) => {
    res.write(`data: ${JSON.stringify({ type: 'tick', ...tickData })}\n\n`);
  };

  liveMarketEngine.on(`tick:${symbol}`, tickListener);

  // Clean up when client disconnects
  req.on('close', () => {
    liveMarketEngine.off(`tick:${symbol}`, tickListener);
    res.end();
  });
});

// Case Studies & Portfolio Data
app.get('/api/case-studies', (req, res) => {
  const caseStudies = [
    {
      id: 'aurivex-gold-trading',
      title: 'Aurivex: Dual-Engine Automated Trading Bot for XAUUSD',
      subtitle: 'Institutional-grade dual-engine bot with 100% precision entries and strict drawdown controls',
      category: 'Algo Trading / Gold',
      highlightStat: '100% Entry Precision',
      stats: [
        { label: 'Entry Precision', value: '100%' },
        { label: 'Risk:Reward (Scalp)', value: '1:2' },
        { label: 'Max Drawdown Cap', value: '< 3.8%' },
        { label: 'Execution Engine', value: 'Python MetaTrader 5' }
      ],
      techStack: ['Python 3.10+', 'MetaTrader 5 API', 'Pandas', 'NumPy', 'ZeroMQ'],
      description: 'Aurivex is an institutional-style dual-engine trading automaton developed exclusively for XAUUSD (Gold). It marries high-frequency micro-structure order-flow monitoring with macro liquidity sweeps, executing trades with millisecond latency while observing strict capital preservation rules.',
      features: [
        'Proprietary liquidity grab detection on London & NY session opens',
        'Dynamic lot sizing based on real-time ATR volatility',
        'Automatic breakeven and trailing stop laddering',
        'Integrated circuit breaker for high-impact FOMC and NFP news releases'
      ]
    },
    {
      id: 'algo-trading-systems',
      title: 'SMC Forex Automation: 89% Win Rate Quantitative System',
      subtitle: 'Rules-based execution with audited performance and strict institutional drawdown controls',
      category: 'Algo Trading / FX',
      highlightStat: '89% Win Rate',
      stats: [
        { label: 'Win Rate', value: '89%' },
        { label: '5-Day Returns', value: '21%' },
        { label: 'Profit Factor', value: '2.84' },
        { label: 'Platform', value: 'MT4 / MT5' }
      ],
      techStack: ['MQL4', 'MQL5', 'Python', 'TradingView Pine Script'],
      description: 'Engineered for funded challenge participants and proprietary trading firms, this automated Expert Advisor codifies Smart Money Concepts (SMC) and the Inner Circle Trader (ICT) methodology into algorithmic execution rules.',
      features: [
        'Automated Fair Value Gap (FVG) and Order Block detection',
        'Multi-timeframe confirmation (H4 bias, H1 structure, M15 entry)',
        'Hard daily drawdown limit protection (3% max loss auto-halt)',
        'Comprehensive live logging and Discord/Telegram instant alerts'
      ]
    },
    {
      id: 'proppass-ai',
      title: 'PropPass AI: Intelligent Journal & Analytics for Funded Traders',
      subtitle: 'A process-first platform improving trader consistency with structured, data-backed feedback loops',
      category: 'Fintech / AI Platform',
      highlightStat: '3x Review Speed',
      stats: [
        { label: 'Review Speed', value: '3x Faster' },
        { label: 'Consistency Metric', value: '+25%' },
        { label: 'Trader Retention', value: '94%' },
        { label: 'Active Users', value: '1,200+' }
      ],
      techStack: ['React', 'TypeScript', 'Supabase', 'Tailwind CSS', 'OpenAI API'],
      description: 'PropPass AI is an AI-powered trading journal and portfolio diagnostic platform. It automatically ingests trade logs from MetaTrader 4/5, identifies emotional bias and rule-breaking patterns, and gives actionable coaching suggestions.',
      features: [
        'One-click MT4/MT5 statement parsing',
        'Psychology and tilt risk score algorithms',
        'Equity curve forecasting and risk-of-ruin simulations',
        'Automated funded account rule compliance monitor'
      ]
    },
    {
      id: 'rsp-platform',
      title: 'RSP Wealth Platform: Automated Onboarding & Reporting Engine',
      subtitle: 'Centralized dashboards and automated reporting reducing manual effort and boosting transparency',
      category: 'Wealth Management / SaaS',
      highlightStat: '80% Faster Onboarding',
      stats: [
        { label: 'Client Retention', value: '98%' },
        { label: 'Operational Efficiency', value: '3x' },
        { label: 'Onboarding Speed', value: '80% Faster' },
        { label: 'Audit Compliance', value: '100%' }
      ],
      techStack: ['React', 'Node.js', 'PostgreSQL', 'Express', 'Docker'],
      description: 'Custom portal built for high-net-worth client portfolio management, providing investor transparency without custody compromises.',
      features: [
        'Investor view portal with read-only investor password sync',
        'Daily automated PDF tear sheet generation and email distribution',
        'Institutional risk tier classification and portfolio balancing',
        'Full GDPR & Indian regulatory compliance safeguards'
      ]
    },
    {
      id: 'tradingview-indicators',
      title: 'Proprietary Pine Script Indicator Suite for TradingView',
      subtitle: 'Enhanced setup detection speed with institutional chart overlays and real-time alerts',
      category: 'Trading Analytics',
      highlightStat: '500+ Active Users',
      stats: [
        { label: 'Active Users', value: '500+' },
        { label: 'Custom Scripts', value: '15+' },
        { label: 'Rating', value: '4.9/5' },
        { label: 'Chart Clarity', value: 'Institutional' }
      ],
      techStack: ['Pine Script v5', 'TradingView Webhooks', 'Node.js Alert Bot'],
      description: 'A suite of proprietary indicators engineered for high-precision discretionary and semi-automated traders, mapping market liquidity and structural displacement in real time.',
      features: [
        'Automatic premium/discount Fibonacci arrays',
        'Real-time liquidity pool sweeps and change of character markers',
        'Webhook trigger integration for MT4/MT5 automated execution'
      ]
    },
    {
      id: 'ai-insurance-platform',
      title: 'InsurTech AI Self-Service Prototype',
      subtitle: 'Reduced manual support dependency with guided policy discovery and claim workflows',
      category: 'InsurTech / AI Automation',
      highlightStat: '60% Support Reduction',
      stats: [
        { label: 'Support Reduction', value: '60%' },
        { label: 'Decision Speed', value: '3x' },
        { label: 'Claim Processing Time', value: '-45%' }
      ],
      techStack: ['TypeScript', 'JavaScript', 'CSS', 'Python NLP'],
      description: 'Hackathon-winning interactive prototype deploying natural language workflows for automated insurance quote configuration and instant claim triage.',
      features: [
        'Conversational policy recommender',
        'Automated document verification pipeline',
        'Instant fraud anomaly detection scoring'
      ]
    }
  ];

  res.json({ success: true, caseStudies });
});

// Admin Submissions Endpoint
app.get('/api/admin/submissions', (req, res) => {
  const contacts = readJsonFile('contacts.json');
  const challenges = readJsonFile('challenges.json');
  const subscribers = readJsonFile('subscribers.json');

  res.json({
    counts: {
      contacts: contacts.length,
      challenges: challenges.length,
      subscribers: subscribers.length
    },
    contacts,
    challenges,
    subscribers
  });
});

app.listen(PORT, () => {
  console.log(`[RSP Core Backend] Server running on http://localhost:${PORT}`);
});
