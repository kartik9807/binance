import Navbar from "../components/Navbar";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState(""); // Changed state name for clarity

  const { mutate, isPending } = useLogin();

  // STRICTOR REGEX: Only allows exactly 10 digits
  const phoneRegex = /^[0-9]{10}$/;
  const isPhoneValid = phoneRegex.test(phone);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isPhoneValid) {
      return toast.error("Please enter a valid 10-digit phone number");
    }

    // Sending { phone } to your backend
    mutate(
      { phone },
      {
        onSuccess: () => {
          toast.success("OTP sent to your phone! 📲");
          // Optional: navigate("/verify-otp");
        },
        onError: (error) => {
          const message = error?.response?.data?.message || "Login failed";
          toast.error(message);

          // If user is not found (404), redirect to Signup
          if (error?.response?.status === 404) {
            navigate("/signup");
          }
        },
      },
    );
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center py-16 px-4">
        <h1 className="text-4xl font-extrabold mb-10 tracking-wide text-center">
          Login to Account
        </h1>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl bg-slate-800 p-10 rounded-3xl shadow-2xl border border-slate-700 space-y-6"
        >
          <div className="space-y-2">
            <label className="text-sm text-gray-400 ml-1">Phone Number</label>
            <div className="flex gap-2">
              <span className="bg-slate-700 p-4 rounded-xl border border-slate-600 flex items-center text-gray-300">
                +91
              </span>
              <input
                type="text"
                placeholder="Enter 10 digit number"
                value={phone}
                maxLength={10} // Prevents more than 10 digits
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))} // Only allows numbers
                className="w-full text-lg p-4 rounded-xl bg-slate-700 border border-slate-600 placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              />
            </div>
          </div>

          {/* UPDATED VALIDATION MESSAGE */}
          {phone && (
            <p
              className={`text-sm font-medium ${isPhoneValid ? "text-green-400" : "text-red-400"}`}
            >
              {isPhoneValid
                ? "Phone number looks good! ✅"
                : "Please enter exactly 10 digits ❌"}
            </p>
          )}

          <button
            type="submit"
            disabled={!isPhoneValid || isPending}
            className={`w-full py-4 text-xl rounded-2xl font-bold transition-all duration-300 
              ${
                isPhoneValid && !isPending
                  ? "bg-yellow-400 text-black hover:bg-yellow-300 shadow-lg shadow-yellow-900/20"
                  : "bg-gray-700 text-gray-500 cursor-not-allowed"
              }`}
          >
            {isPending ? "Verifying..." : "Continue"}
          </button>
        </form>

        <div className="mt-8 text-lg flex gap-2">
          <span className="text-gray-400">New to the platform?</span>
          <Link
            to="/signup"
            className="text-yellow-400 font-semibold hover:underline"
          >
            Create an account
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;
