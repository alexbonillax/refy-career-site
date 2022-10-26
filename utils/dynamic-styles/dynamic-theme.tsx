export const DynamicTheme = (theme: boolean) => {
    let bodyStyles = document.body.style;
    bodyStyles.setProperty('--background-theme', theme? '#212121' : 'white');
    bodyStyles.setProperty('--background-grey-theme', theme? '#212121' : '#FAFAFA');
    bodyStyles.setProperty('--background-loading-theme', theme? 'linear-gradient(110deg, #656565 8%, #3e3e3e 18%, #656565 33%)' : 'linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%)');
    bodyStyles.setProperty('--color-theme', theme? 'white' : '#000');
    bodyStyles.setProperty('--color-grey-1000-theme', theme? 'white' : '#212121');
    bodyStyles.setProperty('--color-icon-grey-theme', theme? 'white' : '#929FAD');
    bodyStyles.setProperty('--title-color-theme', theme? 'white' : '#133273');
    bodyStyles.setProperty('--body-color-theme', theme? 'white' : '#93939A');
    bodyStyles.setProperty('--prose-color-theme', theme? 'white' : '#3b3b3b');
    bodyStyles.setProperty('--border-theme', theme? '#484848' : '#eeeef0');
    bodyStyles.setProperty('--badge-bg-theme', theme? 'white' : '#E4E7EA');
}