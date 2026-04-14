export const getDataFromLocalStorage = (key: string, defaultValue: T): T => {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data) as T;
  }
  return defaultValue;
};

export const setDataToLocalStorage = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value));
};
