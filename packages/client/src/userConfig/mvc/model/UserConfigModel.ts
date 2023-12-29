import {Observable} from "./helpers/Observable";
import {ErrorBody, Maybe, UserConfigResponseBody} from "@calculator/common";
import {UserConfigEvents} from "../userConfigEvents";

interface MvcObservable {
    fetchUserConfig: undefined;
    errorsUpdated: Maybe<ErrorBody>;
    userConfigUpdated: Maybe<UserConfigResponseBody>
    loadingUpdated: boolean;
}

export class UserConfigModel extends Observable<MvcObservable> {
    //TODO: set default values in constructor
    private _userConfig: Maybe<UserConfigResponseBody>;
    private _errors: Maybe<ErrorBody>;
    private _loading: Maybe<boolean>;
    fetchUserConfig(): void {
        this.notify(UserConfigEvents.FETCH_USER_CONFIG, undefined);
    }
    getUserConfig(): Maybe<UserConfigResponseBody> {
        return this._userConfig;
    }
    setUserConfig(result: UserConfigResponseBody): void {
        this._userConfig = result;
        this._errors = undefined;
        this.notify(UserConfigEvents.USER_CONFIG_UPDATED, result);
        this.notify(UserConfigEvents.ERRORS_UPDATED, undefined);
    }
    getErrors(): Maybe<ErrorBody> {
        return this._errors;
    }
    setErrors(errors: ErrorBody): void {
        this._errors = errors;
        this._userConfig = undefined;
        this.notify(UserConfigEvents.ERRORS_UPDATED, errors);
        this.notify(UserConfigEvents.USER_CONFIG_UPDATED, null);
    }
    getIsLoading(): Maybe<boolean> {
        return this._loading;
    }
    setIsLoading(isLoading: boolean): void {
        console.log("Loading set", isLoading);
        this._loading = isLoading;
        this.notify(UserConfigEvents.LOADING_UPDATED, isLoading);
    }
}