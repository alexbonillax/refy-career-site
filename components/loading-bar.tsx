import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const LoadingBar = ({ color }: { color: string }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    let time = 0;
    useEffect(() => {
        const handleStart = (url: string) => {
            if (url !== router.asPath) {
                setLoading(true);
                time = 100;
            }
        }
        const handleComplete = (url: string) => (url === router.asPath) && setLoading(false);

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
            <div className={`h-0.8 absolute w-full opacity-30 ${!loading ? 'hidden' : ''}`} style={{ backgroundColor: color }}></div>
            <div className={`h-0.8 absolute animate--loading-bar ${loading ? 'w-full' : 'w-0'} `} style={{ backgroundColor: color }}></div>
        </>
    );
}