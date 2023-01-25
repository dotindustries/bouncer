import { productConfiguration } from "@dotinc/bouncer-core";
import { FormDialog, FormDialogProps } from "@dotinc/bouncer-ui";
import { products } from "../api";

const schema = productConfiguration;

export const AddProductDialog: React.FC<
  Omit<FormDialogProps, "onSubmit" | "schema">
> = (props) => {
  const mutation = products.useCreateProductConfig();
  return (
    <FormDialog
      {...props}
      title="Add product"
      schema={schema}
      onSubmit={async (data) => mutation.mutateAsync(data as any)}
    />
  );
};
