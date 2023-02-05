import { svix } from "./index";
import { eventSchemas, EventTypes } from "@dotinc/bouncer-core";
import { zodToJsonSchema } from "zod-to-json-schema";

const missingTypes = <T>(arr1: T[], arr2: T[]) =>
  arr1.filter((e) => !arr2.includes(e));

export const deployEventTypes = async () => {
  const eventTypes = await svix.eventType.list({});
  const names = eventTypes.data.map((e) => e.name);
  const missing = missingTypes<keyof EventTypes>(
    Object.keys(eventSchemas) as (keyof EventTypes)[],
    names as (keyof EventTypes)[]
  );
  if (missing.length === 0) {
    return; // all types are present
  }

  const creates = [];
  for (let i = 0; i < missing.length; i++) {
    const eventType = missing[i];
    if (!eventType) continue;

    const eventSchema = zodToJsonSchema(eventSchemas[eventType], eventType);

    const jsonString = JSON.stringify(eventSchema);

    creates.push(
      svix.eventType.create({
        name: eventType,
        description: "",
        schemas: {
          default: jsonString,
        },
      })
    );
  }

  await Promise.all(creates);
};
