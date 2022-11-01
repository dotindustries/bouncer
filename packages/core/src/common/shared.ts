import { z } from "zod";
import { format } from "date-fns";

export const error404 = z.object({
  code: z.number(),
  message: z.string(),
  id: z.number().or(z.string()),
});

export const error = z.object({
  code: z.number(),
  message: z.string(),
});

export const sqlDateRegex =
  /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) (0[0-9]|1[0-9]|2[1-4]):(0[0-9]|[1-5][0-9]):(0[0-9]|[1-5][0-9]))/;

export const sqlDateString = z.string().regex(sqlDateRegex);

export const getMysqlFormattedDateTime = (date: Date = new Date()) => {
  return format(date, "yyyy-MM-dd HH:mm:ss");
};
