import React, { useState, useEffect, useRef } from 'react';
import { Activity, TrendingUp, TrendingDown } from 'lucide-react';

const INITIAL_PAIRS = [
  { symbol: 'XAUUSD', name: 'Gold Spot', price: 2748.35, prevPrice: 2748.35, change24h: 1.42, decimals: 2, unit: '$', spread: '0.12' },
  { symbol: 'EURUSD', name: 'Euro / USD', price: 1.08452, prevPrice: 1.08452, change24h: 0.38, decimals: 5, unit: '', spread: '0.6' },
  { symbol: 'GBPUSD', name: 'GBP / USD', price: 1.29814, prevPrice: 1.29814, change24h: -0.22, decimals: 5, unit: '', spread: '0.8' },
  { symbol: 'US30', name: 'Dow Jones', price: 42890.50, prevPrice: 42890.50, change24h: 0.65, decimals: 1, unit: '', spread: '1.5' },
  { symbol: 'BTCUSD', name: 'Bitcoin', price: 84320.00, prevPrice: 84320.00, change24h: 3.15, decimals: 2, unit: '$', spread: '0.50' },
];

export default function MarketTicker() {
  const [pairs, setPairs] = useState(INITIAL_PAIRS);
  const [flashStates, setFlashStates] = useState({});
  const [tickCount, setTickCount] = useState(214);
  const [latency, setLatency] = useState(8);
  const [isLiveWs, setIsLiveWs] = useState(false);
  const pairsRef = useRef(INITIAL_PAIRS);

  useEffect(() => {
    let ws = null;
    try {
      ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker/paxgusdt@ticker');
      ws.onopen = () => setIsLiveWs(true);
      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          const livePrice = parseFloat(msg.c);
          const priceChange = parseFloat(msg.P);
          const sym = msg.s === 'PAXGUSDT' ? 'XAUUSD' : (msg.s === 'BTCUSDT' ? 'BTCUSD' : null);
          if (sym && !isNaN(livePrice)) {
            triggerTick(sym, livePrice, priceChange);
          }
        } catch (e) {}
      };
      ws.onerror = () => setIsLiveWs(false);
      ws.onclose = () => setIsLiveWs(false);
    } catch (e) {
      setIsLiveWs(false);
    }

    const interval = setInterval(() => {
      const randomIndices = [
        Math.floor(Math.random() * pairsRef.current.length),
        Math.floor(Math.random() * pairsRef.current.length)
      ];

      randomIndices.forEach(idx => {
        const pair = pairsRef.current[idx];
        if (!pair) return;

        let delta = 0;
        if (pair.symbol === 'XAUUSD') {
          delta = (Math.random() - 0.49) * 0.45;
        } else if (pair.symbol === 'BTCUSD') {
          delta = (Math.random() - 0.48) * 14.5;
        } else if (pair.symbol === 'US30') {
          delta = (Math.random() - 0.49) * 4.2;
        } else {
          delta = (Math.random() - 0.49) * 0.00018;
        }

        const newPrice = Math.max(0.00001, pair.price + delta);
        const newChange = pair.change24h + (delta > 0 ? 0.01 : -0.01);
        triggerTick(pair.symbol, newPrice, newChange);
      });

      setLatency(Math.floor(6 + Math.random() * 6));
    }, 650);

    return () => {
      if (ws) ws.close();
      clearInterval(interval);
    };
  }, []);

  const triggerTick = (symbol, newPrice, newChange) => {
    setPairs(prev => {
      const updated = prev.map(p => {
        if (p.symbol === symbol) {
          const dir = newPrice > p.price ? 'up' : (newPrice < p.price ? 'down' : null);
          if (dir) {
            setFlashStates(f => ({ ...f, [symbol]: dir }));
            setTimeout(() => {
              setFlashStates(f => ({ ...f, [symbol]: null }));
            }, 450);
          }
          return {
            ...p,
            prevPrice: p.price,
            price: newPrice,
            change24h: newChange !== undefined ? newChange : p.change24h
          };
        }
        return p;
      });
      pairsRef.current = updated;
      return updated;
    });

    setTickCount(c => c + 1);
  };

  const formatPrice = (price, decimals, unit) => {
    if (decimals === 5) return unit + price.toFixed(5);
    return unit + price.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  };

  return (
    <div className="w-full bg-[#050505] border-y border-white/10 py-2 overflow-hidden backdrop-blur-xl relative z-30 shadow-lg shadow-black">
      <div className="flex items-center relative w-full">
        
        {/* Fixed Left Status Beacon in Original Financial Market Green */}
        <div className="flex items-center gap-3 shrink-0 pl-4 pr-6 py-1 bg-[#050505] z-20 border-r border-white/10 shadow-2xl">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] whitespace-nowrap">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-bold tracking-wider">
              {isLiveWs ? 'LIVE WS FEED' : 'REAL-TIME TICKER'}
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-slate-400 font-mono text-[11px] whitespace-nowrap">
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-semibold">{latency}ms</span>
            <span className="text-stone-700">|</span>
            <span>Ticks: <span className="text-white font-bold">{tickCount.toLocaleString()}</span></span>
          </div>
        </div>

        {/* Continuous Horizontal Scrolling Track */}
        <div className="flex overflow-hidden relative w-full">
          <div className="ticker-marquee-track flex items-center gap-4 py-1">
            {[...pairs, ...pairs].map((pair, idx) => {
              const flash = flashStates[pair.symbol];
              const isPositive = pair.change24h >= 0;

              let borderStyle = 'border-white/10 bg-[#111111]';
              let priceColor = 'text-[#F5F5F0]';
              if (flash === 'up') {
                borderStyle = 'border-emerald-500 bg-emerald-500/20 text-emerald-300 shadow-lg shadow-emerald-500/20 scale-[1.04]';
                priceColor = 'text-emerald-300';
              } else if (flash === 'down') {
                borderStyle = 'border-rose-500 bg-rose-500/20 text-rose-300 shadow-lg shadow-rose-500/20 scale-[1.04]';
                priceColor = 'text-rose-300';
              }

              return (
                <div
                  key={`${pair.symbol}-${idx}`}
                  className={`flex items-center gap-2.5 shrink-0 px-3.5 py-1.5 rounded-lg border font-mono transition-all duration-300 ${borderStyle}`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[#F5F5F0] tracking-wide">{pair.symbol}</span>
                    <span className="text-[9px] text-[#A3A3A3] uppercase">{pair.name}</span>
                  </div>

                  <span className={`font-bold transition-colors duration-200 ${priceColor}`}>
                    {formatPrice(pair.price, pair.decimals, pair.unit)}
                  </span>

                  {/* Original Financial Market Green for Up, Red for Down */}
                  <span
                    className={`flex items-center text-[10px] font-bold px-2 py-0.5 rounded border ${
                      isPositive
                        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                        : 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                    }`}
                  >
                    {isPositive ? (
                      <TrendingUp className="w-3 h-3 mr-0.5 inline text-emerald-400" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-0.5 inline text-rose-400" />
                    )}
                    {isPositive ? '+' : ''}{pair.change24h.toFixed(2)}%
                  </span>

                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                    Spr: {pair.spread}p
                  </span>
                </div>
              );
            })}
          </div>

          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#050505] to-transparent z-10" />
        </div>

      </div>
    </div>
  );
}
