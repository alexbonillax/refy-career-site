import { CareerStyles } from "../../services/models"
import { DynamicButtons } from "./dynamic-buttons";
import { DynamicFonts } from "./dynamic-fonts"

export const ApplyDynamicStyles = (primaryColor: string, styles?: CareerStyles) => {
    DynamicFonts(styles?.body?.font?.name, styles?.header?.font?.name);
    DynamicButtons(primaryColor, styles?.button);
} 