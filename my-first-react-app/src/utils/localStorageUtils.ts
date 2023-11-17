export const loadSearchValue = (): string | undefined => {
  try {
    const savedSearchValue = localStorage.getItem('inputValue');
    return savedSearchValue ? JSON.parse(savedSearchValue) : '';
  } catch (err) {
    return undefined;
  }
};

export const saveSearchValue = (value: string) => {
  try {
    const searchValue = JSON.stringify(value);
    localStorage.setItem('inputValue', searchValue);
  } catch {
    // ignore write errors
  }
};
