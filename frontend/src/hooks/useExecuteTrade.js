import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { executeTrade } from "../services/apiTrade";

export function useExecuteTrade() {
  return useMutation({
    mutationFn: executeTrade,

    onSuccess: () => {
      toast.success("Trade executed and email sent for the trade made");
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });
}
