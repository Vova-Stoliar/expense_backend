export type KeysOfType<T> = T[keyof T];

export type Nullable<T> = T | null;

export type WithUndefined<T> = T | undefined;

export type PartialPick<T, K extends keyof T> = Partial<Pick<T, K>>;

export type Replace<Type, Key extends keyof Type, TypeByKey> = Omit<Type, Key> & {
    [key in keyof Type]: key extends Key ? TypeByKey : Type[key];
};

export type PartialOnly<T, K extends keyof T> = Omit<T, K> & PartialPick<T, K>;

export type PartialExcept<T, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>;
