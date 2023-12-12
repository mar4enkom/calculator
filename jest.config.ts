import type { Config } from '@jest/types';
import { Aliases } from './config/constants/aliases';

const config: Config.InitialOptions = {
    testEnvironment: 'jsdom',
    testMatch: ['**/*.test.ts'],
    testPathIgnorePatterns: ['/node_modules/'],
    moduleFileExtensions: ['ts'],
    moduleNameMapper: {
        [`^${Aliases.userConfig.signature}(.*)$`]: `<rootDir>${Aliases.userConfig.path}/$1`,
        [`^${Aliases.mvc.signature}(.*)$`]: `<rootDir>${Aliases.mvc.path}/$1`,
        [`^${Aliases.shared.signature}(.*)$`]: `<rootDir>${Aliases.shared.path}/$1`,
        [`^${Aliases.calculatorService.signature}(.*)$`]: `<rootDir>${Aliases.calculatorService.path}/$1`,
        [`^${Aliases.viewService.signature}(.*)$`]: `<rootDir>${Aliases.viewService.path}/$1`,
    },
};

export default config;
