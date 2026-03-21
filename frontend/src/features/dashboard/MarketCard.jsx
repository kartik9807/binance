import { Link } from "react-router-dom";

export default function MarketCard({ title, coins }) {
  return (
    <div style={card}>
      <h3>{title}</h3>

      <div style={header}>
        <span>Name</span>
        <span>Price</span>
        <span>24h Change</span>
      </div>

      <div style={list}>
        {coins.map((coin, i) => {
          const change = Number(coin.priceChangePercent).toFixed(2);

          const coinSymbol = coin.symbol
            .replace("USDT", "")
            .replace("BTC", "")
            .replace("ETH", "")
            .replace("BNB", "")
            .toLowerCase();

          return (
            <Link key={coin.symbol} to={`/trade/${coin.symbol}`} style={link}>
              <div style={row}>
                <div style={nameSection}>
                  <img
                    src={`https://cryptoicons.org/api/icon/${coinSymbol}/24`}
                    alt={coinSymbol}
                    style={icon}
                  />

                  <span>
                    {i + 1} {coin.symbol}
                  </span>
                </div>

                <span>${Number(coin.lastPrice).toFixed(4)}</span>

                <span
                  style={{
                    color: change > 0 ? "#16c784" : "#ea3943",
                  }}
                >
                  {change}%
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

const card = {
  background: "#0f1116",
  padding: "20px",
  borderRadius: "14px",
  width: "350px",
  color: "white",
};

const header = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  opacity: 0.6,
  marginBottom: "10px",
};

const list = {};

const row = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  padding: "10px",
  cursor: "pointer",
  borderBottom: "1px solid #1e1e1e",
};

const nameSection = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const icon = {
  width: "20px",
  height: "20px",
};

const link = {
  textDecoration: "none",
  color: "inherit",
};
