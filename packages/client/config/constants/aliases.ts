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
        path: "/src/calculatorView"
    },
    calculatorService: {
        signature: "calculatorService",
        path: "/src/CalculatorApiService"
    },
    mvc: {
        signature: "mvc",
        path: "/src/mvc"
    },
}