import { Link } from "react-router-dom";
import { useWatchlist } from "../../context/WatchlistContext";

export default function MarketCard({ title, coins }) {
  const { watchlist, toggleWatchlist } = useWatchlist();

  return (
    <div className="bg-[#0f1116] p-5 rounded-[14px]  text-white">
      <h3 className="mb-3 font-semibold">{title}</h3>

      {/* Header */}
      <div className="grid grid-cols-[2fr_1fr_1fr] opacity-60 mb-2 text-sm">
        <span>Name</span>
        <span>Price</span>
        <span>24h Change</span>
      </div>

      {/* Coins */}
      <div>
        {coins.map((coin, i) => {
          const change = Number(coin.priceChangePercent).toFixed(2);

          const coinSymbol = coin.symbol
            .replace("USDT", "")
            .replace("BTC", "")
            .replace("ETH", "")
            .replace("BNB", "")
            .toLowerCase();

          const isSaved = watchlist.includes(coin.symbol);

          return (
            <Link
              key={coin.symbol}
              to={`/trade/${coin.symbol}`}
              className="no-underline text-inherit"
            >
              <div className="grid grid-cols-[2fr_1fr_1fr] items-center p-2.5 cursor-pointer border-b border-[#1e1e1e] hover:bg-[#151821] transition">
                {/* Name Section */}
                <div className="flex items-center gap-3">
                  {/* Rank */}
                  <span className="w-5 text-gray-400">{i + 1}</span>

                  {/* Watchlist Star */}
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWatchlist(coin.symbol);
                    }}
                    className="cursor-pointer"
                  >
                    {isSaved ? "⭐" : "☆"}
                  </span>

                  {/* Coin Icon */}
                  <img
                    src={`https://cryptoicons.org/api/icon/${coinSymbol}/24`}
                    alt={coinSymbol}
                    className="w-5 h-5"
                  />

                  {/* Coin Name */}
                  <span className="font-medium">{coin.symbol}</span>
                </div>

                {/* Price */}
                <span className="tabular-nums">
                  ${Number(coin.lastPrice).toFixed(4)}
                </span>

                {/* 24h Change */}
                <span
                  className={
                    change > 0
                      ? "text-[#16c784] tabular-nums"
                      : "text-[#ea3943] tabular-nums"
                  }
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
