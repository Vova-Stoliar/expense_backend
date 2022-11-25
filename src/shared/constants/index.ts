export const MESSAGES = {
    weakPassword: 'Password is too weak',
    notMatch: ({ property, propertyToMatch }: { property: string; propertyToMatch: string }) =>
        `${property} does not match ${propertyToMatch}`,
    notExist: ({ property }: { property: string }) => `${property} does not exist`,
    notFond: ({ property }: { property: string }) => `No ${property} found`,
    notValid: ({ property }: { property: string }) => `${property} is not valid`,
} as const;

export const STRATEGIES_NAMES = {
    accessToken: 'jwt',
    refreshToken: 'jwt-refresh',
} as const;

export const PUBLIC_DECORATOR_KEYWORD = 'public' as const;
