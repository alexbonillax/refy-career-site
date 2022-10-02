import { PostType } from "../enum/post-type";
import PostOverview from "./post-overview";
import Profile from "./profile";
export default interface Post {
  id: number;
  attributes: {
    type: PostType;
    title: string;
    comment: string;
    pictures: string[];
    url: string;
    urlPicture: string;
    hashtags: string[];
    linkedinCode: string;
    startsAt: Date;
    endsAt: Date;
    createdAt: Date;
    video?: string;
  };
  overview: {
    user: PostOverview;
    posted: boolean;
  };
  sharedBy: PostOverview[];
  author: Profile;
}