import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const fetchMarkets = async () => {
  const res = await fetch("https://api.binance.com/api/v3/ticker/24hr");

  const data = await res.json();

  return data.filter((c) => c.symbol.endsWith("USDT")).slice(0, 10);
};

export default function MarketSidebar() {
  const { data = [] } = useQuery({
    queryKey: ["markets"],
    queryFn: fetchMarkets,
    refetchInterval: 1000,
  });

  return (
    <div style={container}>
      {data.map((c) => {
        const coin = c.symbol.replace("USDT", "").toLowerCase();

        return (
          <Link key={c.symbol} to={`/trade/${c.symbol}`} style={link}>
            <div style={row}>
              <div style={{ display: "flex", gap: "8px" }}>
                <img
                  src={`https://cryptoicons.org/api/icon/${coin}/24`}
                  alt={coin}
                />

                {c.symbol}
              </div>

              <span>${Number(c.lastPrice).toFixed(2)}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

const container = {
  padding: "10px",
  borderLeft: "1px solid #1e1e1e",
  overflowY: "scroll",
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 0",
};

const link = {
  textDecoration: "none",
  color: "white",
};
