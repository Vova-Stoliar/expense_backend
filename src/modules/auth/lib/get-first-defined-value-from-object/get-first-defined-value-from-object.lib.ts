export function getFirstDefinedValueFromObject(object: Record<string, unknown>) {
    const uniqueProperty = Object.entries(object).find(([_key, value]) => value !== undefined) ?? [];

    return Object.fromEntries([uniqueProperty]);
}
