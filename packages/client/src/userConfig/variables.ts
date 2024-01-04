import {ObservableVariable} from "../shared/createEvent/ObservableVariable";
import {UserConfigResponseBody} from "@calculator/common";

export const userConfigLoadingVar = new ObservableVariable<boolean>(false);
export const userConfigValueVar = new ObservableVariable<UserConfigResponseBody | undefined>();
export const userConfigErrorVar = new ObservableVariable<Error | undefined>();
