import {ObservableVariable} from "@/shared/helpers/model/ObservableVariable";
import {VariableError} from "@/shared/helpers/model/types";
import {handleUnknownError} from "@/shared/utils/handleUnknownError";

export function handleError(error: unknown, errorVariable: ObservableVariable<VariableError>): void {
    const definedError = handleUnknownError(error);
    errorVariable.setValue(definedError);
}