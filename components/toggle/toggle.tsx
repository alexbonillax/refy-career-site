import { useEffect, useState } from "react"

export const ToggleButton = ({ onClick }: { onClick?: (e: boolean) => void }) => {
  const [data, setData] = useState<boolean>(false);
  useEffect(() => {

    setData(JSON.parse(localStorage.getItem('darkTheme')) === true);

  }, [data])
  return (
    <label className="inline-flex relative items-center cursor-pointer">
      <input type="checkbox" checked={data} onChange={() => { setData(!data); onClick(!data); localStorage.setItem('darkTheme', (!data).toString()); }} id="default-toggle" className="sr-only peer" />
      <div className="w-5.5 h-3 peer-focus:outline-none peer-focus:ring-4 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-gray-600 peer-checked:after:bg-gray-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-white"></div>
    </label>
  )
}