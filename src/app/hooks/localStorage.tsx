export const getDataFromLocalStorage = (key: string, defaultValue: T): T => {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data) as T;
  }
  return defaultValue;
};
