export const refetchAll = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...refetchFunctions: Array<() => Promise<any> | void>
) => {
  await Promise.all(refetchFunctions.map((fn) => fn && fn()));
};
