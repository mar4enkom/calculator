import {AppViewRenderer} from "@/app/view/appViewRenderer/AppViewRenderer";
import {Config} from "@calculator/common";
import {CalculatorView} from "@/calculator/mvc/view/CalculatorView";
import {HistoryView} from "@/history/mvc/view/HistoryView";
import {configEvents, configVariables} from "@/config";

interface AppViewConstructorArgs {
    viewService: AppViewRenderer;
    initCalculator(config: Config): CalculatorView;
    initConfig(): void;
    initHistory: () => HistoryView;
}

export class AppView {
    private viewRenderer: AppViewRenderer;
    private initCalculator: (config: Config) => CalculatorView;
    private initConfig: () => void;
    private initHistory: () => HistoryView;
    constructor({initCalculator, viewService, initConfig, initHistory}: AppViewConstructorArgs) {
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
        configEvents.onFetchConfig.dispatch(undefined);
    }

    private setupVariablesSubscriptions(): void {
        configVariables.value.subscribe((config) => {
            const calculatorElement = config
                ? this.initCalculator(config).getAppElement()
                : undefined;
            this.viewRenderer.renderCalculator(calculatorElement);
        });

        configVariables.loading.subscribe(this.viewRenderer.renderCalculatorLoader);
        configVariables.error.subscribe(this.viewRenderer.renderCalculatorErrorIndicator);
    }
}