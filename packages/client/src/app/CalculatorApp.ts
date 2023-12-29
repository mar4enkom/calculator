import {bindKeyboardListener} from "./utils/bindKeyboardListener";
import {CalculatorModel} from "../calculateExpression/mvc/model/CalculatorModel";
import {CalculateEvents} from "../calculateExpression/mvc/calculateEvents";
import {UserConfigModel} from "../userConfig/mvc/model";
import {UserConfigEvents} from "../userConfig/mvc/userConfigEvents";
import {ViewRenderer} from "./ViewRenderer";
import CalculatorBoxSpinner from "viewService/helpers/ui/spinner/CalculatorBoxSpinner/CalculatorBoxSpinner";

export class CalculatorApp {
    private viewRenderer: ViewRenderer | undefined;
    private calculatorModel: CalculatorModel;
    private userConfigModel: UserConfigModel;

    constructor(
        calculatorModel: CalculatorModel,
        userConfigModel: UserConfigModel
    ) {
        this.calculatorModel = calculatorModel;
        this.userConfigModel = userConfigModel;

        this.userConfigModel.subscribe(UserConfigEvents.USER_CONFIG_UPDATED, (config) => {
            if(config) {
                this.viewRenderer = new ViewRenderer(this.calculatorModel, config);
                this.bindEvents();
                this.bindKeyboardListeners();
                this.render(this.viewRenderer.createCalculator());
            }
        });

        this.userConfigModel.subscribe(UserConfigEvents.LOADING_UPDATED, (loading) => {
            if(loading) this.render(CalculatorBoxSpinner);
        });

        this.userConfigModel.fetchUserConfig();
    }

    bindEvents(): void {
        if(this.viewRenderer?.uiKit == null) {
            throw new Error("viewService has not been initialized");
        }
        this.calculatorModel.subscribe<CalculateEvents.RESULT_UPDATED>(
            CalculateEvents.RESULT_UPDATED,
            this.viewRenderer.uiKit.result.render
        );
        this.calculatorModel.subscribe<CalculateEvents.ERRORS_UPDATED>(
            CalculateEvents.ERRORS_UPDATED,
            this.viewRenderer.uiKit.errorsList.render
        );
        this.calculatorModel.subscribe<CalculateEvents.LOADING_UPDATED>(
            CalculateEvents.LOADING_UPDATED,
            () => {console.log("loading...")}
        )
    }

    bindKeyboardListeners(): void {
        if(this.viewRenderer?.uiKit == null) {
            throw new Error("viewService has not been initialized");
        }
        bindKeyboardListener({
            keyName: "Enter",
            root: this.viewRenderer.uiKit.inputElement,
            onKeydown: () => {
                if(this.viewRenderer?.uiKit) {
                    this.calculatorModel.onCalculateExpression(this.viewRenderer.uiKit.getExpression());
                }
            }
        });
    }

    render(element: HTMLElement): void {
        const renderId = "renderId";
        const calculatorWrapper = document.getElementById(renderId);

        if (calculatorWrapper) {
            const parentElement = calculatorWrapper.parentNode;

            if (parentElement) {
                parentElement.removeChild(calculatorWrapper);
            } else {
                throw new Error("No parent element for item")
            }
        }

        element.setAttribute("id", renderId);
        document.getElementById("root")!.appendChild(element);
    }
}
