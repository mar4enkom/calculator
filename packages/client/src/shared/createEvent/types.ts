import {ObservableVariable} from "./ObservableVariable";
import {AppError} from "../helpers/AppError";

export type LoadingObservableVariable = ObservableVariable<boolean>;
export type ErrorObservableVariable = ObservableVariable<AppError | undefined>;