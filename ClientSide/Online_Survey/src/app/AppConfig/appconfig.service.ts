import { InjectionToken } from "@angular/core";
import { AppConfig } from "./appconfig.interface";
import { environment } from "../../environment/environment";

export const APP_SERVICE = new InjectionToken<AppConfig>('app.config');

export const App_config: AppConfig = {
    apiendpoint : environment.apiendpoints
};