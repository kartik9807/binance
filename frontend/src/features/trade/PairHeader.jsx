import { useMarketTicker } from "../../hooks/useMarketTicker";

export default function PairHeader({ symbol }) {
  const { data } = useMarketTicker(symbol);

  if (!data) return null;

  const coin = symbol.replace("USDT", "").toLowerCase();

  const iconSources = [
    `https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@master/svg/color/${coin}.svg`,
    `https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@master/svg/white/${coin}.svg`,
    `https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/16/${coin}.png`,
  ];

  const handleError = (e) => {
    const currentSrc = e.target.src;
    const index = iconSources.findIndex((src) => currentSrc.includes(src));

    if (index !== -1 && index < iconSources.length - 1) {
      e.target.src = iconSources[index + 1];
    } else {
      e.target.src =
        "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@master/svg/color/generic.svg";
    }
  };

  return (
    <div style={container}>
      <div style={pairSection}>
        <img
          src={iconSources[0]}
          alt={coin}
          className="h-4 w-4"
          onError={handleError}
        />

        <h2>{symbol}</h2>

        <span>${Number(data.lastPrice).toFixed(2)}</span>

        <span
          style={{
            color: data.priceChangePercent > 0 ? "#16c784" : "#ea3943",
          }}
        >
          {Number(data.priceChangePercent).toFixed(2)}%
        </span>
      </div>

      <div style={stats}>
        <Stat label="24h High" value={Number(data.highPrice).toFixed(2)} />
        <Stat label="24h Low" value={Number(data.lowPrice).toFixed(2)} />
        <Stat label="Volume" value={Number(data.volume).toFixed(0)} />
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div style={{ opacity: 0.6 }}>{label}</div>
      <div>{value}</div>
    </div>
  );
}

const container = {
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 20px",
  borderBottom: "1px solid #1e1e1e",
};

const pairSection = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const stats = {
  display: "flex",
  gap: "30px",
};
