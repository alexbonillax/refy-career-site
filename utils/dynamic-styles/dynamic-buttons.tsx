import {ButtonStyles} from "../../services/models";

export const DynamicButtons = (primaryColor: string, styles?: ButtonStyles) => {
  let bodyStyles = document.body.style;

  primaryColor = primaryColor ? primaryColor : "#FE6680";
  let filled = styles?.filled ?? true;
  bodyStyles.setProperty('--button-fontColor', filled ? '#FFFFFF' : primaryColor);
  bodyStyles.setProperty('--button-borderColor', filled ? 'transparent' : primaryColor);
  bodyStyles.setProperty('--button-backgroundColor', filled ? primaryColor : 'transparent');

  let roundedCorners = styles?.roundedCorners ? styles.roundedCorners : 0;
  bodyStyles.setProperty('--button-roundedCorners', `${(roundedCorners * 2 / 100)}rem`);
}