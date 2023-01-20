import { publisherConfiguration } from "@dotinc/bouncer-core";
import { FormDialog, FormDialogProps } from "@dotinc/bouncer-ui";
import { config } from "../api";

const schema = publisherConfiguration.pick({
  product_name: true,
  publisher_name: true,
});

export const AddProductDialog: React.FC<
  Omit<FormDialogProps, "onSubmit" | "schema">
> = (props) => {
  const mutation = config.usePublisherConfiguration();
  return (
    <FormDialog
      {...props}
      title="Add product"
      schema={schema}
      onSubmit={async (data) => mutation.mutateAsync(data as any)}
    />
  );
};
