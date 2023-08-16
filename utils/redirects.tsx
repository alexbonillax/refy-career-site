import { SSRConfig } from "next-i18next"
import Company from "../services/models/company"

const props = (companyInfo: Company, translations: SSRConfig) => (
  {
    props: {
      _nextI18Next: translations._nextI18Next,
      pageProps: {
        companyInfo,
      }
    }
  }
)

const redirectNotFound = () => ({
  redirect: {
    destination: '/not-found',
    permanent: false,
  }
})

export const SSRCheck = (companyInfo: Company, translations: SSRConfig) => 
  (!companyInfo || !companyInfo.careers?.published) ? redirectNotFound : props(companyInfo, translations)

export const SSRJobCheck = (companyInfo: Company, translations: any) => 
  (!companyInfo) ? redirectNotFound : props(companyInfo, translations)
