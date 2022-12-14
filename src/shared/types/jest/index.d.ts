declare global {
    namespace jest {
        interface Matchers<R> {
            toBeUUID(): R;
        }

        interface Expect {
            toBeUUID(): WithUndefined<string>;
        }

        interface InverseAsymmetricMatchers {
            toBeUUID(): WithUndefined<string>;
        }
    }
}

export {};
