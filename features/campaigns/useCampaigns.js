import { useQuery } from "@tanstack/react-query";
import { getAllCampaigns } from "../../services/apiCampaigns";

export default function useCampaigns() {
  const {
    isLoading: isLoadingCampaigns,
    data: campaigns,
    error,
  } = useQuery({
    queryKey: ["campaigns"],
    queryFn: getAllCampaigns,
  });
  return { isLoadingCampaigns, campaigns, error };
}
