import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function WinRateChart({ winningTrades, losingTrades }) {
  const data = [
    { name: "Winning Trades", value: winningTrades },
    { name: "Losing Trades", value: losingTrades },
  ];

  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <h3 className="text-lg mb-4">Win / Loss Comparison</h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />

          <XAxis type="number" stroke="#aaa" />
          <YAxis type="category" dataKey="name" stroke="#aaa" />

          <Tooltip />

          <Bar dataKey="value" fill="#16c784" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
