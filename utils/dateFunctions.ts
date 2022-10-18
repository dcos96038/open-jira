import {formatDistanceToNow} from "date-fns";
import es from "date-fns/locale/es";

export const getFormattedDistanceToNow = (date: number) => {
  const fromNow = formatDistanceToNow(date, {locale: es});

  return fromNow;
};
