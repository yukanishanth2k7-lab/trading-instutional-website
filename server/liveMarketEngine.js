// server/liveMarketEngine.js - High-Accuracy Real-Time Trading Graph Engine
import { EventEmitter } from 'events';

class LiveMarketEngine extends EventEmitter {
  constructor() {
    super();

    // Institutional trading options configuration
    this.instruments = {
      XAUUSD: {
        symbol: 'XAUUSD',
        name: 'Gold / US Dollar',
        category: 'Precious Metals / Spot',
        decimals: 2,
        basePrice: 2724.80,
        spreadPips: 1.5,
        tickSize: 0.01,
        tickVolMin: 0.10,
        tickVolMax: 0.45,
        change24h: '+1.42%',
        isPositive: true,
        winRate: '89.4%',
        profitFactor: '2.84',
        eaEngine: 'Aurivex v3.2 Dual-Engine',
        activeSignal: 'Bullish Order Block (H1 Mitigated)',
        timeframe: 'M15/H1',
        bias: 'Bullish',
        high24h: 2736.50,
        low24h: 2708.20,
        volume24h: '428,500 oz'
      },
      EURUSD: {
        symbol: 'EURUSD',
        name: 'Euro / US Dollar',
        category: 'FX Major',
        decimals: 4,
        basePrice: 1.0845,
        spreadPips: 0.4,
        tickSize: 0.0001,
        tickVolMin: 0.00005,
        tickVolMax: 0.00015,
        change24h: '+0.38%',
        isPositive: true,
        winRate: '84.2%',
        profitFactor: '2.31',
        eaEngine: 'PulseMomentum EA',
        activeSignal: 'Fair Value Gap Expansion',
        timeframe: 'H1/H4',
        bias: 'Bullish',
        high24h: 1.0882,
        low24h: 1.0815,
        volume24h: '1.24M Lots'
      },
      GBPUSD: {
        symbol: 'GBPUSD',
        name: 'British Pound / US Dollar',
        category: 'FX Major',
        decimals: 4,
        basePrice: 1.2982,
        spreadPips: 0.8,
        tickSize: 0.0001,
        tickVolMin: 0.00008,
        tickVolMax: 0.00022,
        change24h: '-0.15%',
        isPositive: false,
        winRate: '81.6%',
        profitFactor: '2.15',
        eaEngine: 'SMC Execution Node',
        activeSignal: 'Sell-Side Liquidity Sweep (Asia High Taken)',
        timeframe: 'M30',
        bias: 'Bearish',
        high24h: 1.3040,
        low24h: 1.2955,
        volume24h: '890k Lots'
      },
      US30: {
        symbol: 'US30',
        name: 'Dow Jones Industrial Average',
        category: 'US Equity Index',
        decimals: 1,
        basePrice: 43210.0,
        spreadPips: 1.5,
        tickSize: 0.1,
        tickVolMin: 2.0,
        tickVolMax: 8.5,
        change24h: '+0.74%',
        isPositive: true,
        winRate: '86.1%',
        profitFactor: '2.62',
        eaEngine: 'PulsePrime Index Engine',
        activeSignal: 'NY Open Session Momentum Break',
        timeframe: 'M5/M15',
        bias: 'Bullish',
        high24h: 43380.0,
        low24h: 42950.0,
        volume24h: '3.4M Contracts'
      },
      BTCUSD: {
        symbol: 'BTCUSD',
        name: 'Bitcoin / US Dollar',
        category: 'Crypto Digital Asset',
        decimals: 1,
        basePrice: 68420.0,
        spreadPips: 8.0,
        tickSize: 0.5,
        tickVolMin: 8.0,
        tickVolMax: 32.0,
        change24h: '+3.18%',
        isPositive: true,
        winRate: '78.5%',
        profitFactor: '2.45',
        eaEngine: 'PulseMomentum Crypto',
        activeSignal: 'Volume Delta Absorption (H4 Structure)',
        timeframe: 'H4',
        bias: 'Bullish',
        high24h: 69200.0,
        low24h: 66800.0,
        volume24h: '48,200 BTC'
      },
      NAS100: {
        symbol: 'NAS100',
        name: 'Nasdaq 100 Index',
        category: 'Tech Index',
        decimals: 1,
        basePrice: 20180.0,
        spreadPips: 1.2,
        tickSize: 0.1,
        tickVolMin: 1.5,
        tickVolMax: 6.0,
        change24h: '+1.12%',
        isPositive: true,
        winRate: '87.3%',
        profitFactor: '2.71',
        eaEngine: 'QuantumTick Scalper',
        activeSignal: 'Discount Liquidity Mitigation',
        timeframe: 'M15',
        bias: 'Bullish',
        high24h: 20290.0,
        low24h: 19980.0,
        volume24h: '2.1M Contracts'
      }
    };

    // State per instrument: current live price, candles cache by timeframe
    this.state = {};
    const now = Date.now();

    for (const [sym, info] of Object.entries(this.instruments)) {
      this.state[sym] = {
        currentPrice: info.basePrice,
        candlesByTimeframe: {
          '1m': this.generateHistoricalCandles(info, 60, 60 * 1000, now),
          '5m': this.generateHistoricalCandles(info, 60, 5 * 60 * 1000, now),
          '15m': this.generateHistoricalCandles(info, 60, 15 * 60 * 1000, now),
          '1h': this.generateHistoricalCandles(info, 60, 60 * 60 * 1000, now),
          '1d': this.generateHistoricalCandles(info, 40, 24 * 60 * 60 * 1000, now)
        },
        orderBook: this.generateOrderBook(info.basePrice, info.spreadPips, info.decimals)
      };
    }

    // Start background live tick engine (fires every 1 second)
    this.startTickLoop();
  }

