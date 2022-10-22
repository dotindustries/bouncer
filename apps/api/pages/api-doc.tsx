import { seatsApi } from "@dotinc/bouncer-core";
import { toOpenApi } from "@zodios/openapi";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { createSwaggerSpec } from "next-swagger-doc";
import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(import("swagger-ui-react"), { ssr: false });

function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <SwaggerUI spec={spec} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const definition = toOpenApi(seatsApi, {
    info: {
      title: "Seats API",
      version: "1.0.0",
      description: "SaaS seat management API",
    },
    servers: [
      {
        url: "/api/v1", // base path of user api
      },
    ],
  });

  const spec: Record<string, any> = createSwaggerSpec({
    definition,
  });

  return {
    props: {
      spec,
    },
  };
};

export default ApiDoc;
