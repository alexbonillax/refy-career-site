import { get } from ".";
import Page from "./models/page";
import Post from "./models/post";

export const getPosts = async (tenantCode: string): Promise<Page<Post>> => 
    get(`stories?
    tenant=${tenantCode}&
    page=1&
    perPage=100&
    scope=candidate&
    include=authorUser,stats`);
