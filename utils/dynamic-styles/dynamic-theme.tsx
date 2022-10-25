export const DynamicTheme = (theme: boolean) => {
    let bodyStyles = document.body.style;
    bodyStyles.setProperty('--background-theme', theme? 'rgba(55 65 81)' : 'white');
    bodyStyles.setProperty('--background-grey-theme', theme? 'rgba(55 65 81)' : '#FAFAFA');
    bodyStyles.setProperty('--color-theme', theme? 'white' : '#000');
    bodyStyles.setProperty('--title-color-theme', theme? 'white' : '#133273');
    bodyStyles.setProperty('--body-color-theme', theme? 'white' : '#93939A');
    bodyStyles.setProperty('--prose-color-theme', theme? 'white' : '#3b3b3b');
}