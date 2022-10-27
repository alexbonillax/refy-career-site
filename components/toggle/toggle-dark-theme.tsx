import { faMoon, faSunBright } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react"

export const ToggleDarkTheme = ({ onClick }: { onClick?: (e: boolean) => void }) => {
  const [data, setData] = useState<boolean>(false);
  useEffect(() => {
    setData(JSON.parse(localStorage.getItem('darkTheme')) === true);
  }, [data])
  return (
    <label className="inline-flex relative items-center cursor-pointer">
      <input type="checkbox" checked={data} onChange={() => { setData(!data); onClick(!data); localStorage.setItem('darkTheme', (!data).toString()); }} id="default-toggle" className="sr-only peer" />
      <div className={`w-5.5 h-3 flex items-center ${data ? 'justify-end' : ''} transition-all peer-focus:outline-none peer-focus:ring-4 rounded-full peer dark:bg-gray-700   dark:border-gray-600 peer-checked:bg-white`}>
        <div className="flex flex-align-justify-center w-3">
          <FontAwesomeIcon className={`${data ? 'text-gray-700' : 'text-yellow-300'} icon-font icon-font--normal`} icon={data ? faMoon : faSunBright} />
        </div>
      </div>
    </label>
  )
}