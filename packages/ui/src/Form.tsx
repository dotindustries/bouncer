import { ZodSchema } from "zod";
/* @ts-ignore */
import { zodResolver, zodFieldResolver } from "@saas-ui/forms/zod";
import { Form, FormDialog } from "@saas-ui/react";

/* @ts-ignore */
Form.getResolver = (schema: ZodSchema) => zodResolver(schema);
/* @ts-ignore */
Form.getFieldResolver = (schema: ZodSchema) => zodFieldResolver(schema);

export { Form, FormDialog };
