export const isLongerThan = (word: string, desiredLength: number) =>
  word.length > desiredLength;

export const isNumber = (value: number | string) => !isNaN(Number(value));

export const isTruthy = (value: any) => value == true;
