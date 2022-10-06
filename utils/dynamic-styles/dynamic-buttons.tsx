import { ButtonStyles } from "../../services/models";

export const DynamicButtons = (primaryColor = "FE6680", styles: ButtonStyles) => {
    let bodyStyles = document.body.style;
    bodyStyles.setProperty('--button-color', primaryColor );
    bodyStyles.setProperty('--button-filled', styles?.filled ? primaryColor : 'transparent');
    bodyStyles.setProperty('--button-floating-filled', styles?.filled ? primaryColor : '#fff');
    bodyStyles.setProperty('--button-fontColor', styles?.filled ? '#fff' : primaryColor);
    bodyStyles.setProperty('--button-roundedCorners', typeof styles?.roundedCorners == "number" ? `${(styles.roundedCorners*2/100)}rem` : '0.5rem');
}