export const getUpperFirstCharString = (str: string): string => {
  if (str.length === 0) return "";
  return [str[0].toUpperCase(), str.slice(1, str.length)].join("");
};
