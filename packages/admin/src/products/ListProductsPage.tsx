import {
  Box,
  Button,
  DataTable,
  Heading,
  HStack,
  Loader,
  useModals,
} from "@dotinc/bouncer-ui";
import * as React from "react";
import { AddProductDialog } from "./AddProductDialog";
import { api } from "../utils/api";

export const ListProductsPage = () => {
  const modals = useModals();

  const { data, error, isLoading } = api.products.all.useQuery();

  const columns = React.useMemo(
    () => [
      {
        id: "product_name",
        Header: "Product name",
        href: (cell: any) => `/products/${cell.id}}`,
      },
      {
        id: "publisher_name",
        Header: "Publisher name",
      },
    ],
    []
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box px="8" py="4">
      <HStack mb="4">
        <Heading flex="1" size="md">
          Dashboard
        </Heading>
        <Button variant="primary" onClick={() => modals.open(AddProductDialog)}>
          Add product
        </Button>
      </HStack>

      {/* @ts-ignore: types are incorrect somehow */}
      <DataTable columns={columns} data={data} />
    </Box>
  );
};
