import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const LoadingBar = ({ color }: { color: string }) => {

  enum BarStates {
    Start = 'start',
    Loading = 'loading',
    Done = 'done',
  }
  const router = useRouter();
  const [loading, setLoading] = useState(BarStates.Start);
  useEffect(() => {
    const handleStart = (url: string) => {
      if (url !== router.asPath) {
        setLoading(BarStates.Loading);
      }
    }
    const handleComplete = (url: string) => {
      if (url === router.asPath) {
        setLoading(BarStates.Done);
        setTimeout(() => setLoading(BarStates.Start), 600)
      }
    };

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  })

  // return loading && (
  return (
    <>
      <div className={`h-0.8 absolute w-full opacity-30 ${loading === BarStates.Start ? 'hidden' : ''}`} style={{ backgroundColor: color }}></div>
      <div className={`h-0.8 absolute animate--loading-bar__${loading} ${loading === BarStates.Loading || loading === BarStates.Done ? 'w-full' : 'w-0'} `} style={{ backgroundColor: color }}></div>
    </>
  );
}