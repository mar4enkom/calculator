import {CalculatorPlaceholder} from "./CalculatorPlaceholder/CalculatorPlaceholder";
import Spinner from "../../../../shared/ui/Spinner/Spinner";
import ErrorIndicator from "../../../../shared/ui/ErrorIndicator/ErrorIndicator";

export class AppUiKit {
    public loadingIndicator: HTMLElement;
    public errorIndicator: HTMLElement;
    constructor() {
        this.loadingIndicator = this.getLoadingIndicator();
        this.errorIndicator = this.getErrorIndicator();
    }

    private getLoadingIndicator() {
        const placeholder = new CalculatorPlaceholder();
        return placeholder.create({innerContent: Spinner});
    }

    private getErrorIndicator() {
        const placeholder = new CalculatorPlaceholder("danger");
        return placeholder.create({innerContent: ErrorIndicator});
    }
}