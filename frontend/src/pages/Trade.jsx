import { useParams } from "react-router-dom";
import OrderBook from "../features/trade/OrderBook";
import Chart from "../features/trade/Chart";
import MarketSidebar from "../features/trade/MarketSidebar";
import PairHeader from "../features/trade/PairHeader";
import MarketTrades from "../features/trade/MarketTrades";

export default function Trade() {
  const { symbol } = useParams();

  return (
    <div style={page}>
      <PairHeader symbol={symbol} />

      <div style={layout}>
        <OrderBook symbol={symbol} />

        <Chart symbol={symbol} />

        <div style={rightPanel}>
          <MarketSidebar />
          <MarketTrades symbol={symbol} />
        </div>
      </div>
    </div>
  );
}

const page = {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  background: "#0f1116",
  color: "white",
};

const layout = {
  display: "grid",
  gridTemplateColumns: "300px 1fr 320px",
  flex: 1,
};

const rightPanel = {
  display: "flex",
  flexDirection: "column",
  borderLeft: "1px solid #1e1e1e",
};
