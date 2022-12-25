import Company from "../services/models/company"

export const SSRCheck = (companyInfo: Company, translations: any) => {
  if (!companyInfo || !companyInfo.careers?.published) {
    return {
      redirect: {
        destination: '/not-found',
        permanent: false,
      },
    }
  }

  return {
    props: {
      _nextI18Next: translations._nextI18Next,
      pageProps: {
        companyInfo,
      }
    }
  }
}