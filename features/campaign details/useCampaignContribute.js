import { useMutation, useQueryClient } from "@tanstack/react-query";
import { contributeToCampaign } from "../../services/apiCampaigns";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function useCampaignContribute() {
  const { campaignId: campaignAddress } = useParams();
  const queryClient = useQueryClient();
  const { isLoading: isContributing, mutate: campaignContribute } = useMutation(
    {
      mutationFn: (value) => contributeToCampaign(campaignAddress, value),
      onSuccess: () => {
        toast.success("Contributed to campaign Successfully!");
        queryClient.invalidateQueries({
          queryKey: ["campaign", campaignAddress],
        });
      },
      onError: (err) => {
        toast.error(err.message);
      },
    }
  );
  return { isContributing, campaignContribute };
}
