export const objectEntries = Object.entries as <T>(
  o: T
) => [Extract<keyof T, string>, T[keyof T]][];
