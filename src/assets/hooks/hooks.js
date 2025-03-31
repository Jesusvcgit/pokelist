import { useQuery } from "@tanstack/react-query";
import { fetchPokeData } from "../api/api";

export const usePokelistData = (endpoint) => {
  return useQuery({
    queryKey: ["data", endpoint],
    queryFn: () => fetchPokeData(endpoint),
    enabled: !!endpoint,
  });
};
