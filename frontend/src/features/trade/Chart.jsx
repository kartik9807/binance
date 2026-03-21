import { useEffect, useRef } from "react";
import { createChart, CandlestickSeries } from "lightweight-charts";
import { useQuery } from "@tanstack/react-query";

const fetchCandles = async (symbol) => {
  const res = await fetch(
    `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1m&limit=200`,
  );

  return res.json();
};

export default function Chart({ symbol }) {
  const chartRef = useRef();
  const seriesRef = useRef();

  const { data } = useQuery({
    queryKey: ["candles", symbol],
    queryFn: () => fetchCandles(symbol),
    refetchInterval: 1000,
  });

  useEffect(() => {
    const chart = createChart(chartRef.current, {
      height: 500,
      layout: { background: { color: "#0f1116" }, textColor: "#d1d4dc" },
    });

    const candleSeries = chart.addSeries(CandlestickSeries);

    seriesRef.current = candleSeries;

    return () => chart.remove();
  }, []);

  useEffect(() => {
    if (!data || !seriesRef.current) return;

    const candles = data.map((c) => ({
      time: c[0] / 1000,
      open: parseFloat(c[1]),
      high: parseFloat(c[2]),
      low: parseFloat(c[3]),
      close: parseFloat(c[4]),
    }));

    seriesRef.current.setData(candles);
  }, [data]);

  return <div ref={chartRef} style={{ width: "100%", height: "500px" }} />;
}
