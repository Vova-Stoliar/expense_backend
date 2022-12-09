declare global {
    type KeysOfType<T> = T[keyof T];

    type Nullable<T> = T | null;

    type WithUndefined<T> = T | undefined;

    type PartialPick<T, K extends keyof T> = Partial<Pick<T, K>>;

    type Replace<Type, Key extends keyof Type, TypeByKey> = Omit<Type, Key> & {
        [key in keyof Type]: key extends Key ? TypeByKey : Type[key];
    };

    type PartialOnly<T, K extends keyof T> = Omit<T, K> & PartialPick<T, K>;

    type PartialExcept<T, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>;
}

export {};
