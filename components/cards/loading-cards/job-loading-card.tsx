export const JobCardLoading = () => (
    <div className="w-full flex-column box-shadow-container--card br-var background-theme">
      <div className="h-30 flex-column flex-justify-between py-2 px-2 background-loading-gradient br-var"></div>
  
      <div className="flex-column p-3">
        <div className="h-8 flex">
          <div className="h-3 full-width background-loading-gradient"></div>
        </div>
      </div>
  
      <div className="flex flex-align-justify-center space-x-8 pt-1 pb-3">
        <div className="flex">
          <div className="h-2 w-2 background-loading-gradient"></div>
          <div className="h-2 w-10 background-loading-gradient ml-1"></div>
        </div>
        <div className="flex">
          <div className="h-2 w-2 background-loading-gradient"></div>
          <div className="h-2 w-10 background-loading-gradient ml-1"></div>
        </div>
      </div>
    </div >
  )