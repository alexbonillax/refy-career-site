import Company from "../../services/models/company";
import { DynamicButtons } from "./dynamic-buttons";
import { DynamicFonts } from "./dynamic-fonts"
import { DynamicTheme } from "./dynamic-theme";

export const ApplyDynamicStyles = (company: Company) => {
    DynamicFonts(company?.careers?.style?.body?.font?.name, company?.careers?.style?.header?.font?.name);
    DynamicButtons(company?.attributes?.primaryColor, company?.careers?.style?.button);
    DynamicTheme(JSON.parse(localStorage.getItem('darkTheme')) === true);
} 