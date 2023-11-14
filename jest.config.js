const config = {
    testEnvironment: 'jsdom',
    testMatch: ['**/*.js'],
    testPathIgnorePatterns: ['/node_modules/'],
    moduleFileExtensions: ['js'],
    "moduleNameMapper": {
        "^UserConfig(.*)$": "<rootDir>/userConfig/$1",
    }
};

export default config;
