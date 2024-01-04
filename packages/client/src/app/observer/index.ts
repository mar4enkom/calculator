import {userConfigEvents, userConfigVariables} from "../../userConfig";
import {calculatorEvents, calculatorVariables} from "../../calculateExpression";
import {AppEvents, AppVariables} from "./types";

export const variables: AppVariables = {
    ...userConfigVariables,
    ...calculatorVariables
};
export const events: AppEvents = {
    ...userConfigEvents,
    ...calculatorEvents
}
export {AppEvents} from "./types";
export {AppVariables} from "./types";