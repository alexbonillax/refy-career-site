import { DEFAULT_WILDCARD } from "../constants"

const getWildcardCode = (url: string) => {
    return (process.env.NODE_ENV != "development" && !url.includes('localhost')) ? url.split(".")[0] : DEFAULT_WILDCARD
}

export default getWildcardCode;