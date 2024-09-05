type SessionParams = {
  [key: string]: string | number | boolean | object;
};

export const storageService = {
  addSessionParams: (params: SessionParams) => {
    Object.entries(params).forEach(([key, value]) => {
      const existingValue = sessionStorage.getItem(key);

      if (existingValue !== null) {
        const parsedExistingValue = JSON.parse(existingValue);
        if (
          typeof parsedExistingValue === "object" &&
          typeof value === "object"
        ) {
          const mergedValue = { ...parsedExistingValue, ...value };
          sessionStorage.setItem(key, JSON.stringify(mergedValue));
        } else {
          sessionStorage.setItem(key, JSON.stringify(value));
        }
      } else {
        sessionStorage.setItem(
          key,
          typeof value === "object" ? JSON.stringify(value) : String(value)
        );
      }
    });
  },

  getSessionParams: (): SessionParams => {
    const params: SessionParams = {};

    Object.keys(sessionStorage).forEach((key) => {
      const value = sessionStorage.getItem(key);
      const parsedValue = JSON.parse(value as string);

      if (typeof parsedValue === "boolean") {
        params[key] = parsedValue;
      } else if (!isNaN(Number(parsedValue))) {
        params[key] = Number(parsedValue);
      } else {
        params[key] = parsedValue;
      }
    });

    return params;
  },
};
