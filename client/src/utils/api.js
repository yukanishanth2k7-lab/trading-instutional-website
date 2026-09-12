const API_BASE = '/api';

export async function fetchHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    return await res.json();
  } catch (err) {
    console.warn('API health check error:', err);
    return { status: 'offline' };
  }
}

export async function fetchMarketData() {
  try {
    const res = await fetch(`${API_BASE}/market-data`);
    if (!res.ok) throw new Error('Failed to fetch market data');
    return await res.json();
  } catch (err) {
    console.error(err);
    // Fallback static data if backend is starting
    return {
      updatedAt: 'Live',
      networkStatus: 'SYNCHRONIZED',
      totalExecutionsToday: 1580,
      avgExecutionLatencyMs: '12ms',
      pairs: [
        { symbol: 'XAUUSD', name: 'Gold / US Dollar', price: '2724.80', change24h: '+1.42%', isPositive: true, winRate: '89.4%', profitFactor: '2.84', activeSignal: 'Bullish Order Block (H1 Mitigated)', eaEngine: 'Aurivex v3.2' },
        { symbol: 'EURUSD', name: 'Euro / US Dollar', price: '1.0845', change24h: '+0.38%', isPositive: true, winRate: '84.2%', profitFactor: '2.31', activeSignal: 'Fair Value Gap Expansion', eaEngine: 'PulseMomentum EA' },
        { symbol: 'GBPUSD', name: 'British Pound / US Dollar', price: '1.2982', change24h: '-0.15%', isPositive: false, winRate: '81.6%', profitFactor: '2.15', activeSignal: 'Sell-Side Liquidity Sweep', eaEngine: 'SMC Execution Node' },
        { symbol: 'US30', name: 'Dow Jones Industrial', price: '43210.0', change24h: '+0.74%', isPositive: true, winRate: '86.1%', profitFactor: '2.62', activeSignal: 'NY Open Momentum Break', eaEngine: 'PulsePrime Index' },
        { symbol: 'BTCUSD', name: 'Bitcoin / US Dollar', price: '68420.0', change24h: '+3.18%', isPositive: true, winRate: '78.5%', profitFactor: '2.45', activeSignal: 'Volume Delta Absorption', eaEngine: 'PulseMomentum Crypto' }
      ]
    };
  }
}

export async function fetchTradingGraph(symbol = 'XAUUSD', timeframe = '15m') {
  try {
    const res = await fetch(`${API_BASE}/trading-graph/${symbol}?timeframe=${timeframe}`);
    if (!res.ok) throw new Error('Failed to fetch trading graph data');
    return await res.json();
  } catch (err) {
    console.warn('Trading graph fetch error:', err);
    return null;
  }
}

export async function fetchCaseStudies() {
  try {
    const res = await fetch(`${API_BASE}/case-studies`);
    if (!res.ok) throw new Error('Failed to fetch case studies');
    return await res.json();
  } catch (err) {
    console.error(err);
    return { success: false, caseStudies: [] };
  }
}

export async function submitContact(data) {
  const res = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await res.json();
}

export async function submitChallenge(data) {
  const res = await fetch(`${API_BASE}/challenge`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await res.json();
}

export async function subscribeNewsletter(email) {
  const res = await fetch(`${API_BASE}/newsletter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  return await res.json();
}
