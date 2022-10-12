import { ImageLoaderProps } from "next/image"
import { bucketL, bucketM, bucketS, bucketXL } from "../services/urls"

export const loaderBucketS = ({ src }: ImageLoaderProps) => {
    return `${bucketS}${src}`
}

export const loaderBucketM = ({ src }: ImageLoaderProps) => {
    return `${bucketM}${src}`
}

export const loaderBucketL = ({ src }: ImageLoaderProps) => {
    return `${bucketL}${src}`
}

export const loaderBucketXL = ({ src }: ImageLoaderProps) => {
    return `${bucketXL}${src}`
}