import {ConfigVariables} from "src/config";
import {ObservableVariable} from "@/shared/helpers/model/ObservableVariable";

export const configVariables: ConfigVariables = {
    value: new ObservableVariable(),
    error: new ObservableVariable(),
    loading: new ObservableVariable(false)
}