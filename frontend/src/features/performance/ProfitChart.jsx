import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function ProfitChart({ trades }) {
  const data = useMemo(() => {
    return trades.reduce((acc, trade, index) => {
      const previous = acc[index - 1]?.pnl || 0;

      acc.push({
        date: new Date(trade.createdAt).toLocaleTimeString(),
        pnl: previous + trade.profit,
      });

      return acc;
    }, []);
  }, [trades]);

  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <h3 className="text-lg mb-4">Profit Over Time</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />

          <XAxis dataKey="date" stroke="#aaa" />
          <YAxis stroke="#aaa" />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="pnl"
            stroke="#16c784"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
