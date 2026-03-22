import { useQuery } from "@tanstack/react-query";
import { getPortfolio } from "../services/apiPortfolio";

export function usePortfolio() {
  return useQuery({
    queryKey: ["portfolio"],
    queryFn: getPortfolio,
    refetchInterval: 1000,

    // optional (recommended)
    refetchOnWindowFocus: false,
    staleTime: 0,
  });
}
