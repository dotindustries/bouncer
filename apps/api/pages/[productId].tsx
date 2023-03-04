import { createPage, ProductPage } from "@dotinc/bouncer-admin";

export default createPage({
  protected: true,
  renderComponent: ({ query }) => {
    return <ProductPage productId={query.productId} />;
  },
});
