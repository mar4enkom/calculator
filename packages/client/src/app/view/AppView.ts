import {ConfigEvents, ConfigVariables} from "src/config";
import {AppViewRenderer} from "@/app/view/appViewRenderer/AppViewRenderer";
import {Config} from "@calculator/common";
import {CalculatorView} from "@/calculator/mvc/view/CalculatorView";
import {HistoryView} from "@/history/mvc/view/HistoryView";

interface AppViewConstructorArgs {
    configVariables: ConfigVariables;
    configEvents: ConfigEvents;
    viewService: AppViewRenderer;
    initCalculator(config: Config): CalculatorView;
    initConfig(): void;
    initHistory: () => HistoryView;
}

export class AppView {
    private configVariables: ConfigVariables;
    private configEvents: ConfigEvents;
    private viewRenderer: AppViewRenderer;
    private initCalculator: (config: Config) => CalculatorView;
    private initConfig: () => void;
    private initHistory: () => HistoryView;
    constructor({configVariables, configEvents, initCalculator, viewService, initConfig, initHistory}: AppViewConstructorArgs) {
        this.configVariables = configVariables;
        this.configEvents = configEvents;
        this.viewRenderer = viewService;
        this.initCalculator = initCalculator;
        this.initConfig = initConfig;
        this.initHistory = initHistory;

        this.appWillMount();
        this.appDidMount();
    }

    private appWillMount() {
        this.initConfig();

        const history = this.initHistory();
        this.viewRenderer.renderHistory(history.getHistoryUI());
        this.setupVariablesSubscriptions();
    }

    private appDidMount() {
        this.configEvents.onFetchConfig.dispatch(undefined);
    }

    private setupVariablesSubscriptions(): void {
        this.configVariables.value.subscribe((config) => {
            const calculatorElement = config
                ? this.initCalculator(config).getAppElement()
                : undefined;
            this.viewRenderer.renderCalculator(calculatorElement);
        });

        this.configVariables.loading.subscribe(this.viewRenderer.renderCalculatorLoader);
        this.configVariables.error.subscribe(this.viewRenderer.renderCalculatorErrorIndicator);
    }
}