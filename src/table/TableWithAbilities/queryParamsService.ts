export const getQueryParams = () => {
  const urlParams = new URLSearchParams(window.location.search);

  return {
    searchQuery: urlParams.get("searchQuery") || "",
    showFilters: urlParams.get("showFilters") === "true",
    currentPage: Number(urlParams.get("currentPage")) || 0,
  };
};

export const setQueryParams = (
  searchQuery: string,
  showFilters: boolean,
  currentPage: number
) => {
  const urlParams = new URLSearchParams({
    searchQuery,
    showFilters: String(showFilters),
    currentPage: String(currentPage),
  });

  const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
  window.history.pushState(null, "", newUrl);
};
