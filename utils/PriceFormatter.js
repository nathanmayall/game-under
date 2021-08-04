const priceFormatter = (hasPriceOverview) => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: hasPriceOverview.currency || "USD",
  }).format(hasPriceOverview.final / 100);
};

export default priceFormatter;
