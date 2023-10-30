import {operatorsHighPriority, operatorsLowPriority} from "./configs/operatorsConfig.js";

export const Operations = {
    FUNCTION: "function",
    CONSTANT: "constant",
    SIGN: "sign",
    OPERATOR_HIGH_PRIORITY: "operatorHighPriority",
    OPERATOR_LOW_PRIORITY: "operatorLowPriority"
}

export const OperationPriority = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5
}

export const OperationByPriority = {
    [Operations.CONSTANT]: OperationPriority.ONE,
    [Operations.SIGN]: OperationPriority.TWO,
    [Operations.FUNCTION]: OperationPriority.THREE,
    [Operations.OPERATOR_HIGH_PRIORITY]: OperationPriority.FOUR,
    [Operations.OPERATOR_LOW_PRIORITY]: OperationPriority.FIVE,
}