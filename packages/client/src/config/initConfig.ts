import {configController} from "@/config/controller/ConfigController";

export function initConfig(): void {
    configController.setupEventsSubscriptions();
}