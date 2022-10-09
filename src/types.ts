export enum UseCaseResponseKind {
  SUCESS = "sucess",
  FAIL = "fail",
  NOT_FOUND = "not found",
}

interface IWithArgsUseCase<T, A> {
  execute: (args: A) => Promise<T>;
}

interface IWithoutArgsUseCase<T> {
  execute: () => Promise<T>;
}

export interface IUseCaseFailPayload {
  error: Error;
  message?: string;
}
export interface IUseCaseResponse<TPayload> {
  kind: UseCaseResponseKind;
  payload: TPayload | IUseCaseFailPayload;
}

export type UseCase<TPayload, TArgs = undefined> = TArgs extends undefined
  ? IWithoutArgsUseCase<IUseCaseResponse<TPayload>>
  : IWithArgsUseCase<IUseCaseResponse<TPayload>, TArgs>;
