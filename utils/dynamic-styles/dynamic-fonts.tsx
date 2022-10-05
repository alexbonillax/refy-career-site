export const DynamicFontsVars = (body: string, header: string) => {
    let bodyStyles = document.body.style;
    bodyStyles.setProperty('--title-font-family', header ? header : 'Fira Sans');
    bodyStyles.setProperty('--body-font-family', body ? body : 'Fira Sans');
}