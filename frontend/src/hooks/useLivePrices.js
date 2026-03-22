import { useEffect, useState } from "react";

export default function useLivePrices(symbols = []) {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    if (!symbols.length) return;

    const streams = symbols.map((s) => s.toLowerCase() + "@ticker").join("/");

    const ws = new WebSocket(
      `wss://stream.binance.com:9443/stream?streams=${streams}`,
    );

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const symbol = message.data.s;
      const price = Number(message.data.c);

      setPrices((prev) => ({
        ...prev,
        [symbol]: price,
      }));
    };

    return () => ws.close();
  }, [symbols]);

  return prices;
}
