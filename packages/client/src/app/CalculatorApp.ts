import {bindKeyboardListener} from "./utils/bindKeyboardListener";
import {CalculatorModel} from "../calculateExpression/mvc/model/CalculatorModel";
import {CalculateEvents} from "../calculateExpression/mvc/calculateEvents";
import {UserConfigModel} from "../userConfig/mvc/model";
import {UserConfigEvents} from "../userConfig/mvc/userConfigEvents";
import {ViewRenderer} from "./ViewRenderer";

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

        this.userConfigModel.fetchUserConfig();

        this.userConfigModel.subscribe(UserConfigEvents.USER_CONFIG_UPDATED, (config) => {
            if(config) {
                this.viewRenderer = new ViewRenderer(this.calculatorModel, config);
                this.bindEvents();
                this.bindKeyboardListeners();
                this.render(this.viewRenderer.createCalculator());
            }
        });

        this.userConfigModel.subscribe(UserConfigEvents.LOADING_UPDATED, (loading) => {
            console.log({loading})
            if(loading) this.render(createLoader());
        });
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

function conditionalRenderer(mainContent: HTMLElement, loaderContent: HTMLElement, root: HTMLElement) {
    const renderId = "renderId";
    const mainContentId = renderId.concat("-MainContent");
    const loaderContentId = renderId.concat("-LoaderContent")
    mainContent.setAttribute("id", mainContentId);
    loaderContent.setAttribute("id", loaderContentId)

    return (isLoading: boolean) => {
        const elementToRemove = isLoading ?
            document.getElementById(mainContentId):
            document.getElementById(loaderContentId);
        const elementToRender = isLoading ? loaderContent : mainContent;

        if(elementToRemove) root.removeChild(elementToRemove);
        root.appendChild(elementToRender)
    }
}

type ConditionalLoadingRendererArgs = Omit<Parameters<typeof conditionalRenderer>, "loaderContent">;
function conditionalLoadingRenderer(mainContent: HTMLElement, root: HTMLElement) {
    //const [mainContent, root] = args;
    const loader = createLoader();

    return conditionalRenderer(mainContent, loader, root);
}

function createLoader() {
    const loader = document.createElement("div")
    loader.textContent = "Loading cond rend...";
    return loader;
}