export const MESSAGES = {
    weakPassword: 'Password is too weak',
    notMatch: ({ property, propertyToMatch }: { property: string; propertyToMatch: string }) =>
        `"${property}" does not match "${propertyToMatch}"`,
};
