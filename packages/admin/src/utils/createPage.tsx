import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { NextPage } from "next/types";
import { Authenticated } from "../auth";

interface CustomPageProps {}

export interface CreatePageProps<TPageProps extends object>
  extends CustomPageProps {
  title?: string;
  protected?: boolean;
  renderComponent: React.FC<PageProps & TPageProps>;
}

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> &
  CustomPageProps;

export interface NavigateOptions {
  replace?: boolean;
}

export interface PageProps {
  query: Record<string, any>;
  locale?: string;
}

/**
 * @todo implement features/roles/auth/layouts/data loading?
 *
 * Inspired by
 * https://blog.rstankov.com/structuring-next-js-application/
 */
export const createPage = <TPageProps extends object>(
  createProps: CreatePageProps<TPageProps>
) => {
  const { title, renderComponent: PageComponent } = createProps;

  const Page: NextPageWithLayout<TPageProps> = (props) => {
    const router = useRouter();

    const page = <PageComponent query={router.query} {...props} />;

    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>

        {createProps.protected ? <Authenticated>{page}</Authenticated> : page}
      </>
    );
  };

  return Page;
};
