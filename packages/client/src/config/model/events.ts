import {ConfigEvents} from "src/config";
import {AppEvent} from "@/shared/helpers/model/AppEvent";

export const configEvents: ConfigEvents = {
    onFetchConfig: new AppEvent<undefined>()
}
