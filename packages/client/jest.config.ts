import type { Config } from '@jest/types';
import { Aliases } from './config/constants/aliases';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['<rootDir>/src/**/*.test.(js|ts)'],
    testPathIgnorePatterns: ['/node_modules/'],
    moduleFileExtensions: ['js', 'ts'],
    moduleDirectories: ['node_modules'],
    coveragePathIgnorePatterns: ['\\\\node_modules\\\\'],
    modulePaths: ['<rootDir>src',],
    moduleNameMapper: {
        [`^${Aliases.mvc.signature}(.*)$`]: `<rootDir>${Aliases.mvc.path}/$1`,
        [`^${Aliases.calculatorService.signature}(.*)$`]: `<rootDir>${Aliases.calculatorService.path}/$1`,
        [`^${Aliases.viewService.signature}(.*)$`]: `<rootDir>${Aliases.viewService.path}/$1`,
    },
};

export default config;
