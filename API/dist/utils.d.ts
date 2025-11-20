export declare function generateCode(longitud?: number): string;
export declare class Result<TValue, TError> {
    readonly isSuccess: boolean;
    readonly isFailure: boolean;
    private readonly data;
    private readonly error;
    private constructor();
    static success<TValue, TError>(data: TValue): Result<TValue, TError>;
    static failure<TValue, TError>(error: TError): Result<TValue, TError>;
    getData(): TValue | null;
    getError(): TError | null;
    fold<U>(onSuccess: (value: TValue) => U, onFailure: (error: TError) => U): U;
}
