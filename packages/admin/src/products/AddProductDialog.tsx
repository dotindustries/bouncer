import { productConfig } from "@dotinc/bouncer-api/schemas";
import { FormDialog, FormDialogProps } from "@dotinc/bouncer-ui";
import { api } from "../utils/api";

export const AddProductDialog: React.FC<
  Omit<FormDialogProps, "onSubmit" | "schema">
> = (props) => {
  const mutation = api.products.create.useMutation();
  return (
    <FormDialog
      {...props}
      title="Add product"
      schema={productConfig}
      onSubmit={async (data) => mutation.mutateAsync(data as any)}
    />
  );
};
