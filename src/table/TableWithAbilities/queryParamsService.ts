export const setQueryParams = (
  params: { [key: string]: string | number | boolean },
  removeKeys: string[] = []
) => {
  const urlParams = new URLSearchParams(window.location.search);

  removeKeys.forEach((key) => urlParams.delete(key));

  Object.entries(params).forEach(([key, value]) => {
    urlParams.set(key, String(value));
  });

  const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
  window.history.pushState(null, "", newUrl);
};

export const getQueryParams = (): {
  [key: string]: string | number | boolean;
} => {
  const urlParams = new URLSearchParams(window.location.search);
  const params: { [key: string]: string | number | boolean } = {};

  urlParams.forEach((value, key) => {
    if (!isNaN(Number(value))) {
      params[key] = Number(value);
    } else if (value === "true" || value === "false") {
      params[key] = value === "true";
    } else {
      params[key] = value;
    }
  });

  return params;
};
