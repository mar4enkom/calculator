import {ConfigController} from "@/config/controller/ConfigController";
import {configVariables} from "@/config/model/variables";
import {configEvents} from "@/config/model/events";
import {configApiService} from "@/config/api/ConfigApiService/ConfigApiService";

export function initConfig(): void {
    const configController = new ConfigController(configVariables, configEvents, configApiService);
    configController.setupEventsSubscriptions();
}