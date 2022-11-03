export const isReferralCode = (code: string) => {
    return /[a-zA-Z]/.test(code);
}