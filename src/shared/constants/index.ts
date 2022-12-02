export const MESSAGES = {
    weakPassword: 'Password is too weak',
    notMatch: ({ property, propertyToMatch }: { property: string; propertyToMatch: string }) =>
        `${property} does not match ${propertyToMatch}`,
    notExist: ({ property }: { property: string }) => `${property} does not exist`,
    doesExist: ({ property }: { property: string }) => `${property} does already exist`,
    notFond: ({ property }: { property: string }) => `No ${property} found`,
    notValid: ({ property }: { property: string }) => `${property} is not valid`,
} as const;

export const STRATEGIES_NAMES = {
    accessToken: 'jwt',
    refreshToken: 'jwt-refresh',
} as const;

export const DECORATORS_KEYS = {
    public: 'public',
    checkPolicies: 'checkPolicy',
} as const;

export const DEFAULT_CATEGORIES = {
    other: 'Other',
    salary: 'Salary',
    food: 'Food',
    travels: 'Travels',
    gifts: 'Gifts',
} as const;

export const DEFAULT_DATA_NAMES = {
    category: 'category',
} as const;
