import { useSession } from "@dotinc/bouncer-auth";
import { productConfig } from "@dotinc/bouncer-core";
import slug from "slug";
import {
  Field,
  FormDialog,
  FormDialogProps,
  FormLayout,
  Loader,
  SubmitHandler,
  useSnackbar,
} from "@dotinc/bouncer-ui";
import { useRouter } from "next/router";
import { api } from "../utils/api";
import { useRef } from "react";

const schema = productConfig.pick({
  id: true,
  product_name: true,
  publisher_name: true,
  billing_manager_email: true,
});

export interface AddProductDialogProps
  extends Omit<FormDialogProps, "onSubmit" | "schema"> {
  ownerId: string;
}

export const AddProductDialog: React.FC<AddProductDialogProps> = (props) => {
  const mutation = api.products.create.useMutation();
  const snackbar = useSnackbar();
  const session = useSession({ required: true });
  const router = useRouter();

  const slugRef = useRef<HTMLInputElement>(null);

  if (session.status === "loading") {
    return <Loader />;
  }

  const createProduct: SubmitHandler<any> = async (data) => {
    const promise = mutation.mutateAsync({
      seatingConfig: {
        owner_id: session.data.user.id,
      },
      ...data,
    });

    snackbar.promise(promise, {
      loading: "Creating product",
      success: "Project created",
      error: "Failed to create product",
    });

    const result = await promise;
    if (result) {
      router.push("/" + result.id);
    }

    return true;
  };

  return (
    <FormDialog
      {...props}
      title="Add product"
      // for some reason the schema is not working
      // resolver={zodResolver(schema)}
      defaultValues={{
        product_name: "",
        publisher_name: "",
      }}
      onSubmit={createProduct}
    >
      <FormLayout>
        <Field
          name="product_name"
          label="Product name"
          onChange={(e: any) => {
            if (slugRef.current) {
              slugRef.current.value = slug(e.target.value);
            }
          }}
          rules={{ required: true }}
        />
        <Field
          ref={slugRef}
          name="id"
          label="Product id"
          rules={{ required: true }}
        />

        <Field
          name="publisher_name"
          label="Publisher name"
          rules={{ required: true }}
        />
        <Field
          name="billing_manager_email"
          label="Billing manager e-mail"
          rules={{ required: true }}
        />
      </FormLayout>
    </FormDialog>
  );
};
