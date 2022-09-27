type WithArgsUseCase<T, A> = {
  execute: (args: A) => Promise<T>;
};

type WithoutArgsUseCase<T> = {
  execute: () => Promise<T>;
};

export type UseCase<T, A = undefined> = A extends undefined
  ? WithoutArgsUseCase<T>
  : WithArgsUseCase<T, A>;
