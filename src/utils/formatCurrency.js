import appConfig from "../config/appConfig";

export function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: appConfig.currency
  }).format(value || 0);
}
