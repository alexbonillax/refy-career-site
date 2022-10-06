export const DynamicFonts = (body: string, header: string) => {
    let bodyStyles = document.body.style;
    bodyStyles.setProperty('--header-font-family', header ? header : 'Fira Sans');
    bodyStyles.setProperty('--body-font-family', body ? body : 'Fira Sans');
}