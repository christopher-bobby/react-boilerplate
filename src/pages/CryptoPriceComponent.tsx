import React, { useEffect, useState } from 'react';
import { CryptoWebSocketService } from '../utils/cryptoWebSocket';

interface CryptoPrice {
  symbol: string;
  price: number;
}

const CryptoPriceComponent: React.FC = () => {
    const [cryptoPrices, setCryptoPrices] = useState<any>({});

  const termMap: { [key: string]: [string, string] } = {
    'bitcoin': ['BTC', 'Bitcoin'],
    'ethereum': ['ETH', 'Ethereum'],
    'binance-coin': ['BNB', 'Binance'],
    'cardano': ['ADA', 'Cardano'],
    'solana': ['SOL', 'Solana'],
    'xrp': ['XRP', 'Ripple'],
    'dogecoin': ['DOGE', 'Dogecoin']
  };
   const symbols: string[] = [
    'bitcoin',
    'ethereum',
    'binance-coin',
    'cardano',
    'solana',
    'xrp',
    'dogecoin',
];

 const symbolString: string = symbols.join(',');
  useEffect(() => {

    const socket = new WebSocket(`wss://ws.coincap.io/prices?assets=${symbolString}`);

    socket.onopen = () => {
      console.log('WebSocket connection opened');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setCryptoPrices((prevPrices: any) => {
        const updatedPrices: any = {};
        symbols.forEach((symbol) => {
          updatedPrices[symbol] = data[symbol] !== undefined ? data[symbol] : prevPrices[symbol];
        });
        return updatedPrices;
      });
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      socket.close();
    };
  }, []); 
  {console.log("cryptoPrices", cryptoPrices)}

  return (
    <div>
      <h1>Crypto Prices</h1>
      <div>
        {cryptoPrices['bitcoin']}
      </div>
    </div>
  );
};

export default CryptoPriceComponent;
