export const safeJson = (data: any) => {
  return JSON.parse(JSON.stringify(data));
};
