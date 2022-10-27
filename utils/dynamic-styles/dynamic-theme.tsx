export const DynamicTheme = (darkTheme: boolean) => {
  let bodyStyles = document.body.style;
  bodyStyles.setProperty('--refy-black', darkTheme ? '#FFF' : '#000');
  bodyStyles.setProperty('--refy-white', darkTheme ? '#16181C' : '#FFF');
  bodyStyles.setProperty('--refy-backdrop', darkTheme ? '#FFFFFF52' : '#00000052');
  bodyStyles.setProperty('--refy-blue', darkTheme ? '#FFF' : '#133273');
  bodyStyles.setProperty('--refy-placeholder', darkTheme ? '#B3B3B8' : '#B3B3B8');
  bodyStyles.setProperty('--refy-grey', darkTheme ? '#FFF' : '#929FAD');
  bodyStyles.setProperty('--refy-text-grey', darkTheme ? '#FFF' : '#93939A');
  bodyStyles.setProperty('--refy-text-contrast-grey', darkTheme ? '#FFF' : '#576064');
  bodyStyles.setProperty('--refy-grey-1000', darkTheme ? '#FFF' : '#212121');
  bodyStyles.setProperty('--refy-grey-900', darkTheme ? '#FFF' : '#3b3b3b');
  bodyStyles.setProperty('--refy-grey-800', darkTheme ? '#FFF' : '#939FAD');
  bodyStyles.setProperty('--refy-grey-400', darkTheme ? '#FFF' : '#a8adb3');
  bodyStyles.setProperty('--refy-grey-300', darkTheme ? '#FFF' : '#93939A');
  bodyStyles.setProperty('--refy-grey-200', darkTheme ? '#5A5A5A' : '#cbcbcb');
  bodyStyles.setProperty('--refy-grey-100', darkTheme ? '#484848' : '#eeeef0');
  bodyStyles.setProperty('--refy-grey-50', darkTheme ? '#404040' : '#F3F3F5');
  bodyStyles.setProperty('--refy-grey-0', darkTheme ? '#393939' : '#FAFAFA');
  bodyStyles.setProperty('--refy-grey-blue', darkTheme ? '#000000' : '#f5f6fa');
}