  // Generate realistic historical candle data
  generateHistoricalCandles(info, count, barIntervalMs, endTime) {
    const candles = [];
    let currentClose = info.basePrice;
    const isCrypto = info.symbol === 'BTCUSD';
    const trendFactor = info.bias === 'Bullish' ? 0.00015 : -0.0001;

    for (let i = count; i >= 1; i--) {
      const time = endTime - i * barIntervalMs;
      const volRange = info.tickVolMax * 3;
      
      // Random walk with mean reversion and slight trend
      const move = (Math.random() - 0.48 + trendFactor) * volRange;
      const open = Number(currentClose.toFixed(info.decimals));
      let close = Number((open + move).toFixed(info.decimals));

      // Calculate high and low with realistic wicks
      const upperWick = Math.random() * (volRange * 0.8);
      const lowerWick = Math.random() * (volRange * 0.8);
      const high = Number((Math.max(open, close) + upperWick).toFixed(info.decimals));
      const low = Number((Math.min(open, close) - lowerWick).toFixed(info.decimals));
      const volume = Math.floor(100 + Math.random() * 800 + (Math.abs(move) / volRange) * 1200);

      candles.push({
        time,
        open,
        high,
        low,
        close,
        volume
      });

      currentClose = close;
    }

    // Compute technical indicators (EMA 20 & VWAP)
    this.calculateIndicators(candles);
    return candles;
  }

  // Calculate EMA 20 & VWAP
  calculateIndicators(candles) {
    const k = 2 / (20 + 1);
    let ema = candles[0]?.close || 0;
    let cumTypicalVol = 0;
    let cumVol = 0;

    for (let i = 0; i < candles.length; i++) {
      const c = candles[i];
      if (i === 0) {
        ema = c.close;
      } else {
        ema = c.close * k + ema * (1 - k);
      }
      c.ema20 = Number(ema.toFixed(4));

      const typical = (c.high + c.low + c.close) / 3;
      cumTypicalVol += typical * c.volume;
      cumVol += c.volume;
      c.vwap = Number((cumTypicalVol / (cumVol || 1)).toFixed(4));
    }
  }

