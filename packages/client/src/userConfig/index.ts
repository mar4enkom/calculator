import {userConfigVariables} from "./observer/variables";
import {userConfigEvents} from "./observer/events";
import {initModule} from "./initModule";

initModule();

export {
    userConfigVariables,
    userConfigEvents,
}

export * from "./observer/types";