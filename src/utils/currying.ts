export const executeUsing =
  <T>(toUse: T) =>
  (toExecute: (toUse: T) => unknown) =>
    toExecute(toUse);
