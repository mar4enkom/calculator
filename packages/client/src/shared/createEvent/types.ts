import {ObservableVariable} from "./ObservableVariable";

export type LoadingObservableVariable = ObservableVariable<boolean>;
export type ErrorObservableVariable<T extends Error = Error> = ObservableVariable<T | undefined>;