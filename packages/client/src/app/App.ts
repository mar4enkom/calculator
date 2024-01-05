import {UserConfigEvents, UserConfigVariables} from "../userConfig";
import {UserConfigResponseBody} from "@calculator/common";
import {Calculator} from "../calculator/calculator/Calculator";
import {AppViewService} from "./view/AppViewService";
import {History} from "../history/history/History";

interface AppConstructorArgs {
    userConfigVariables: UserConfigVariables;
    userConfigEvents: UserConfigEvents;
    viewService: AppViewService;
    initCalculator(userConfig: UserConfigResponseBody): Calculator;
    initUserConfig(): void;
    initHistory: () => History;
}

export class App {
    private userConfigVariables: UserConfigVariables;
    private userConfigEvents: UserConfigEvents;
    private viewService: AppViewService;
    private initCalculator: (userConfig: UserConfigResponseBody) => Calculator;
    private initUserConfig: () => void;
    private initHistory: () => History;
    constructor({userConfigVariables, userConfigEvents, initCalculator, viewService, initUserConfig, initHistory}: AppConstructorArgs) {
        this.userConfigVariables = userConfigVariables;
        this.userConfigEvents = userConfigEvents;
        this.viewService = viewService;
        this.initCalculator = initCalculator;
        this.initUserConfig = initUserConfig;
        this.initHistory = initHistory;

        this.appWillMount();
        this.appDidMount();
    }

    private appWillMount() {
        this.initUserConfig();

        const history = this.initHistory();
        this.viewService.renderHistory(history.getHistoryUI());
        this.setupVariablesSubscriptions();
    }

    private appDidMount() {
        this.userConfigEvents.onFetchUserConfig.dispatch(undefined);
    }

    private setupVariablesSubscriptions(): void {
        this.userConfigVariables.value.subscribe((config) => {
            const calculatorElement = config
                ? this.initCalculator(config).getAppElement()
                : undefined;
            this.viewService.renderCalculator(calculatorElement);
        });

        this.userConfigVariables.loading.subscribe(this.viewService.renderCalculatorLoader);
        this.userConfigVariables.error.subscribe(this.viewService.renderCalculatorErrorIndicator);
    }
}