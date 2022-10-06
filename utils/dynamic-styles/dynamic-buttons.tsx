import { ButtonStyles } from "../../services/models";

export const DynamicButtons = (primaryColor: string, styles?: ButtonStyles) => {
    let bodyStyles = document.body.style;
    bodyStyles.setProperty('--button-color', primaryColor ? primaryColor : "FE6680");
    bodyStyles.setProperty('--button-filled', !styles?.filled && primaryColor ? primaryColor : 'transparent');
    bodyStyles.setProperty('--button-fontColor', !styles?.filled && primaryColor ? '#fff' : primaryColor);
    bodyStyles.setProperty('--button-roundedCorners', styles?.roundedCorners ? `${(styles.roundedCorners*16/100)}px` : '0.5rem');
}