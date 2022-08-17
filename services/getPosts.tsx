import { post } from ".";
import Page from "./models/page";
import Post from "./models/post";

export const getPosts = async (companyId: number): Promise<Page<Post>> => post('candidates/posts/list', { companyId , departmentId: 0, page: 1, perPage: 20, searchText: ''} );
