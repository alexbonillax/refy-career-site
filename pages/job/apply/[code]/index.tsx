// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// import { NextPage } from 'next';
// import { Header } from '../../../../components/header';
// import { AboutCompany } from '../../../../components';
// import { getCompanyInfo } from '../../../../services';
// import { getApplyJob } from '../../../../services/getApplyJob';
// import { ChangeEventHandler, FormEvent, useState } from 'react';
// import { bucketM, bucketXL } from '../../../../services/urls';
// import { Company, Job } from '../../../../services/models';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCheck, faFileUpload, faMapMarkerAlt, faScreenUsers, faSpinner, faTrash, faXmark } from '@fortawesome/pro-regular-svg-icons';
// import 'react-phone-number-input/style.css'
// import PhoneInput from 'react-phone-number-input'
// import { debounce } from '@mui/material';

// const Apply: NextPage = ({ pageProps }: any) => (
//   <>
//     <Header name={pageProps.companyInfo.attributes.name} />
//     <div>
//       <section id="apply-job" className="background-color--grey--0 py-10">
//         <div className="mobile-container mobile:px-3 desktop:px-1">
//           <div className="box-shadow-container--card background-color--white br-1 overflow-hidden pb-6">
//             <ApplyJobForm applyJob={pageProps.applyJob} companyInfo={pageProps.companyInfo} />
//           </div>
//         </div>
//       </section>
//       <AboutCompany {...pageProps.companyInfo} />
//     </div>
//   </>
// );

// const ApplyJobForm = ({ applyJob, companyInfo }: { applyJob: Job, companyInfo: Company }) => {
//   const [formFields, setFormFields] = useState({ file: '', firstName: '', lastName: '', email: '', phone: '', coverLetter: '', agree: false });
//   const handleValueChange = (event: any): void => setFormFields({ ...formFields, [event.target.id]: event.target.value });
//   const handleCheckChange = (event: any): void => setFormFields({ ...formFields, [event.target.id]: event.target.checked });
//   const addFile = (file: any) => setFormFields({ ...formFields, file });
//   const deleteFile = () => setFormFields({ ...formFields, file: '' });
//   return (
//     <form className='flex flex-column' onSubmit={event => onSubmit(event, formFields)}>
//       <ApplyHeader applyJob={applyJob} companyInfo={companyInfo} />
//       <div className='px-2 py-1 flex flex-column'>
//         <Refier {...{ applyJob }} />
//         <Resume {...{ formFields, addFile, deleteFile }} />
//         <FirstName {...{ formFields, handleValueChange }} />
//         <SecondName {...{ formFields, handleValueChange }} />
//         <Email {...{ formFields, handleValueChange }} />
//         <Phone {...{ formFields, setFormFields }} />
//         <CoverLetter {...{ formFields, handleValueChange }} />
//         <Agree {...{ formFields, handleCheckChange }} />
//         <input type="submit" value="Submit" />
//       </div>
//     </form>
//   );
// };

// const Resume = ({ formFields, addFile, deleteFile }: { formFields: any, addFile: any, deleteFile: any }) => (
//   <>
//     <SectionHeader number={1} title="candidate-job.resume-info" />
//     <div className="upload-box flex-row flex-align-justify-center">
//       {
//         !formFields.file &&
//         <>
//           <FontAwesomeIcon icon={faFileUpload} className="mr-1" />
//           <p className="font-hint">{'candidate-job.upload-resume'} *</p>
//           <input required id="file" type="file" value={formFields.file} onChange={addFile} />
//         </>
//       }
//       {
//         formFields.file &&
//         <>
//           <p className="font-hint mr-2">{formFields.file.target.files[0].name}</p>
//           <FontAwesomeIcon icon={faTrash} className="cursor-pointer mr-1" onClick={deleteFile} />
//         </>
//       }

//     </div>
//   </>
// );

// const Refier = ({ applyJob }: { applyJob: Job }) => {
//   const logoUrl = applyJob.referrerUser.attributes.avatar ? bucketM + applyJob.referrerUser.attributes.avatar : false;
//   return (
//     <div className="flex-column py-1">
//       <div className="flex flex-align-center mb-1">
//         <p className="font-subtitle">{'candidate-job.contact company.attributes.name'}</p>
//       </div>
//       <div className="flex flex-align-center border border--grey-100 br-1 p-2 my-1">
//         <div className="w-6 h-6 rounded-lg bg-cover bg-center" style={{ backgroundImage: logoUrl ? `url(${logoUrl})` : '' }}></div>
//         <div className="flex-column ml-2">
//           <p className="font-title">{applyJob.referrerUser.attributes.firstName} {applyJob.referrerUser.attributes.lastName}</p>
//           <p className="font-hint">{applyJob.referrerUser.attributes.headline}</p>
//         </div>
//       </div>

//     </div>
//   )
// }

// const ApplyHeader = ({ applyJob, companyInfo }: { applyJob: Job, companyInfo: Company }) => {
//   const picUrl = applyJob.attributes.picture ? bucketXL + applyJob.attributes.picture : false;
//   const logoUrl = companyInfo.attributes.logo ? bucketM + companyInfo.attributes.logo : false;
//   return (
//     <div className="flex-align-center">
//       <div className="flex-column full-width background-center" style={{ backgroundImage: picUrl ? `url(${picUrl})` : '' }}>
//         <div className="flex flex-align-justify-center h-8 full-width" style={{ backgroundColor: `${companyInfo.attributes.primaryColor}` }}>
//           <div className="w-5 h-5 rounded-md bg-contain" style={{ backgroundImage: logoUrl ? `url(${logoUrl})` : '' }}></div>

