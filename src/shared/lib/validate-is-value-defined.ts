interface Params<TValue> {
    value: TValue;
    error: Error;
}

export const validateIsValueDefined = <TValue>(params: Params<TValue>) => {
    const { error, value } = params;

    if (value === undefined || value === null) throw error;

    return value;
};
