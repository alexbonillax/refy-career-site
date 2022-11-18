import { responsive } from "../../../../utils/responsive";

export const JobRowLoading = () => {
  const { isDesktop } = responsive();
  const desktopLoadingRow = (
    <div className="flex flex-row h-12 p-5 justify-between items-center w-full br-var box-shadow-container--card background-color--white">
      <div className="h-4 w-96  background-loading-gradient"></div>
      <div className="flex space-x-2">
        <div className="h-4 w-20 background-loading-gradient"></div>
        <div className="h-4 w-20 background-loading-gradient"></div>
      </div>
      <div className="h-5 w-16 background-loading-gradient"></div>
    </div>
  );

  const mobileLoadingRow = (
    <div className="flex flex-col h-12 px-3 py-2 justify-between w-full br-var box-shadow-container--card background-color--white">
      <div className="h-2 w-16 background-loading-gradient"></div>
      <div className="h-2 w-3/4  background-loading-gradient"></div>
      <div className="flex space-x-2">
        <div className="h-2 w-20 background-loading-gradient"></div>
        <div className="h-2 w-20 background-loading-gradient"></div>
      </div>
    </div>
  )
  return (
    <>
      {
        isDesktop ? desktopLoadingRow : mobileLoadingRow
      }
    </>
  )
}