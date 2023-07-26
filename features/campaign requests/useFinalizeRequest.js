import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { finalizeRequest as finalizeRequestApi } from "../../services/apiCampaigns";

export default function useFinalizeRequest() {
  const { campaignId: campaignAddress } = useParams();
  const queryClient = useQueryClient();
  const { isLoading: isFinalizingRequest, mutate: finalizeRequest } =
    useMutation({
      mutationFn: (requestIndex) =>
        finalizeRequestApi(campaignAddress, requestIndex),
      onSuccess: () => {
        toast.success(`Finalized request Successfully!`);
        queryClient.invalidateQueries({
          queryKey: ["campaign-requests", campaignAddress],
        });
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  return { isFinalizingRequest, finalizeRequest };
}
