import React, { useState, useEffect, useRef } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Maximize2,
  Sliders,
  ShieldCheck,
  Zap,
  BarChart2,
  LineChart,
  ArrowRight,
  Radio,
  Clock,
  Layers,
  Sparkles
} from 'lucide-react';
import { fetchTradingGraph } from '../utils/api';

export default function LiveTradingGraph({ navigate }) {
  const [selectedSymbol, setSelectedSymbol] = useState('XAUUSD');
  const [timeframe, setTimeframe] = useState('15m');
  const [chartMode, setChartMode] = useState('candles'); // 'candles' | 'area'
  const [showEma, setShowEma] = useState(true);
  const [showSmc, setShowSmc] = useState(true);
  const [showVolume, setShowVolume] = useState(true);

  const [graphData, setGraphData] = useState(null);
  const [candles, setCandles] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(2724.80);
  const [previousPrice, setPreviousPrice] = useState(2724.80);
  const [tickDirection, setTickDirection] = useState('neutral'); // 'up' | 'down' | 'neutral'
  const [orderBook, setOrderBook] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('CONNECTING');
  const [hoveredCandle, setHoveredCandle] = useState(null);
  const [crosshair, setCrosshair] = useState(null);

  const eventSourceRef = useRef(null);
  const svgRef = useRef(null);

  // Available Trading Options
  const tradingOptions = [
    { symbol: 'XAUUSD', name: 'Gold / USD', tag: 'Metals', defaultPrice: '2724.80', change: '+1.42%', isPositive: true },
    { symbol: 'EURUSD', name: 'Euro / USD', tag: 'FX Major', defaultPrice: '1.0845', change: '+0.38%', isPositive: true },
    { symbol: 'GBPUSD', name: 'Pound / USD', tag: 'FX Major', defaultPrice: '1.2982', change: '-0.15%', isPositive: false },
    { symbol: 'US30', name: 'Dow Jones 30', tag: 'US Index', defaultPrice: '43210.0', change: '+0.74%', isPositive: true },
    { symbol: 'BTCUSD', name: 'Bitcoin / USD', tag: 'Crypto', defaultPrice: '68420.0', change: '+3.18%', isPositive: true },
    { symbol: 'NAS100', name: 'Nasdaq 100', tag: 'Tech Index', defaultPrice: '20180.0', change: '+1.12%', isPositive: true }
  ];

  // Timeframes available
  const timeframes = [
    { id: '1m', label: '1M' },
    { id: '5m', label: '5M' },
    { id: '15m', label: '15M' },
    { id: '1h', label: '1H' },
    { id: '1d', label: '1D' }
  ];

  // Fetch initial graph snapshot whenever symbol or timeframe changes
  useEffect(() => {
    let isMounted = true;
    setConnectionStatus('SYNCING');

    const loadInitialData = async () => {
      const data = await fetchTradingGraph(selectedSymbol, timeframe);
      if (isMounted && data && data.success) {
        setGraphData(data);
        setCandles(data.candles || []);
        setCurrentPrice(data.currentPrice);
        setPreviousPrice(data.currentPrice);
        setOrderBook(data.orderBook);
        setConnectionStatus('LIVE');
      }
    };

    loadInitialData();

    // Setup Live Server-Sent Events (SSE) Stream
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    try {
      const es = new EventSource(`/api/trading-stream/${selectedSymbol}`);
      eventSourceRef.current = es;

      es.onopen = () => {
        if (isMounted) setConnectionStatus('LIVE');
      };

      es.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload.type === 'tick') {
            const newPrice = payload.price;
            setCurrentPrice((prev) => {
              if (newPrice > prev) setTickDirection('up');
              else if (newPrice < prev) setTickDirection('down');
              return newPrice;
            });

            if (payload.orderBook) {
              setOrderBook(payload.orderBook);
            }

            // Update forming candle in real-time
            setCandles((prevList) => {
              if (!prevList || prevList.length === 0) return prevList;
              const next = [...prevList];
              const last = { ...next[next.length - 1] };
              last.close = newPrice;
              if (newPrice > last.high) last.high = newPrice;
              if (newPrice < last.low) last.low = newPrice;
              last.volume = (last.volume || 100) + 2;
              last.ema20 = Number((newPrice * 0.095 + (last.ema20 || newPrice) * 0.905).toFixed(4));
              next[next.length - 1] = last;
              return next;
            });
          }
        } catch (err) {
          console.warn('SSE parsing tick error:', err);
        }
      };

      es.onerror = () => {
        if (isMounted) setConnectionStatus('POLLING');
        es.close();
      };
    } catch (e) {
      setConnectionStatus('POLLING');
    }

    // High frequency fallback polling in case SSE is blocked by proxy
    const pollInterval = setInterval(async () => {
      const liveData = await fetchTradingGraph(selectedSymbol, timeframe);
      if (isMounted && liveData && liveData.success) {
        setCurrentPrice((prev) => {
          if (liveData.currentPrice > prev) setTickDirection('up');
          else if (liveData.currentPrice < prev) setTickDirection('down');
          return liveData.currentPrice;
        });
        setCandles(liveData.candles || []);
        setOrderBook(liveData.orderBook);
        setGraphData((prev) => ({ ...prev, ...liveData }));
      }
    }, 2000);

    return () => {
      isMounted = false;
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
      clearInterval(pollInterval);
    };
  }, [selectedSymbol, timeframe]);

  // Reset tick direction animation back to neutral after 600ms
  useEffect(() => {
    if (tickDirection !== 'neutral') {
      const timer = setTimeout(() => setTickDirection('neutral'), 600);
      return () => clearTimeout(timer);
    }
  }, [tickDirection]);

  // Chart Dimensions & Coordinate Mappings
  const chartWidth = 900;
  const chartHeight = 360;
  const padding = { top: 25, right: 65, bottom: 45, left: 15 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  const validCandles = candles && candles.length > 0 ? candles : [];
  const minPrice = validCandles.length > 0 ? Math.min(...validCandles.map((c) => c.low)) : currentPrice * 0.99;
  const maxPrice = validCandles.length > 0 ? Math.max(...validCandles.map((c) => c.high)) : currentPrice * 1.01;
  const priceRange = maxPrice - minPrice || 1;

  const maxVolume = validCandles.length > 0 ? Math.max(...validCandles.map((c) => c.volume || 1)) : 1000;

  // Coordinate transforms
  const getY = (val) => innerHeight - ((val - minPrice) / priceRange) * innerHeight + padding.top;
  const getX = (idx) => padding.left + (idx / Math.max(1, validCandles.length - 1)) * innerWidth;
  const candleWidth = Math.max(3, Math.min(12, (innerWidth / (validCandles.length || 1)) * 0.7));

  // Area chart path points
  const areaPath = validCandles.reduce((acc, c, idx) => {
    const x = getX(idx);
    const y = getY(c.close);
    return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  const areaFillPath = areaPath
    ? `${areaPath} L ${padding.left + innerWidth} ${padding.top + innerHeight} L ${padding.left} ${padding.top + innerHeight} Z`
    : '';

  // EMA line points
  const emaPath = validCandles.reduce((acc, c, idx) => {
    if (!c.ema20) return acc;
    const x = getX(idx);
    const y = getY(c.ema20);
    return acc === '' ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  // Handle Mouse Move for Crosshair
  const handleMouseMove = (e) => {
    if (!svgRef.current || validCandles.length === 0) return;
    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const scaleX = chartWidth / rect.width;
    const adjustedX = mouseX * scaleX;

    const ratio = Math.max(0, Math.min(1, (adjustedX - padding.left) / innerWidth));
    const index = Math.round(ratio * (validCandles.length - 1));
    const candle = validCandles[index];

    if (candle) {
      setHoveredCandle(candle);
      setCrosshair({
        x: getX(index),
        y: getY(candle.close),
        price: candle.close,
        time: new Date(candle.time).toLocaleTimeString()
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredCandle(null);
    setCrosshair(null);
  };

  // Active Symbol metadata
  const activeOpt = tradingOptions.find((o) => o.symbol === selectedSymbol) || tradingOptions[0];
  const decimals = selectedSymbol === 'EURUSD' || selectedSymbol === 'GBPUSD' ? 4 : 2;

  return (
    <section className="py-20 bg-[#07090e] border-t border-b border-white/10 relative z-10 overflow-hidden">
      {/* Ambient Radial Lighting */}
      <div className="absolute top-10 left-1/3 w-[650px] h-[350px] bg-[#FF6B00]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[350px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#FF6B00]/30 bg-[#0d111a]/90 backdrop-blur-xl mb-3 shadow-[0_0_20px_rgba(255,107,0,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B00] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6B00]" />
              </span>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#FF9D42] font-bold">
                LIVE TRADING GRAPH SERVER // ACCURATE STREAM
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight leading-tight">
              Real-Time <span className="text-gradient-orange">Institutional Feeds</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-2xl font-light">
              High-precision, live-forming candlestick stream for every RSP algorithmic deployment. Operating with sub-12ms latency and audited Smart Money Concepts (SMC) order-flow confirmation.
            </p>
          </div>

          {/* Connection Telemetry Pill */}
          <div className="flex items-center gap-3 bg-[#0d111a] border border-white/10 rounded-2xl px-4 py-2.5 backdrop-blur-xl font-mono text-xs">
            <div className="flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  connectionStatus === 'LIVE'
                    ? 'bg-emerald-400 animate-pulse'
                    : connectionStatus === 'POLLING'
                    ? 'bg-amber-400'
                    : 'bg-cyan-400 animate-ping'
                }`}
              />
              <span className="text-slate-300 font-semibold">{connectionStatus} ENGINE</span>
            </div>
            <span className="text-slate-600">|</span>
            <span className="text-cyan-400 font-bold">&lt; 12ms FIX 4.4</span>
          </div>
        </div>

        {/* Trading Options Asset Switcher (Every Trading Option) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-6">
          {tradingOptions.map((opt) => {
            const isSelected = selectedSymbol === opt.symbol;
            return (
              <button
                key={opt.symbol}
                onClick={() => setSelectedSymbol(opt.symbol)}
                className={`p-3.5 rounded-xl text-left transition-all relative overflow-hidden cursor-pointer border ${
                  isSelected
                    ? 'bg-[#0d111a] border-[#FF6B00] shadow-lg shadow-[#FF6B00]/20'
                    : 'bg-[#090c13]/70 hover:bg-[#0d111a] border-white/5 hover:border-white/15'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#FF6B00] to-[#FF9D42]" />
                )}
                <div className="flex items-center justify-between mb-1">
                  <span className="font-heading font-black text-white text-sm tracking-wide">
                    {opt.symbol}
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-400">
                    {opt.tag}
                  </span>
                </div>
                <div className="text-xs text-slate-400 truncate mb-1.5 font-light">{opt.name}</div>
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-xs font-bold text-slate-200">
                    {isSelected ? Number(currentPrice).toFixed(opt.symbol === 'EURUSD' || opt.symbol === 'GBPUSD' ? 4 : 2) : opt.defaultPrice}
                  </span>
                  <span
                    className={`text-[10px] font-mono font-semibold ${
                      opt.isPositive ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {opt.change}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Trading Station */}
        <div className="glass-card rounded-3xl border border-white/10 bg-[#090c13]/90 backdrop-blur-2xl overflow-hidden shadow-2xl">
          {/* Top Station Bar: Live Asset Price, EA Engine & Controls */}
          <div className="p-5 sm:p-6 border-b border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  {activeOpt.name} // {graphData?.category || activeOpt.tag}
                </div>
                <div className="flex items-baseline gap-3 mt-0.5">
                  <span
                    className={`text-3xl sm:text-4xl font-black font-heading transition-colors duration-300 ${
                      tickDirection === 'up'
                        ? 'text-emerald-400'
                        : tickDirection === 'down'
                        ? 'text-rose-400'
                        : 'text-white'
                    }`}
                  >
                    {Number(currentPrice).toFixed(decimals)}
                  </span>
                  <span
                    className={`inline-flex items-center text-xs font-mono font-bold px-2 py-0.5 rounded ${
                      activeOpt.isPositive
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {activeOpt.isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {activeOpt.change}
                  </span>
                </div>
              </div>

              {/* Execution Engine Pill */}
              <div className="hidden sm:flex flex-col border-l border-white/10 pl-4">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Algorithm Node</span>
                <span className="text-xs font-mono font-bold text-[#FF9D42] mt-0.5">
                  {graphData?.eaEngine || 'Aurivex Engine v3.2'}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 mt-0.5">
                  {graphData?.activeSignal || 'Bullish Order Block Mitigated'}
                </span>
              </div>
            </div>

            {/* Timeframe & Display Mode Controls */}
            <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto justify-end">
              {/* Chart Mode Toggle */}
              <div className="flex items-center bg-[#0d111a] p-1 rounded-xl border border-white/10">
                <button
                  onClick={() => setChartMode('candles')}
                  className={`px-3 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                    chartMode === 'candles'
                      ? 'bg-[#FF6B00] text-black font-bold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Candlestick View"
                >
                  <BarChart2 className="w-3.5 h-3.5" />
                  <span>Candles</span>
                </button>
                <button
                  onClick={() => setChartMode('area')}
                  className={`px-3 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                    chartMode === 'area'
                      ? 'bg-[#FF6B00] text-black font-bold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Glow Curve View"
                >
                  <LineChart className="w-3.5 h-3.5" />
                  <span>Area</span>
                </button>
              </div>

              {/* Timeframes */}
              <div className="flex items-center bg-[#0d111a] p-1 rounded-xl border border-white/10">
                {timeframes.map((tf) => (
                  <button
                    key={tf.id}
                    onClick={() => setTimeframe(tf.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono uppercase font-bold transition-all cursor-pointer ${
                      timeframe === tf.id
                        ? 'bg-white/15 text-[#FF9D42] border border-[#FF6B00]/40'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tf.label}
                  </button>
                ))}
              </div>

              {/* Indicators Toggles */}
              <button
                onClick={() => setShowEma(!showEma)}
                className={`px-2.5 py-1.5 rounded-xl border text-[11px] font-mono transition-all cursor-pointer ${
                  showEma
                    ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300'
                    : 'border-white/10 bg-transparent text-slate-500'
                }`}
              >
                EMA 20
              </button>
              <button
                onClick={() => setShowSmc(!showSmc)}
                className={`px-2.5 py-1.5 rounded-xl border text-[11px] font-mono transition-all cursor-pointer ${
                  showSmc
                    ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300'
                    : 'border-white/10 bg-transparent text-slate-500'
                }`}
              >
                SMC Blocks
              </button>
            </div>
          </div>

          {/* Interactive Chart Canvas Area */}
          <div className="relative p-2 sm:p-6 bg-[#06080d]">
            {/* Hover Crosshair Info Box */}
            {hoveredCandle && crosshair && (
              <div className="absolute top-4 left-6 z-20 bg-[#0d111a]/95 border border-[#FF6B00]/40 rounded-xl p-3 shadow-xl backdrop-blur-xl font-mono text-xs text-slate-200 pointer-events-none flex flex-wrap gap-4">
                <div>
                  <span className="text-slate-500 text-[10px] block">TIME</span>
                  <span className="font-bold">{crosshair.time}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">OPEN</span>
                  <span className="font-bold">{hoveredCandle.open.toFixed(decimals)}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">HIGH</span>
                  <span className="font-bold text-emerald-400">{hoveredCandle.high.toFixed(decimals)}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">LOW</span>
                  <span className="font-bold text-rose-400">{hoveredCandle.low.toFixed(decimals)}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">CLOSE</span>
                  <span
                    className={`font-bold ${
                      hoveredCandle.close >= hoveredCandle.open ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {hoveredCandle.close.toFixed(decimals)}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">VOL</span>
                  <span className="font-bold text-slate-300">{hoveredCandle.volume}</span>
                </div>
              </div>
            )}

            {/* SVG Live Chart */}
            <div className="w-full overflow-hidden">
              <svg
                ref={svgRef}
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="w-full h-[320px] sm:h-[400px] select-none cursor-crosshair"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <defs>
                  {/* Neon Glow Gradient for Area Chart */}
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.45" />
                    <stop offset="50%" stopColor="#FF6B00" stopOpacity="0.10" />
                    <stop offset="100%" stopColor="#FF6B00" stopOpacity="0.0" />
                  </linearGradient>

                  <linearGradient id="bullishCandle" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>

                  <linearGradient id="bearishCandle" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F43F5E" />
                    <stop offset="100%" stopColor="#E11D48" />
                  </linearGradient>

                  <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Grid Lines & Price Ticks */}
                {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                  const y = padding.top + innerHeight * ratio;
                  const priceVal = maxPrice - priceRange * ratio;
                  return (
                    <g key={i}>
                      <line
                        x1={padding.left}
                        y1={y}
                        x2={padding.left + innerWidth}
                        y2={y}
                        stroke="rgba(255, 255, 255, 0.06)"
                        strokeDasharray="4 4"
                      />
                      <text
                        x={padding.left + innerWidth + 8}
                        y={y + 4}
                        fill="#64748b"
                        fontSize="10"
                        fontFamily="monospace"
                      >
                        {priceVal.toFixed(decimals)}
                      </text>
                    </g>
                  );
                })}

                {/* SMC Order Blocks Overlays */}
                {showSmc && graphData?.smcOverlays?.orderBlocks?.map((ob, idx) => {
                  const y1 = getY(ob.high);
                  const y2 = getY(ob.low);
                  const h = Math.max(4, Math.abs(y2 - y1));
                  const isBull = ob.type.includes('Bullish');
                  return (
                    <g key={idx}>
                      <rect
                        x={padding.left}
                        y={Math.min(y1, y2)}
                        width={innerWidth}
                        height={h}
                        fill={isBull ? 'rgba(16, 185, 129, 0.08)' : 'rgba(244, 63, 94, 0.08)'}
                        stroke={isBull ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.3)'}
                        strokeDasharray="3 3"
                      />
                      <text
                        x={padding.left + 10}
                        y={Math.min(y1, y2) + 12}
                        fill={isBull ? '#34d399' : '#fb7185'}
                        fontSize="9"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        {ob.label}
                      </text>
                    </g>
                  );
                })}

                {/* Baseline Volume Histogram */}
                {showVolume && validCandles.map((c, idx) => {
                  const x = getX(idx) - candleWidth / 2;
                  const volHeight = ((c.volume || 100) / maxVolume) * 45;
                  const y = padding.top + innerHeight - volHeight;
                  const isBullish = c.close >= c.open;
                  return (
                    <rect
                      key={`vol-${idx}`}
                      x={x}
                      y={y}
                      width={candleWidth}
                      height={volHeight}
                      fill={isBullish ? 'rgba(16, 185, 129, 0.25)' : 'rgba(244, 63, 94, 0.25)'}
                    />
                  );
                })}

                {/* View Mode 1: Area Glowing Curve */}
                {chartMode === 'area' && (
                  <>
                    <path d={areaFillPath} fill="url(#areaGradient)" />
                    <path
                      d={areaPath}
                      fill="none"
                      stroke="#FF6B00"
                      strokeWidth="2.5"
                      filter="url(#glowEffect)"
                    />
                  </>
                )}

                {/* View Mode 2: Institutional Candlesticks */}
                {chartMode === 'candles' && validCandles.map((c, idx) => {
                  const x = getX(idx);
                  const isBullish = c.close >= c.open;
                  const openY = getY(c.open);
                  const closeY = getY(c.close);
                  const highY = getY(c.high);
                  const lowY = getY(c.low);
                  const bodyTop = Math.min(openY, closeY);
                  const bodyHeight = Math.max(2, Math.abs(closeY - openY));

                  return (
                    <g key={`candle-${idx}`} className="transition-all">
                      {/* Candle Wick (High to Low) */}
                      <line
                        x1={x}
                        y1={highY}
                        x2={x}
                        y2={lowY}
                        stroke={isBullish ? '#10B981' : '#F43F5E'}
                        strokeWidth="1.5"
                      />
                      {/* Candle Body */}
                      <rect
                        x={x - candleWidth / 2}
                        y={bodyTop}
                        width={candleWidth}
                        height={bodyHeight}
                        rx="1"
                        fill={isBullish ? 'url(#bullishCandle)' : 'url(#bearishCandle)'}
                        stroke={isBullish ? '#10B981' : '#F43F5E'}
                        strokeWidth="0.5"
                      />
                    </g>
                  );
                })}

                {/* EMA 20 Overlay Line */}
                {showEma && emaPath && (
                  <path
                    d={emaPath}
                    fill="none"
                    stroke="#06B6D4"
                    strokeWidth="1.8"
                    strokeDasharray="2 2"
                  />
                )}

                {/* Live Current Price Horizontal Beacon Line */}
                {validCandles.length > 0 && (
                  <g>
                    <line
                      x1={padding.left}
                      y1={getY(currentPrice)}
                      x2={padding.left + innerWidth}
                      y2={getY(currentPrice)}
                      stroke="#FF6B00"
                      strokeWidth="1.2"
                      strokeDasharray="3 3"
                    />
                    {/* Pulsing Beacon Dot on Live Price */}
                    <circle
                      cx={getX(validCandles.length - 1)}
                      cy={getY(currentPrice)}
                      r="4"
                      fill="#FF6B00"
                      className="animate-ping"
                    />
                    <circle
                      cx={getX(validCandles.length - 1)}
                      cy={getY(currentPrice)}
                      r="4"
                      fill="#FF9D42"
                    />
                    {/* Price Marker Tag in Margin */}
                    <rect
                      x={padding.left + innerWidth + 2}
                      y={getY(currentPrice) - 10}
                      width="58"
                      height="20"
                      rx="4"
                      fill="#FF6B00"
                    />
                    <text
                      x={padding.left + innerWidth + 30}
                      y={getY(currentPrice) + 4}
                      fill="#050505"
                      fontSize="10"
                      fontWeight="bold"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      {Number(currentPrice).toFixed(decimals)}
                    </text>
                  </g>
                )}

                {/* Interactive Crosshair */}
                {crosshair && (
                  <g pointerEvents="none">
                    <line
                      x1={crosshair.x}
                      y1={padding.top}
                      x2={crosshair.x}
                      y2={padding.top + innerHeight}
                      stroke="rgba(255, 255, 255, 0.4)"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                    />
                    <line
                      x1={padding.left}
                      y1={crosshair.y}
                      x2={padding.left + innerWidth}
                      y2={crosshair.y}
                      stroke="rgba(255, 255, 255, 0.4)"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                    />
                  </g>
                )}
              </svg>
            </div>
          </div>

          {/* Bottom Telemetry & Order Depth Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 border-t border-white/10 bg-[#0d111a]/70 divide-y md:divide-y-0 md:divide-x divide-white/10 font-mono text-xs">
            {/* Live Order Book & Spread */}
            <div className="md:col-span-4 p-5 space-y-3">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="uppercase tracking-wider">Live Order Book Depth</span>
                <span className="text-cyan-400 font-bold">Spread: {orderBook?.spreadPips || 1.5} pips</span>
              </div>

              {/* Buy vs Sell Pressure Bar */}
              <div>
                <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                  <span className="text-emerald-400">BUY {orderBook?.buyPressure || 54}%</span>
                  <span className="text-rose-400">SELL {orderBook?.sellPressure || 46}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-300"
                    style={{ width: `${orderBook?.buyPressure || 54}%` }}
                  />
                  <div
                    className="h-full bg-rose-500 transition-all duration-300"
                    style={{ width: `${orderBook?.sellPressure || 46}%` }}
                  />
                </div>
              </div>

              {/* Top Bids vs Asks mini-table */}
              <div className="grid grid-cols-2 gap-2 text-[10px] pt-1">
                <div>
                  <span className="text-slate-500 block mb-1">BEST BIDS (BUY)</span>
                  {orderBook?.bids?.slice(0, 3).map((b, i) => (
                    <div key={i} className="flex justify-between text-emerald-400 font-mono">
                      <span>{b.price.toFixed(decimals)}</span>
                      <span className="text-slate-500">{b.volume} lots</span>
                    </div>
                  ))}
                </div>
                <div>
                  <span className="text-slate-500 block mb-1">BEST ASKS (SELL)</span>
                  {orderBook?.asks?.slice(0, 3).map((a, i) => (
                    <div key={i} className="flex justify-between text-rose-400 font-mono">
                      <span>{a.price.toFixed(decimals)}</span>
                      <span className="text-slate-500">{a.volume} lots</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 24-Hour Statistics & Volume */}
            <div className="md:col-span-4 p-5 space-y-2.5">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                24H Session Telemetry
              </span>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <div className="text-[10px] text-slate-500">24H HIGH</div>
                  <div className="text-sm font-bold text-slate-200">
                    {graphData?.high24h ? graphData.high24h.toFixed(decimals) : '2,736.50'}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500">24H LOW</div>
                  <div className="text-sm font-bold text-slate-200">
                    {graphData?.low24h ? graphData.low24h.toFixed(decimals) : '2,708.20'}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500">24H VOLUME</div>
                  <div className="text-sm font-bold text-[#FF9D42]">
                    {graphData?.volume24h || '428,500 oz'}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500">WIN RATE / PROFIT FACTOR</div>
                  <div className="text-sm font-bold text-emerald-400">
                    {graphData?.winRate || '89.4%'} // {graphData?.profitFactor || '2.84'}
                  </div>
                </div>
              </div>
            </div>

            {/* Strategy Deployment CTA */}
            <div className="md:col-span-4 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#FF9D42] mb-1">
                  <Zap className="w-4 h-4 text-[#FF6B00]" />
                  <span>ALGORITHMIC EXECUTION ACTIVE</span>
                </div>
                <p className="text-slate-400 text-xs font-light leading-relaxed">
                  Automate execution on {selectedSymbol} with proprietary risk brakes, sub-12ms execution, and non-custodial capital custody.
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => navigate('/algorithmic-trading-solutions')}
                  className="w-full btn-orange-glow py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Deploy Model on {selectedSymbol}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
