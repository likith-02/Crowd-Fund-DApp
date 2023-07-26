import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCampaign } from "../../services/apiCampaigns";

export default function useCampaign() {
  const { campaignId: campaignAddress } = useParams();
  const {
    data: campaignData,
    isLoading: isLoadingCampaign,
    error,
  } = useQuery({
    queryKey: ["campaign", campaignAddress],
    queryFn: () => getCampaign(campaignAddress),
    retry: false,
  });
  return { campaignData, isLoadingCampaign, error };
}
