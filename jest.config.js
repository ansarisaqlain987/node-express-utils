module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: [
        "src/utils/*.ts"
    ],
    collectCoverageFrom: [
        'src/*.ts',
        '!src/utils/*.ts',
    ],
};