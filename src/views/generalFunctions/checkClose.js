export const checkClose = (event) => {
  if (event.target === event.currentTarget) return true;
  return false;
};