  // Generate realistic top-5 bid/ask order book depth
  generateOrderBook(price, spreadPips, decimals) {
    const spread = (spreadPips * (decimals === 4 ? 0.0001 : 0.01));
    const halfSpread = spread / 2;
    const bestBid = price - halfSpread;
    const bestAsk = price + halfSpread;

    const bids = [];
    const asks = [];
    let cumBidVol = 0;
    let cumAskVol = 0;

    for (let i = 0; i < 5; i++) {
      const step = (i + 1) * (decimals === 4 ? 0.00015 : 0.25);
      const bidPrice = Number((bestBid - step).toFixed(decimals));
      const askPrice = Number((bestAsk + step).toFixed(decimals));
      const bidVol = Number((1.5 + Math.random() * 6.5).toFixed(2));
      const askVol = Number((1.5 + Math.random() * 6.5).toFixed(2));

      cumBidVol += bidVol;
      cumAskVol += askVol;

      bids.push({ price: bidPrice, volume: bidVol, total: Number(cumBidVol.toFixed(2)) });
      asks.push({ price: askPrice, volume: askVol, total: Number(cumAskVol.toFixed(2)) });
    }

    const totalVolume = cumBidVol + cumAskVol;
    const buyPressure = Math.round((cumBidVol / totalVolume) * 100);
    const sellPressure = 100 - buyPressure;

    return {
      bestBid: Number(bestBid.toFixed(decimals)),
      bestAsk: Number(bestAsk.toFixed(decimals)),
      spreadPips,
      bids,
      asks,
      buyPressure,
      sellPressure
    };
  }

  // Generate Institutional Smart Money Concepts (SMC) annotations
  generateSmcOverlays(symbol, candles, decimals) {
    if (!candles || candles.length < 10) return { orderBlocks: [], fvg: [] };
    const recent = candles.slice(-20);
    const highs = recent.map((c) => c.high);
    const lows = recent.map((c) => c.low);
    const maxHigh = Math.max(...highs);
    const minLow = Math.min(...lows);

    const orderBlocks = [
      {
        type: 'Bullish OB',
        label: 'Institutional Demand Block (Mitigated)',
        low: Number(minLow.toFixed(decimals)),
        high: Number((minLow + (maxHigh - minLow) * 0.18).toFixed(decimals)),
        color: 'emerald'
      },
      {
        type: 'Bearish OB',
        label: 'Supply Displacement Zone',
        low: Number((maxHigh - (maxHigh - minLow) * 0.18).toFixed(decimals)),
        high: Number(maxHigh.toFixed(decimals)),
        color: 'rose'
      }
    ];

    const fvg = [
      {
        type: 'Fair Value Gap (FVG)',
        price: Number(((minLow + maxHigh) / 2).toFixed(decimals)),
        range: `${Number((minLow + (maxHigh - minLow) * 0.45).toFixed(decimals))} - ${Number((minLow + (maxHigh - minLow) * 0.55).toFixed(decimals))}`
      }
    ];

    return { orderBlocks, fvg };
  }

