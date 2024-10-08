export const extractIndex = (str: string) => Number(str.replace(/^.*\[(\d+)]([^\]])*$/, '$1'));
