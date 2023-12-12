type AliasName =
    | "userConfig"
    | "viewService"
    | "calculatorService"
    | "mvc"
    | "shared";

type Alias = {
    signature: string;
    path: string;
}

export const Aliases: Record<AliasName, Alias> = {
    userConfig: {
        signature: "userConfig",
        path: "/userConfig",
    },
    viewService: {
        signature: "viewService",
        path: "/src/CalculatorViewService"
    },
    calculatorService: {
        signature: "calculatorService",
        path: "/src/ExpressionCalculator"
    },
    mvc: {
        signature: "mvc",
        path: "/src/mvc"
    },
    shared: {
        signature: "shared",
        path: "/src/shared"
    },
}