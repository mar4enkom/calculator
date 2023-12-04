import {Aliases} from "./config/constants/aliases.js";

const config = {
    testEnvironment: 'jsdom',
    testMatch: ['**/*.test.js'],
    testPathIgnorePatterns: ['/node_modules/'],
    moduleFileExtensions: ['js'],
    "moduleNameMapper": {
        [`^${Aliases.userConfig.signature}(.*)$`]: `<rootDir>${Aliases.userConfig.path}/$1`,
        [`^${Aliases.calculator.signature}(.*)$`]: `<rootDir>${Aliases.calculator.path}/$1`,
        [`^${Aliases.shared.signature}(.*)$`]: `<rootDir>${Aliases.shared.path}/$1`,
        [`^${Aliases.calculatorService.signature}(.*)$`]: `<rootDir>${Aliases.calculatorService.path}/$1`,
    }
};

export default config;