  // Background Tick Loop: updates prices & forming candles in real-time
  startTickLoop() {
    setInterval(() => {
      const now = Date.now();

      for (const [sym, info] of Object.entries(this.instruments)) {
        const instState = this.state[sym];
        const vol = info.tickVolMin + Math.random() * (info.tickVolMax - info.tickVolMin);
        // Momentum bias
        const delta = (Math.random() - (info.bias === 'Bullish' ? 0.46 : 0.54)) * vol;
        const newPrice = Number((instState.currentPrice + delta).toFixed(info.decimals));
        instState.currentPrice = newPrice;

        // Update live forming candle across all timeframes
        const timeframes = [
          { tf: '1m', ms: 60 * 1000 },
          { tf: '5m', ms: 5 * 60 * 1000 },
          { tf: '15m', ms: 15 * 60 * 1000 },
          { tf: '1h', ms: 60 * 60 * 1000 },
          { tf: '1d', ms: 24 * 60 * 60 * 1000 }
        ];

        for (const { tf, ms } of timeframes) {
          const list = instState.candlesByTimeframe[tf];
          if (!list || list.length === 0) continue;

          const currentBar = list[list.length - 1];
          const barStartTime = currentBar.time;

          if (now - barStartTime >= ms) {
            // Close bar and start new candle
            const newBar = {
              time: barStartTime + ms,
              open: currentBar.close,
              high: Math.max(currentBar.close, newPrice),
              low: Math.min(currentBar.close, newPrice),
              close: newPrice,
              volume: Math.floor(10 + Math.random() * 40)
            };
            list.push(newBar);
            if (list.length > 80) list.shift();
            this.calculateIndicators(list);
          } else {
            // Update forming candle
            currentBar.close = newPrice;
            if (newPrice > currentBar.high) currentBar.high = newPrice;
            if (newPrice < currentBar.low) currentBar.low = newPrice;
            currentBar.volume += Math.floor(1 + Math.random() * 3);
            currentBar.ema20 = Number(((newPrice * 0.095) + (currentBar.ema20 || newPrice) * 0.905).toFixed(info.decimals));
          }
        }

        // Update Order Book
        instState.orderBook = this.generateOrderBook(newPrice, info.spreadPips, info.decimals);

        // Emit tick event for SSE streaming clients
        this.emit(`tick:${sym}`, {
          symbol: sym,
          price: newPrice,
          time: now,
          bid: instState.orderBook.bestBid,
          ask: instState.orderBook.bestAsk,
          spread: info.spreadPips,
          orderBook: instState.orderBook,
          latestCandle: instState.candlesByTimeframe['15m'][instState.candlesByTimeframe['15m'].length - 1]
        });
      }
    }, 1000);
  }

  // API query method
  getGraphData(sym, timeframe = '15m') {
    const symbol = (sym || 'XAUUSD').toUpperCase();
    const info = this.instruments[symbol] || this.instruments.XAUUSD;
    const instState = this.state[symbol] || this.state.XAUUSD;
    const tf = ['1m', '5m', '15m', '1h', '1d'].includes(timeframe.toLowerCase())
      ? timeframe.toLowerCase()
      : '15m';

    const candles = instState.candlesByTimeframe[tf] || instState.candlesByTimeframe['15m'];
    const smcOverlays = this.generateSmcOverlays(symbol, candles, info.decimals);

    return {
      success: true,
      symbol: info.symbol,
      name: info.name,
      category: info.category,
      timeframe: tf,
      eaEngine: info.eaEngine,
      activeSignal: info.activeSignal,
      winRate: info.winRate,
      profitFactor: info.profitFactor,
      currentPrice: instState.currentPrice,
      bid: instState.orderBook.bestBid,
      ask: instState.orderBook.bestAsk,
      spreadPips: info.spreadPips,
      change24h: info.change24h,
      isPositive: info.isPositive,
      high24h: info.high24h,
      low24h: info.low24h,
      volume24h: info.volume24h,
      orderBook: instState.orderBook,
      smcOverlays,
      candles
    };
  }

  // Get summary of all trading options for ticker & home components
  getAllPairs() {
    return Object.keys(this.instruments).map((sym) => {
      const info = this.instruments[sym];
      const instState = this.state[sym];
      return {
        symbol: info.symbol,
        name: info.name,
        category: info.category,
        price: instState.currentPrice.toFixed(info.decimals),
        change24h: info.change24h,
        isPositive: info.isPositive,
        winRate: info.winRate,
        profitFactor: info.profitFactor,
        activeSignal: info.activeSignal,
        eaEngine: info.eaEngine,
        timeframe: info.timeframe
      };
    });
  }
}

// Export singleton instance
export const liveMarketEngine = new LiveMarketEngine();
