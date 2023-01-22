import { createPage, DashboardPage } from "@dotinc/bouncer-admin";
import { getServerSession } from "@dotinc/bouncer-auth/src/server";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export default createPage<ServerProps>({
  protected: true,
  renderComponent: DashboardPage,
});

type ServerProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return {
    props: {
      session: await getServerSession(ctx),
    },
  };
};
