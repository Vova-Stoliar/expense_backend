export type KeysOfType<T> = T[keyof T];
export type Nullable<T> = T | null;
export type WithUndefined<T> = T | undefined;
export type PartialPick<T, K extends keyof T> = Partial<Pick<T, K>>;
