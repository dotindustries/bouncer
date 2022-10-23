import dynamic from "next/dynamic";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { apiDefinition } from "@dotinc/bouncer-core";
import { createSwaggerSpec } from "next-swagger-doc";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(import("swagger-ui-react"), { ssr: false });

function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <SwaggerUI spec={spec} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const spec: Record<string, any> = createSwaggerSpec({
    definition: apiDefinition,
  });

  return {
    props: {
      spec,
    },
  };
};

export default ApiDoc;
