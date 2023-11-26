export const loadSearchValue = (): string => {
  try {
    const savedSearchValue = localStorage.getItem('inputValue');
    return savedSearchValue ? JSON.parse(savedSearchValue) : '';
  } catch (err) {
    return '';
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
