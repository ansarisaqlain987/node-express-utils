import { logger } from "../../src/utils/request-util";


describe('Test index.ts', () => {
    let cipher: string = "";
    test('See if logger exists', () => {
        expect(typeof logger).toBe('function');
        const result = logger();
        expect(typeof result).toBe('function');
    });


})