import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { NextPage } from "next/types";

interface CustomPageProps {}

export interface CreatePageProps<TPageProps extends object>
  extends CustomPageProps {
  title?: string;
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
  props: CreatePageProps<TPageProps>
) => {
  const { title, renderComponent: PageComponent } = props;

  const Page: NextPageWithLayout<TPageProps> = (props) => {
    const router = useRouter();

    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>

        <PageComponent query={router.query} {...props} />
      </>
    );
  };

  return Page;
};
