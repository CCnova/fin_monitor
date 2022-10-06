export type ValidationFunction<T> = (
  toValidate: T,
  validAction: (value?: any | PromiseLike<any>) => void,
  notValidAction: (reason?: any) => void
) => void;

export const isLongerThan = (word: string, desiredLength: number) =>
  word.length > desiredLength;

export const isNumber = (value: number | string) => !isNaN(Number(value));

export const isTruthy = (value: any) => Boolean(value) == true;

export const runValidations = <T>(
  toValidate: T,
  validations: ValidationFunction<T>[]
) => {
  return Promise.all(
    validations.map(
      (validation) =>
        new Promise((resolve, reject) =>
          validation(toValidate, resolve, reject)
        )
    )
  );
};

export const isOfType = <T>(toCheck: any): toCheck is T => {
  return (toCheck as T) !== undefined;
};
