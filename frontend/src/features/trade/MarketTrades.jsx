import { useQuery } from "@tanstack/react-query";

const fetchTrades = async (symbol) => {
  const res = await fetch(
    `https://api.binance.com/api/v3/trades?symbol=${symbol}&limit=40`,
  );

  return res.json();
};

export default function MarketTrades({ symbol }) {
  const { data = [] } = useQuery({
    queryKey: ["trades", symbol],
    queryFn: () => fetchTrades(symbol),
    refetchInterval: 1000,
  });

  return (
    <div style={container}>
      <h3 style={{ marginBottom: "10px" }}>Market Trades</h3>

      <div style={header}>
        <span>Price</span>
        <span>Amount</span>
        <span>Time</span>
      </div>

      <div style={list}>
        {data.map((trade, i) => {
          const time = new Date(trade.time).toLocaleTimeString();

          return (
            <div key={i} style={row}>
              <span
                style={{
                  color: trade.isBuyerMaker ? "#ea3943" : "#16c784",
                }}
              >
                {Number(trade.price).toFixed(2)}
              </span>

              <span>{Number(trade.qty).toFixed(4)}</span>

              <span>{time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const container = {
  padding: "15px",
  borderTop: "1px solid #1e1e1e",
};

const header = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  opacity: 0.6,
  marginBottom: "8px",
};

const list = {
  maxHeight: "250px",
  overflowY: "auto",
};

const row = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  padding: "5px 0",
  fontSize: "13px",
};
