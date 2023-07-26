import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import useCampaignContribute from "./useCampaignContribute";
import web3 from "../../ethereum/web3";
import SpinnerMini from "../../ui/SpinnerMini";
import useCampaign from "./useCampaign";
import Spinner from "../../ui/Spinner";

function CampaignContributeForm({ onCloseModal }) {
  const { isContributing, campaignContribute } = useCampaignContribute();
  const { campaignData, isLoadingCampaign } = useCampaign();
  const { register, handleSubmit, reset, formState } = useForm();
  const errors = formState.errors;

  if (isLoadingCampaign) return <Spinner />;

  const minContribution = web3.utils.fromWei(
    parseInt(campaignData.minimumContribution),
    "ether"
  );

  function onSubmit(data) {
    campaignContribute(web3.utils.toWei(data.contribution, "ether"), {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      },
    });
  }
  function onError(err) {
    console.log(err);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <h1>Contribute to the campaign</h1>
      <FormRow label="Contribution" error={errors?.contribution?.message}>
        <Input
          disabled={isContributing}
          type="number"
          step="any"
          id="contribution"
          placeholder="amount in ether"
          {...register("contribution", {
            required: "This field is required!",
            min: {
              value: minContribution,
              message: `Minimum contribution should be atleast ${minContribution} ether!`,
            },
          })}
        />
      </FormRow>
      <FormRow>
        <Button disabled={isContributing}>
          {isContributing ? <SpinnerMini /> : "Contribute!"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CampaignContributeForm;
