type AliasName =
    | "viewService"
    | "calculatorService"
    | "mvc";

type Alias = {
    signature: string;
    path: string;
}

export const Aliases: Record<AliasName, Alias> = {
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
}