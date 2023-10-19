export function withValidatedCalc (config) {
    return Object.entries(config).reduce((acc, [configKey, configItem]) => ({
        ...acc,
        [configKey]: {
            ...configItem,
            calc(expr) {
                const validationError = configItem.validate(expr);
                if(validationError instanceof Error) throw validationError;
                return configItem.calc(expr);
            }
        }
    }), {})
}