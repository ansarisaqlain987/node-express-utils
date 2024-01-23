import { decryptString, encryptString, jwt, logger, verifyJwtToken } from "../src";


describe('Test index.ts', () => {
    let cipher: string = "";
    test('See if logger exists', () => {
        expect(typeof logger).toBe('function');
        const result = logger();
        expect(typeof result).toBe('function');
    });

    test('See if encryptString function exists', () => {
        expect(typeof encryptString).toBe('function');
        const result = encryptString("test", "test");
        cipher = result;
        expect(typeof result).toBe("string");
    });

    test('See if decryptString function exists', () => {
        expect(typeof decryptString).toBe('function');
        expect(decryptString("test", "test")).toBe("");
        expect(decryptString(cipher, "test")).toBe("test");
    });

    test('See if jwt exists', () => {
        expect(typeof jwt).toBe('function');
        const result = jwt({
            secret: "",
            cipherSecret: ""
        });
        expect(typeof result).toBe('function');
    });

    test('See if verifyToken exists', () => {
        expect(typeof verifyJwtToken).toBe('function');
        const result = verifyJwtToken();
        expect(typeof result).toBe('function');
    });


})