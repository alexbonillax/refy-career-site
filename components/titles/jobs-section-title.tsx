import { useTranslation } from "next-i18next";
import Company from "../../services/models/company"

export const JobsSectionTitle = (company: Company) => {
  const { t } = useTranslation("common");

  return (
    <>
      <h2 className="font-big-title text-center">{company.careers.jobs?.title || t('jobs.available')}</h2>
      <p className="font-subtitle text-center my-2 mb-5">{company.careers.jobs?.subtitle || t('jobs.find', { company: company.attributes.name })}</p>
    </>
  )
}