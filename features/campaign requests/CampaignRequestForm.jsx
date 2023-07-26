import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import useRequestCampaign from "./useRequestCampaign";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import web3 from "../../ethereum/web3";
import SpinnerMini from "../../ui/SpinnerMini";

function CampaignRequestForm({ onCloseModal }) {
  const { isCreatingRequest, campaignRequest } = useRequestCampaign();
  const { register, handleSubmit, reset, formState } = useForm();
  const errors = formState.errors;
  function onSubmit(data) {
    campaignRequest(
      {
        description: data.description,
        amount: web3.utils.toWei(data.amount, "ether"),
        recipient: data.recipient,
      },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );
  }
  function onError(err) {
    console.log(err);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <h1>Create New Request</h1>
      <FormRow label="Description" error={errors?.description?.message}>
        <Input
          disabled={isCreatingRequest}
          type="text"
          id="description"
          placeholder="Describe your request"
          {...register("description", {
            required: "This field is required!",
          })}
        />
      </FormRow>
      <FormRow label="Amount" error={errors?.amount?.message}>
        <Input
          disabled={isCreatingRequest}
          type="number"
          step="any"
          id="amount"
          placeholder="amount in ether"
          {...register("amount", {
            required: "This field is required!",
            min: {
              value: 0.000000000000001,
              message: `Minimum contribution should be atleast 0.000000000000001 ether!`,
            },
          })}
        />
      </FormRow>
      <FormRow label="Recipient" error={errors?.recipient?.message}>
        <Input
          disabled={isCreatingRequest}
          type="text"
          id="recipent"
          placeholder="Recipient account address"
          {...register("recipient", {
            required: "This field is required!",
          })}
        />
      </FormRow>
      <FormRow>
        <Button disabled={isCreatingRequest}>
          {isCreatingRequest ? <SpinnerMini /> : "Create!"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CampaignRequestForm;
