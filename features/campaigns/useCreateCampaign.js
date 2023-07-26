import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewCampaign } from "../../services/apiCampaigns";
import { toast } from "react-hot-toast";
import web3 from "../../ethereum/web3";

export default function useCreateCampaign() {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createCampaign } = useMutation({
    mutationFn: ({ expectedAmount, minAmount, title, description, image }) =>
      createNewCampaign(
        web3.utils.toWei(minAmount, "ether"),
        web3.utils.toWei(expectedAmount, "ether"),
        title,
        description,
        image
      ),
    onSuccess: () => {
      toast.success("Campaign Created Successfully!");
      queryClient.invalidateQueries({
        queryKey: ["campaigns"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isCreating, createCampaign };
}
