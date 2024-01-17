import {ObservableVariable} from "@/shared/helpers/model/ObservableVariable";
import {VariableError} from "@/shared/helpers/model/types";
import {CalculationHistory} from "@calculator/common";

export const historyVariables = {
    showDialog: new ObservableVariable<boolean>(true),
    loading: new ObservableVariable<boolean>(false),
    value: new ObservableVariable<CalculationHistory | undefined>(),
    error: new ObservableVariable<VariableError>(),
    pageNumber: new ObservableVariable<number>(0),
    dialogScrollTop: new ObservableVariable<number>(0),
    hasMore: new ObservableVariable<boolean>(true),
}