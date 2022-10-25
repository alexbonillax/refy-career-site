import { CareerStyles } from "../../services/models"
import { DynamicButtons } from "./dynamic-buttons";
import { DynamicFonts } from "./dynamic-fonts"
import { DynamicTheme } from "./dynamic-theme";

export const ApplyDynamicStyles = (primaryColor: string, styles?: CareerStyles) => {
    DynamicFonts(styles?.body?.font?.name, styles?.header?.font?.name);
    DynamicButtons(primaryColor, styles?.button);
    localStorage.getItem('darkTheme') != null && DynamicTheme(JSON.parse(localStorage.getItem('darkTheme')) === true);
} 