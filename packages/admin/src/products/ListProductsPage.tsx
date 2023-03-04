import {
  Box,
  Button,
  ColumnDef,
  DataTable,
  EmptyState,
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

  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "product_name",
        header: "Product name",
        meta: {
          href: (cell: any) => `/products/${cell.id}`,
        },
      },
      {
        accessorKey: "publisher_name",
        header: "Publisher name",
      },
    ],
    []
  );

  if (isLoading) {
    return <Loader />;
  }

  if (!data || error) {
    return <EmptyState title="Invalid product" />;
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

      <DataTable columns={columns} data={data} />
    </Box>
  );
};
