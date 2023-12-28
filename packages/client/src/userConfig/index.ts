import {UserConfigModel} from "./mvc/model";
import {UserConfigFetcher} from "./domain/UserConfigAccessor/UserConfigFetcher";
import UserConfigApiService from "./api/UserConfigApiService/UserConfigApiService";
import {UserConfigController} from "./mvc/controller";

export const userConfigModel = new UserConfigModel();
const userConfigFetcher = new UserConfigFetcher(UserConfigApiService);

new UserConfigController(userConfigModel, userConfigFetcher);