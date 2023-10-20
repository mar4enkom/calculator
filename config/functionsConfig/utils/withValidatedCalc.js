export function withValidatedCalc (config) {
    return Object.entries(config).reduce((acc, [configKey, configItem]) => ({
        ...acc,
        [configKey]: {
            ...configItem,
            calc(...args) {
                const validationError = configItem.validate(...args);
                if(validationError instanceof Error) throw validationError;
                return configItem.calc(...args);
            }
        }
    }), {})
}