import { productConfig } from "@dotinc/bouncer-core";
import { AutoForm, Form } from "@dotinc/bouncer-ui";

export const EditProductForm: React.FC<{ product: any }> = (props) => {
  const onSubmit = async (data: any) => {
    console.log(data);
  };
  return (
    <AutoForm
      schema={productConfig}
      defaultValues={props.product}
      onSubmit={onSubmit}
    />
  );
};
