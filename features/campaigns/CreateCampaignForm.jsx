import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import useCreateCampaign from "./useCreateCampaign";
import SpinnerMini from "../../ui/SpinnerMini";

function CreateCampaignForm() {
  const { isCreating, createCampaign } = useCreateCampaign();
  const { register, handleSubmit, reset, formState } = useForm();
  const errors = formState.errors;

  function onSubmit(data) {
    createCampaign(data, {
      onSuccess: () => {
        reset();
      },
    });
  }
  function onError(err) {
    console.log(err);
  }
  return (
    <>
      <h1>Create a new Campaign</h1>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow label="Title" error={errors?.title?.message}>
          <Input
            disabled={isCreating}
            type="text"
            id="title"
            {...register("title", {
              required: "This field is required!",
            })}
          />
        </FormRow>
        <FormRow label="Description" error={errors?.description?.message}>
          <Input
            disabled={isCreating}
            type="text"
            id="description"
            {...register("description", {
              required: "This field is required!",
            })}
          />
        </FormRow>
        <FormRow label="Image Url" error={errors?.image?.message}>
          <Input
            disabled={isCreating}
            type="text"
            id="image"
            {...register("image", {
              required: "This field is required!",
            })}
          />
        </FormRow>
        <FormRow
          label="Minimum Contribution"
          error={errors?.minAmount?.message}
        >
          <Input
            disabled={isCreating}
            type="number"
            step="any"
            id="minAmount"
            placeholder="amount in ether"
            {...register("minAmount", {
              required: "This field is required!",
              min: {
                value: 0.00000001,
                message:
                  "Minimum contribution should be set to atleast 0.00000001 ether!",
              },
            })}
          />
        </FormRow>
        <FormRow
          label="Expected Amount"
          error={errors?.expectedAmount?.message}
        >
          <Input
            disabled={isCreating}
            type="number"
            step="any"
            id="expectedAmount"
            placeholder="amount in ether"
            {...register("expectedAmount", {
              required: "This field is required!",
              min: {
                value: 0.5,
                message: "Minimum target should be atleast 0.5 ether!",
              },
            })}
          />
        </FormRow>
        <FormRow>
          <Button disabled={isCreating}>
            {isCreating ? <SpinnerMini /> : "create new campaign"}
          </Button>
        </FormRow>
      </Form>
    </>
  );
}

export default CreateCampaignForm;
