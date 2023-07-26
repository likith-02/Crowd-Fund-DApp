import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { campaignRequest as campaignRequestApi } from "../../services/apiCampaigns";

export default function useRequestCampaign() {
  const { campaignId: campaignAddress } = useParams();
  const queryClient = useQueryClient();
  const { isLoading: isCreatingRequest, mutate: campaignRequest } = useMutation(
    {
      mutationFn: ({ description, amount, recipient }) =>
        campaignRequestApi(campaignAddress, description, amount, recipient),
      onSuccess: () => {
        toast.success("Request sent to the contributors Successfully!");
        queryClient.invalidateQueries({
          queryKey: ["campaign-requests", campaignAddress],
        });
      },
      onError: (err) => {
        toast.error(err.message);
      },
    }
  );
  return { isCreatingRequest, campaignRequest };
}
