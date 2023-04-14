module.exports = {
    preset: 'ts-jest',
    collectCoverage: true,
    transform: {
        '^.+\\.ts?$': 'ts-jest'
    },
    testEnvironment: 'jsdom',
}