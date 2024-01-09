import {AppError} from "@/shared/helpers/error/AppError";
import {ObservableVariable} from "@/shared/helpers/model/ObservableVariable";

export type LoadingObservableVariable = ObservableVariable<boolean>;
export type ErrorObservableVariable = ObservableVariable<AppError | undefined>;