//         </div>
//         <div className="flex-column flex-align-justify-center py-10 full-width background-color--blurr-dark">
//           <p className="font-big-title font-big-title--26 font--white">{applyJob.attributes.title}</p>
//           <div className="flex flex-wrap flex-justify-center mb-1">
//             {applyJob.department &&
//               <p className="flex flex-align-center font-hint font--white mr-3">
//                 <FontAwesomeIcon icon={faScreenUsers} className="mr-1" />
//                 {applyJob.department.attributes.name}
//               </p>
//             }
//             {
//               applyJob.workplaces[0] &&
//               <p className="flex flex-align-center font-hint font--white mr-3">
//                 <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />
//                 {applyJob.workplaces[0].attributes.areaName}
//               </p>
//             }
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// const SectionHeader = ({ number, title }: { number: number, title: string }) => (
//   <div className="flex flex-align-center mb-1">
//     <p className="w-3 h-3 br-2 flex flex-align-justify-center font-hint font--white background-color--grey mr-1">{number}</p>
//     <p className="font-subtitle">{title}</p>
//   </div>
// )

// const FirstName = ({ formFields, handleValueChange }: { formFields: any, handleValueChange: ChangeEventHandler<HTMLInputElement> }) => (
//   <>
//     <SectionHeader number={2} title="candidate-job.personal-info" />
//     <div className='form-input my-2'>
//       <label>First name *</label>
//       <input
//         type="text"
//         id="firstName"
//         required
//         value={formFields.firstName}
//         onChange={handleValueChange}
//         minLength={2}
//         maxLength={50} />
//     </div>
//   </>
// );

// const SecondName = ({ formFields, handleValueChange }: { formFields: any, handleValueChange: ChangeEventHandler<HTMLInputElement> }) => (
//   <div className='form-input my-2'>
//     <label>Last name *</label>
//     <input
//       type="text"
//       id="lastName"
//       required
//       value={formFields.secondName}
//       onChange={handleValueChange}
//       minLength={2}
//       maxLength={50} />
//   </div>
// )

// const Email = ({ formFields }: { formFields: any }) => {
//   enum EmailStatus {
//     NO_SEARCH,
//     SEARCHING,
//     WRONG,
//     CORRECT,
//   }
//   const [emailStatus, setEmailStatus] = useState(EmailStatus.NO_SEARCH);
//   const emailVerifier = (event: any): void => {
//     console.log(debounce(event, 500));
//   }
//   return (
//     <>
//       <SectionHeader number={3} title="candidate-job.contact-info" />
//       <div className='form-input my-2'>
//         <label>Email *</label>
//         <input
//           type="email"
//           id="email"
//           autoComplete="email"
//           name="email"
//           required
//           onChange={emailVerifier} />
//           { emailStatus === EmailStatus.SEARCHING && <FontAwesomeIcon icon={faSpinner} className="icon-font fa-pulse"/> }
//           { emailStatus === EmailStatus.WRONG && <FontAwesomeIcon icon={faXmark} className="icon-font icon-font--red"/> }
//           { emailStatus === EmailStatus.CORRECT && <FontAwesomeIcon icon={faCheck} className="icon-font icon-font--green" /> }
//       </div>
//     </>
//   )
// }




// const Phone = ({ formFields, setFormFields }: { formFields: any, setFormFields: any }) => (
//   <div className='form-input my-2'>
//     <label>Phone *</label>
//     <PhoneInput
//       placeholder="Enter phone number"
//       defaultCountry='ES'
//       type="phone"
//       id="phone"
//       autoComplete="phone"
//       name="phone"
//       required
//       value={formFields.phone}
//       onChange={value => setFormFields({ ...formFields, phone: value })} />
//   </div>
// )

// const CoverLetter = ({ formFields, handleValueChange }: { formFields: any, handleValueChange: ChangeEventHandler<HTMLTextAreaElement> }) => {
//   return (
//     <>
//       <SectionHeader number={4} title="candidate-job.questions-info" />
//       <div className='form-input my-2'>
//         <label>Cover Letter *</label>
//         <textarea
//           id="coverLetter"
//           autoComplete="cover letter"
//           name="cover letter"
//           required
//           rows={4}
//           value={formFields.coverLetter}
//           onChange={handleValueChange} />
//       </div>
//     </>
//   )
// }

// const Agree = ({ formFields, handleCheckChange }: { formFields: any, handleCheckChange: ChangeEventHandler<HTMLInputElement> }) => {
//   return (
//     <div>
//       <input
//         id="agree"
//         name="agree"
//         type="checkbox"
//         required
//         checked={formFields.agree}
//         onChange={handleCheckChange} />
//       <label>I agree to the privacy policy</label>
//     </div>
//   )
// }

// const onSubmit = (e: FormEvent, formFields: any) => {
//   e.preventDefault() // Prevent the redirect
//   console.log(formFields);
// }

// export const getServerSideProps = async ({ locale, params }: { locale: string, params: any }) => {
//   const code = params.code;
//   const translations = await serverSideTranslations(locale, ["common", "home"]);
//   const companyInfo = await getCompanyInfo();
//   const applyJob = await getApplyJob(code);
//   return {
//     props: {
//       _nextI18Next: translations._nextI18Next,
//       pageProps: {
//         companyInfo,
//         applyJob
//       }
//     }
//   };
// };

// export default Apply