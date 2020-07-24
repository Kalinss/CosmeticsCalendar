export const getUpperFirstCharString = (str: string): string => {
  if (str.length === 0) return "";
  return [str[0].toUpperCase(), str.slice(1, str.length)].join("");
};
export const getLastStringLocationPath = (str:string):string=>{
  const pathSplit = str.split('/');
  return pathSplit[pathSplit.length-1];
}