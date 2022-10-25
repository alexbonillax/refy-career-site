export const DynamicTheme = (theme: boolean) => {
    let bodyStyles = document.body.style;
    bodyStyles.setProperty('--background-theme', theme? '#212121' : 'white');
    bodyStyles.setProperty('--background-grey-theme', theme? '#212121' : '#FAFAFA');
    bodyStyles.setProperty('--color-theme', theme? 'white' : '#000');
    bodyStyles.setProperty('--title-color-theme', theme? 'white' : '#133273');
    bodyStyles.setProperty('--body-color-theme', theme? 'white' : '#93939A');
    bodyStyles.setProperty('--prose-color-theme', theme? 'white' : '#3b3b3b');
    bodyStyles.setProperty('--border-theme', theme? '#484848' : '#eeeef0');
    bodyStyles.setProperty('--badge-bg-theme', theme? 'white' : '#E4E7EA');
}