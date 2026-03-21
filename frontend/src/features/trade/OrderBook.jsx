import { useQuery } from "@tanstack/react-query";

const fetchDepth = async (symbol) => {
  const res = await fetch(
    `https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=20`,
  );

  return res.json();
};

export default function OrderBook({ symbol }) {
  const { data } = useQuery({
    queryKey: ["orderbook", symbol],
    queryFn: () => fetchDepth(symbol),
    refetchInterval: 1000,
  });

  if (!data) return null;

  return (
    <div style={container}>
      <h3>Order Book</h3>

      {data.asks.slice(0, 10).map((a, i) => (
        <div key={i} style={row}>
          <span style={{ color: "#ea3943" }}>{a[0]}</span>
          <span>{a[1]}</span>
        </div>
      ))}

      {data.bids.slice(0, 10).map((b, i) => (
        <div key={i} style={row}>
          <span style={{ color: "#16c784" }}>{b[0]}</span>
          <span>{b[1]}</span>
        </div>
      ))}
    </div>
  );
}

const container = {
  padding: "20px",
  borderRight: "1px solid #1e1e1e",
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "13px",
};
