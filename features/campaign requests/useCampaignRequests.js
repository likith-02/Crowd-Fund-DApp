import { useParams } from "react-router-dom";
import { getCampaignRequests } from "../../services/apiCampaigns";
import { useQuery } from "@tanstack/react-query";

export default function useCampaignRequests() {
  const { campaignId: campaignAddress } = useParams();
  const {
    isLoading: isLoadingCampaignRequests,
    data: {
      requests,
      requestsStatus,
      isContributor,
      isManager,
      contributorCount,
    } = {},
    error,
  } = useQuery({
    queryKey: ["campaign-requests", campaignAddress],
    queryFn: () => getCampaignRequests(campaignAddress),
    retry: false,
  });
  return {
    isLoadingCampaignRequests,
    requests,
    requestsStatus,
    isContributor,
    isManager,
    contributorCount,
    error,
  };
}
