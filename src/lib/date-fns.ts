import { format } from "date-fns";

export const yyyyMMdd = (date: Date | number | string) => {
  if (typeof date === "string") {
    return format(new Date(date), "yyyy/MM/dd");
  } else {
    return format(date, "yyyy/MM/dd");
  }
};
