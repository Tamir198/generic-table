import { SelectOptions } from "../../types";

export const getQueryParams = () => {
  const urlParams = new URLSearchParams(window.location.search);

  return {
    searchQuery: urlParams.get("searchQuery") || "",
    showFilters: urlParams.get("showFilters") === "true",
    bailStatus: urlParams.get("bailStatus") || null,
    bailType: urlParams.get("bailType") || null,
    coinType: urlParams.get("coinType") || null,
    currentPage: Number(urlParams.get("currentPage")) || 0,
  };
};

export const setQueryParams = (
  searchQuery: string,
  showFilters: boolean,
  bailStatus: SelectOptions,
  bailType: SelectOptions,
  coinType: SelectOptions,
  currentPage: number
) => {
  const urlParams = new URLSearchParams({
    searchQuery,
    showFilters: String(showFilters),
    bailStatus: bailStatus !== null ? String(bailStatus) : "",
    bailType: bailType !== null ? String(bailType) : "",
    coinType: coinType !== null ? String(coinType) : "",
    currentPage: String(currentPage),
  });

  const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
  window.history.pushState(null, "", newUrl);
};
