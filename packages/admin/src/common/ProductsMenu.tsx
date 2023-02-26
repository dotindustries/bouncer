import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
  useModals,
  Portal,
} from "@dotinc/bouncer-ui";
import { useRouter } from "next/router";
import { AddProductDialog } from "../products/AddProductDialog";
import { FiChevronDown } from "react-icons/fi";
import { api } from "../utils/api";

export const ProductsMenu = () => {
  const { data: products, isLoading } = api.products.all.useQuery();
  const router = useRouter();
  const modals = useModals();

  const selected =
    products?.find((product) => router.query.productId === product.id) ||
    products?.[0];

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<FiChevronDown />}
        isLoading={isLoading}
        isDisabled={!products?.length}
      >
        {selected?.product_name}
      </MenuButton>
      <Portal>
        <MenuList>
          {products?.map((product) => (
            <MenuItem
              key={product.id}
              onClick={() => router.push(`/${product.id}`)}
            >
              {product.product_name}
            </MenuItem>
          ))}
          <MenuDivider />
          <MenuItem onClick={() => modals.open(AddProductDialog)}>
            Add product
          </MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  );
};
