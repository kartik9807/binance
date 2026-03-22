import { useRef } from "react";
import { useExecuteTrade } from "../../hooks/useExecuteTrade";
import emailjs from "@emailjs/browser";

export default function TradePanel({ symbol, price }) {
  const amountRef = useRef();
  const { mutate } = useExecuteTrade();

  // get user email stored during signup
  const email = localStorage.getItem("email");

  // send email function
  const sendTradeEmail = async (side, quantity) => {
    try {
      await emailjs.send(
        "service_zp4z0jm",
        "template_z6y1elb",
        {
          to_email: email,
          symbol: symbol,
          price: price,
          quantity: quantity,
          side: side,
        },
        "La3s4DTcTfPlyJTGx",
      );
    } catch (error) {
      console.error("EmailJS error:", error);
    }
  };

  const handleBuy = () => {
    const amount = Number(amountRef.current.value);

    if (!amount) return;

    mutate({
      symbol,
      price,
      quantity: amount,
      side: "BUY",
    });

    // send email
    sendTradeEmail("BUY", amount);

    amountRef.current.value = "";
  };

  const handleSell = () => {
    const amount = Number(amountRef.current.value);

    if (!amount) return;

    mutate({
      symbol,
      price,
      quantity: amount,
      side: "SELL",
    });

    // send email
    sendTradeEmail("SELL", amount);

    amountRef.current.value = "";
  };

  return (
    <div className="bg-[#0b0e11] border border-gray-800 rounded-2xl p-5 w-full space-y-5 shadow-lg">
      {/* Market Header */}
      <div className="flex justify-between text-sm text-gray-400">
        <span>Market</span>
        <span className="text-gray-200">{symbol}</span>
      </div>

      {/* Price */}
      <div className="text-lg font-semibold text-white">
        Price: ${price || "--"}
      </div>

      {/* Amount Input */}
      <input
        ref={amountRef}
        type="number"
        placeholder="Enter amount"
        className="w-full bg-[#1e2329] text-white p-3 rounded-lg border border-gray-700 
        outline-none focus:ring-1 focus:ring-yellow-400"
      />

      {/* Buy / Sell Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleBuy}
          className="flex-1 bg-green-500 hover:bg-green-600 p-3 rounded-lg font-semibold transition"
        >
          Buy
        </button>

        <button
          onClick={handleSell}
          className="flex-1 bg-red-500 hover:bg-red-600 p-3 rounded-lg font-semibold transition"
        >
          Sell
        </button>
      </div>
    </div>
  );
}
