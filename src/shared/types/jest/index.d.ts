declare global {
    namespace jest {
        interface Matchers<R> {
            toBeWithinRange(a: number, b: number): R;
            toBeUUID(): R;
        }
        interface Expect {
            toBeWithinRange(a: number, b: number): any;
            toBeUUID(): any;
        }

        interface InverseAsymmetricMatchers {
            toBeWithinRange(a: number, b: number): any;
            toBeUUID(): any;
        }
    }
}

export {};
