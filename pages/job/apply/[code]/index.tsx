import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextPage } from 'next';
import { Header } from '../../../../components/header';
import { AboutCompany } from '../../../../components';
import { getCompanyInfo } from '../../../../services';
import { getApplyJob } from '../../../../services/getApplyJob';
import { ChangeEventHandler, FormEvent, useState } from 'react';
import { bucketM, bucketXL } from '../../../../services/urls';
import { Company, Job } from '../../../../services/models';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faScreenUsers } from '@fortawesome/pro-regular-svg-icons';

const Apply: NextPage = ({ pageProps }: any) => (
  <>
    <Header name={pageProps.companyInfo.attributes.name} />
    <div className="pt-9">
      <ApplyJobForm applyJob={pageProps.applyJob} companyInfo={pageProps.companyInfo} />
      <AboutCompany {...pageProps.companyInfo} />
    </div>
  </>
);

const ApplyJobForm = ({applyJob, companyInfo}: {applyJob: Job, companyInfo: Company}) => {
  const [formFields, setFormFields] = useState({ file: '', firstName: '', secondName: '', email: '', phone: '', coverLetter: '', agree: false });
  const handleValueChange = (event: any): void => setFormFields({...formFields, [event.target.id]: event.target.value});
  const handleCheckChange = (event: any): void => setFormFields({...formFields, [event.target.id]: event.target.checked});
  return (
    <form className='flex flex-column' onSubmit={event => onSubmit(event, formFields)}>
      <ApplyHeader applyJob={applyJob} companyInfo={companyInfo}/>
      <Resume {...{ formFields, handleValueChange }} />
      <FirstName {...{ formFields, handleValueChange }} />
      <SecondName {...{ formFields, handleValueChange }} />
      <Email {...{ formFields, handleValueChange }} />
      <Phone {...{ formFields, handleValueChange }} />
      <CoverLetter {...{ formFields, handleValueChange }} />
      <Agree {...{ formFields, handleCheckChange }} />
      <input type="submit" value="Submit" />
    </form>
  );
};

const ApplyHeader = ({applyJob, companyInfo}: {applyJob: Job, companyInfo: Company}) => {
  const picUrl = applyJob.attributes.picture ? bucketXL + applyJob.attributes.picture : false;
  const logoUrl = companyInfo.attributes.logo ? bucketM + companyInfo.attributes.logo : false;
  return(
  <div className="flex-align-center">
  <div className="flex-column full-width background-center" style={{ backgroundImage: picUrl ? `url(${picUrl})` : '' }}>
    <div className="flex flex-align-justify-center h-8 full-width" style={{ backgroundColor: `${companyInfo.attributes.primaryColor}` }}>
      <div className="w-5 h-5 rounded-md bg-contain" style={{ backgroundImage: logoUrl ? `url(${logoUrl})` : '' }}></div>

    </div>
    <div className="flex-column flex-align-justify-center py-10 full-width background-color--blurr-dark">
      <p className="font-big-title font-big-title--26 font--white">{ applyJob.attributes.title }</p>
      <div className="flex flex-wrap flex-justify-center mb-1">
        { applyJob.department &&
          <p className="flex flex-align-center font-hint font--white mr-3">
            <FontAwesomeIcon icon={faScreenUsers} className="mr-1" />
            { applyJob.department.attributes.name }
          </p>
        }
        {
          applyJob.workplaces[0] &&
          <p className="flex flex-align-center font-hint font--white mr-3">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />
            { applyJob.workplaces[0].attributes.areaName }
          </p>
        }
      </div>
    </div>
  </div>
</div>
  )
}

const Resume = ({ formFields, handleValueChange }: { formFields: any, handleValueChange: ChangeEventHandler<HTMLInputElement> }) => (
  <label>
    Upload your resume here *
    <input required id="file" type="file" value={formFields.file} onChange={handleValueChange} />
  </label>
);

const FirstName = ({ formFields, handleValueChange }: { formFields: any, handleValueChange: ChangeEventHandler<HTMLInputElement> }) => (
  <label>
    First name *
    <input
      type="text"
      id="firstName"
      required
      value={formFields.firstName}
      onChange={handleValueChange}
      minLength={2}
      maxLength={50} />
  </label>
);

const SecondName = ({ formFields, handleValueChange }: { formFields: any, handleValueChange: ChangeEventHandler<HTMLInputElement> }) => (
  <label>
    Second name *
    <input
      type="text"
      id="secondName"
      required
      value={formFields.secondName}
      onChange={handleValueChange}
      minLength={2}
      maxLength={50} />
  </label>
)

const Email = ({ formFields, handleValueChange }: { formFields: any, handleValueChange: ChangeEventHandler<HTMLInputElement> }) => {
  return (
    <label>
      Email *
      <input 
        type="email" 
        id="email"
        autoComplete="email" 
        name="email" 
        required
        value={formFields.email} 
        onChange={handleValueChange} />
    </label>
  )
}

const Phone = ({ formFields, handleValueChange }: { formFields: any, handleValueChange: ChangeEventHandler<HTMLInputElement> }) => {
  return (
    <label>
      Phone *
      <input 
        type="phone" 
        id="phone"
        autoComplete="phone" 
        name="phone" 
        required
        value={formFields.phone} 
        onChange={handleValueChange} />
    </label>
  )

}
const CoverLetter = ({ formFields, handleValueChange }: { formFields: any, handleValueChange: ChangeEventHandler<HTMLTextAreaElement> }) => {
  return (
    <label>
      Cover Letter *
      <textarea 
        id="coverLetter"
        autoComplete="cover letter" 
        name="cover letter" 
        required
        value={formFields.coverLetter} 
        onChange={handleValueChange} />
    </label>
  )
}

const Agree = ({ formFields, handleCheckChange }: { formFields: any, handleCheckChange: ChangeEventHandler<HTMLInputElement> }) => {
  return (
    <label>
      I agree to the privacy policy
      <input
        id="agree"
        name="agree"
        type="checkbox"
        required
        checked={formFields.agree}
        onChange={handleCheckChange} />
    </label>
  )
}

const onSubmit = (e: FormEvent, formFields: any) => {
  e.preventDefault() // Prevent the redirect
  console.log(formFields);
}

export const getServerSideProps = async ({ locale, params }: { locale: string, params: any }) => {
  const code = params.code;
  const translations = await serverSideTranslations(locale, ["common", "home"]);
  const companyInfo = await getCompanyInfo();
  const applyJob = await getApplyJob(code);
  return {
    props: {
      _nextI18Next: translations._nextI18Next,
      pageProps: {
        companyInfo,
        applyJob
      }
    }
  };
};

export default Apply