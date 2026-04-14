export const getDataFromLocalStorage = (key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data) as T;
  }
  return defaultValue;
};

export const setDataToLocalStorage = (key: string, value: any): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
};
