import {Aliases} from "./config/constants/aliases.js";

const config = {
    testEnvironment: 'jsdom',
    testMatch: ['**/*.test.js'],
    testPathIgnorePatterns: ['/node_modules/'],
    moduleFileExtensions: ['js'],
    "moduleNameMapper": {
        [`^${Aliases.userConfig.signature}(.*)$`]: `<rootDir>${Aliases.userConfig.path}/$1`,
        [`^${Aliases.mvc.signature}(.*)$`]: `<rootDir>${Aliases.mvc.path}/$1`,
        [`^${Aliases.shared.signature}(.*)$`]: `<rootDir>${Aliases.shared.path}/$1`,
        [`^${Aliases.calculatorService.signature}(.*)$`]: `<rootDir>${Aliases.calculatorService.path}/$1`,
        [`^${Aliases.viewService.signature}(.*)$`]: `<rootDir>${Aliases.viewService.path}/$1`,
    }
};

export default config;
