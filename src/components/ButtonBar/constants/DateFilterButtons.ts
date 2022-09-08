import {
  getAllTimeRange,
  getLast6MonthsRange,
  getLastMonthRange,
  getThisMonthRange,
} from "utils/date"

import { ButtonBarElement } from "../ButtonBar"

export const dateFilterButtons: ButtonBarElement[] = [
  {
    label: "wallet.history.filters.thisMonth",
    value: "THIS_MONTH",
  },
  {
    label: "wallet.history.filters.lastMonth",
    value: "LAST_MONTH",
  },
  {
    label: "wallet.history.filters.last6Months",
    value: "LAST_6_MONTHS",
  },
  {
    label: "wallet.history.filters.all",
    value: "ALL",
  },
]

export type DateFilterValue = "THIS_MONTH" | "LAST_MONTH" | "LAST_6_MONTHS" | "ALL"

export const DateFilterToDateRange = {
  THIS_MONTH: getThisMonthRange(),
  LAST_MONTH: getLastMonthRange(),
  LAST_6_MONTHS: getLast6MonthsRange(),
  ALL: getAllTimeRange(),
}
