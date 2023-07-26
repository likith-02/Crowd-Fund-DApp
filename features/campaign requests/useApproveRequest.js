import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { approveRequest as approveRequestApi } from "../../services/apiCampaigns";

export default function useApproveRequest() {
  const { campaignId: campaignAddress } = useParams();
  const queryClient = useQueryClient();
  const { isLoading: isApprovingRequest, mutate: approveRequest } = useMutation(
    {
      mutationFn: (requestIndex) =>
        approveRequestApi(campaignAddress, requestIndex),
      onSuccess: () => {
        toast.success(`Approved request Successfully!`);
        queryClient.invalidateQueries({
          queryKey: ["campaign-requests", campaignAddress],
        });
      },
      onError: (err) => {
        toast.error(err.message);
      },
    }
  );
  return { isApprovingRequest, approveRequest };
}
