import {initModule} from "./initModule";
import {calculatorEvents} from "./observer/events";
import {calculatorVariables} from "./observer/variables";

initModule();

export {
    calculatorVariables,
    calculatorEvents
}

export * from "./observer/types";