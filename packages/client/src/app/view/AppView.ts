import {UserConfigEvents, UserConfigVariables} from "@/userConfig";
import {AppViewRenderer} from "@/app/view/appViewRenderer/AppViewRenderer";
import {UserConfigResponseBody} from "@calculator/common";
import {CalculatorView} from "@/calculator/mvc/view/CalculatorView";
import {HistoryView} from "@/history/mvc/view/HistoryView";

interface AppViewConstructorArgs {
    userConfigVariables: UserConfigVariables;
    userConfigEvents: UserConfigEvents;
    viewService: AppViewRenderer;
    initCalculator(userConfig: UserConfigResponseBody): CalculatorView;
    initUserConfig(): void;
    initHistory: () => HistoryView;
}

export class AppView {
    private userConfigVariables: UserConfigVariables;
    private userConfigEvents: UserConfigEvents;
    private viewRenderer: AppViewRenderer;
    private initCalculator: (userConfig: UserConfigResponseBody) => CalculatorView;
    private initUserConfig: () => void;
    private initHistory: () => HistoryView;
    constructor({userConfigVariables, userConfigEvents, initCalculator, viewService, initUserConfig, initHistory}: AppViewConstructorArgs) {
        this.userConfigVariables = userConfigVariables;
        this.userConfigEvents = userConfigEvents;
        this.viewRenderer = viewService;
        this.initCalculator = initCalculator;
        this.initUserConfig = initUserConfig;
        this.initHistory = initHistory;

        this.appWillMount();
        this.appDidMount();
    }

    private appWillMount() {
        this.initUserConfig();

        const history = this.initHistory();
        this.viewRenderer.renderHistory(history.getHistoryUI());
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
            this.viewRenderer.renderCalculator(calculatorElement);
        });

        this.userConfigVariables.loading.subscribe(this.viewRenderer.renderCalculatorLoader);
        this.userConfigVariables.error.subscribe(this.viewRenderer.renderCalculatorErrorIndicator);
    }
}