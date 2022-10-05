import { CareerStyles } from "../../services/models"
import { DynamicFontsVars } from "./dynamic-fonts"

export const ApplyDynamicStyles = (styles?: CareerStyles) => {
    DynamicFontsVars(styles?.body?.font?.name, styles?.header?.font?.name);
} 