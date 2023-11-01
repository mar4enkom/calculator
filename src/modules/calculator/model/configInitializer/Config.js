import {ConfigInitializer} from "./ConfigInitializer.js";
import {operationsConfig} from "../../../../../userConfig/operations/index.js";

export class Config {
    static _configurations = new Map();

    constructor(config) {
        if (Config._configurations.has(config)) {
            return Config._configurations.get(config);
        }
        this.config = ConfigInitializer.getInstance().init(config);
        Config._configurations.set(config, this);
    }

    getConfig() {
        return this.config;
    }
}
