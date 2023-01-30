import { format } from "date-fns";
import { z } from "zod";

export const schemaForType =
  <T>() =>
  <S extends z.ZodType<T, any, any>>(arg: S) => {
    return arg;
  };

export const sqlDateRegex =
  /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) (0[0-9]|1[0-9]|2[0-4]):(0[0-9]|[1-5][0-9]):(0[0-9]|[1-5][0-9]))/;

export const sqlDateString = z.string().regex(sqlDateRegex);

export const getMysqlFormattedDateTime = (date: Date = new Date()) => {
  return format(date, "yyyy-MM-dd HH:mm:ss");
};
