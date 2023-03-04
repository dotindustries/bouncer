import { Box, Column, DataTable, Loader } from "@dotinc/bouncer-ui";
import { api, RouterOutputs } from "../utils/api";

type Subscription = RouterOutputs["subscriptions"]["all"][0];

const columns: Column<Subscription>[] = [
  {
    accessor: "subscription_name",
    Header: "Name",
  },
  {
    accessor: "billing_manager_email",
    Header: "Billing email",
  },
  {
    accessor: "seatingConfig.seating_strategy_name",
    Header: "Seating strategy",
  },
  {
    accessor: "created_utc",
    Header: "Created at",
  },
  {
    accessor: "total_seats",
    Header: "Total seats",
  },
  {
    accessor: "seatSummary.standard_seat_count",
    Header: "Standard seats (used)",
  },
  {
    accessor: "seatSummary.limited_seat_count",
    Header: "Limited seats (used)",
  },
];

export const ListSubscriptions = ({ productId }: { productId: string }) => {
  const { data: subscriptions, isLoading } = api.subscriptions.all.useQuery({
    productId,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box overflowX="auto">
      <DataTable<Subscription>
        columns={columns}
        data={subscriptions}
        isSortable
      ></DataTable>
    </Box>
  );
};
