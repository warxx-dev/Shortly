export function generateCode(longitud = 10): string {
  const caracteres =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let codigo = '';

  for (let i = 0; i < longitud; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    codigo += caracteres[indice];
  }

  return codigo;
}

export class Result<TValue, TError> {
  public readonly isSuccess: boolean;
  public readonly isFailure: boolean;

  private readonly data: TValue | null;
  private readonly error: TError | null;

  private constructor(
    isSuccess: boolean,
    data: TValue | null,
    error: TError | null,
  ) {
    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.data = data;
    this.error = error;
    Object.freeze(this);
  }

  public static success<TValue, TError>(data: TValue): Result<TValue, TError> {
    return new Result<TValue, TError>(true, data, null);
  }

  public static failure<TValue, TError>(error: TError): Result<TValue, TError> {
    return new Result<TValue, TError>(false, null, error);
  }

  public getData(): TValue | null {
    return this.data;
  }

  public getError(): TError | null {
    return this.error;
  }

  public fold<U>(
    onSuccess: (value: TValue) => U,
    onFailure: (error: TError) => U,
  ): U {
    if (this.isSuccess) {
      return onSuccess(this.data as TValue);
    }
    return onFailure(this.error as TError);
  }
}
