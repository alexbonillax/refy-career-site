import { faCalendar, faShareNodes } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Divider, Navbar } from "../../components";
import AboutCompany from "../../components/about";
import Footer from "../../components/footer";
import { Header } from "../../components/header";
import { Logo } from "../../components/logo";
import { ReadMore } from "../../components/read-more";
import { getCompanyInfo } from "../../services";
import { PostType } from "../../services/enum/post-type";
import { getPosts } from "../../services/getPosts";
import Company from "../../services/models/company";
import Page from "../../services/models/page";
import Post from "../../services/models/post";
import { bucketM, bucketXXL } from "../../services/urls";
import { BeautifyUrl } from "../../utils/beautifyUrl";
import { DateToTimeLeftReduced } from "../../utils/dateToTimeLeftReduced";

export const Posts = ({ stories, companyInfo }: { stories: Page<Post>, companyInfo: Company }) => {
  const { t } = useTranslation("common");
  return (
    <section id="department-posts" className="py-10 px-2 background-color--grey--0">
      <div className="mobile-container">
        <p className="font-big-title text-center mobile:font-big-title--40">{t('stories.latest')}</p>
      </div>
      <div className="mobile-container flex-column pt-5 ">
        {
          stories.content?.map((post, i) => (
            <PostItem key={i} post={post} companyInfo={companyInfo} />
          ))
        }

        {/* <ng-container *ngIf="(loading$ | async) || (posts$ | async)?.hasMorePages">
        <ng-container *ngFor="let i of loadingsPerPage; let last = last">
          <app-post-loading [displayAsCard]="true"></app-post-loading>
        </ng-container>
      </ng-container> */}

        {stories.content.length <= 0 &&
          <p className="font-prose text-center">{'candidate.stories.empty'}</p>
        }

      </div>
    </section>
  )
};

const HeaderUserPost = (post: Post) => {
  const userPicUrl = post.overview.user.avatar ? bucketM + post.overview.user.avatar : '';
  return (
    <>
      <Logo imgSrc={userPicUrl} />
      <div className="flex-column pl-1 pr-2">
        <p className="font-header">{post.overview.user.firstName} {post.overview.user.lastName}</p>
        <p className="flex flex-align-center font-value">
          <FontAwesomeIcon icon={faCalendar} className="w-1-5 mr-1" />
          {DateToTimeLeftReduced(post.attributes.createdAt)}</p>
      </div>
    </>
  )
};

const HeaderCompanyPost = ({ post, companyInfo }: { post: Post, companyInfo: Company }) => {
  const companyPicUrl = companyInfo.attributes?.logo ? bucketM + companyInfo.attributes.logo : '';
  return (
    <>
      <Logo imgSrc={companyPicUrl} />
      <div className="flex-column pl-1 pr-2">
        <p className="font-header">{companyInfo.attributes?.name}</p>
        <p className="flex flex-align-center font-value">
          <FontAwesomeIcon icon={faCalendar} className="w-1-5 mr-1" />
          {DateToTimeLeftReduced(post.attributes.createdAt)}</p>
      </div>
    </>
  )
}

const PicPost = (pictures: string[]) => {
  const pics = Object.values(pictures);
  return (
    <div className={"flex-column" + (pics.length > 1 && "border border--white")}>
      <div className="flex">
        {
          pics.slice(0, 2).map((pic, i) => {
            const picturePostUrl = bucketXXL + pic;
            return (
              <div key={i} className={"flex full-width h-60 overflow-hidden background-center " + (pics.length > 1 ? "border border--white" : "bg-cover")} style={{ backgroundImage: picturePostUrl ? `url(${picturePostUrl})` : '' }}>
                <div className="flex-column flex-justify-between full-width full-height py-2 px-2 background-color--blurr-soft-dark"></div>
              </div>
            )
          })
        }
      </div>
      <div className="flex">
        {
          pics.slice(2, pics.length > 5 ? 4 : 5).map((pic, i) => {
            const picturePostUrl = bucketXXL + pic;
            return (
              <div key={i} className="flex full-width h-20 overflow-hidden background-center border border--white" style={{ backgroundImage: picturePostUrl ? `url(${picturePostUrl})` : '' }} >
                <div className="flex-column flex-justify-between full-width full-height py-2 px-2 background-color--blurr-soft-dark"></div>
              </div>
            )
          })
        }
        {
          pics.length > 5 &&
          <div className="flex full-width h-20 overflow-hidden background-center border border--white">
            <div className="flex flex-align-justify-center full-width full-height py-2 px-2 background-color--blurr-dark">
              <p className="font-big-title font-big-title--26 font--white">+{pics.length - 4}</p>
            </div>
          </div>
        }
      </div>
    </div >
  )
}

const Badge = ({ text }: { text: string }) => (
  <div className="badge badge-condensed">
    <p className="flex flex-align-center font-badge font-badge--condensed font-badge--contrast-grey px-1">{text}</p>
  </div>
)

export const PostLink = ({ post }: { post: Post }) => (
  <Link href={post.attributes.url}>
    <a target="_blank">
      <div className="flex-column border border--grey-100 overflow-hidden cursor-pointer">
        <div className="flex h-30 overflow-hidden background-center" style={{ backgroundImage: post.attributes.urlPicture ? `url(${post.attributes.urlPicture})` : '' }}>
          <div className="flex-column flex-justify-between full-width full-height py-2 px-2 background-color--blurr-soft-dark"></div>
        </div>
        <div className="flex-column py-1 px-2 background-color--grey--blue">
          <p className="font-header">{post.attributes.title}</p>
          <p className="font-value font--ellipsis">{BeautifyUrl(post.attributes.url)}</p>
        </div>
      </div>
    </a>
  </Link>
)


export const PostItem = ({ post, companyInfo }: { post: Post, companyInfo: Company }) => {
  return (
    <div className="flex-column box-shadow-container--card br-1 my-1">
      <div className="flex-column">
        <div className="flex flex-align-center flex-justify-between py-1 px-2">
          <div className="flex flex-align-center font--ellipsis">
            {
              post.overview.user && post &&
              <HeaderUserPost {...post} />
            }
            {
              !post.overview.user &&
              <HeaderCompanyPost post={post} companyInfo={companyInfo} />
            }
          </div>
        </div>
        <Divider title="" />
        <div className="py-1 px-2">
          <ReadMore text={post.attributes.comment} />
        </div>
        {
          post.attributes.hashtags?.length &&
          <div className="flex flex-wrap py-1 space-x-2 px-2">
            {
              post.attributes.hashtags.map((hashtag, i) => (
                <Badge key={i} text={`#${hashtag}`} />
              ))
            }
          </div>
        }
      </div>

      {
        post.attributes.type === PostType.Link &&
        <PostLink post={post} />
      }

      {
        post.attributes.type === PostType.Image &&
        <PicPost {...post.attributes.pictures} />
      }

      {
        post.sharedBy &&
        <div className="flex flex-align-center flex-justify-between py-1 px-2 h-5">
          <div className="flex">
            {/* <ng-container *ngFor="let user of post.sharedBy.slice(0, 5)">
        <app-logo [size]="LogoSizes.S" [overlap]="true" [rounded]="true" [logoType]="LogoType.Profile" [firstLetter]="user.firstName" [url]="user.avatar"
          matTooltip="{{ user.firstName }} {{ user.lastName }}"
          matTooltipPosition="above"></app-logo>
      </ng-container> */}
          </div>
          <p className="flex flex-align-center font-value font--ellipsis">
            <FontAwesomeIcon icon={faShareNodes} className="mr-1" />
            {post.sharedBy.length}</p >
        </div >
      }


      {/* <ng-container *ngIf="buttons">
    <div className="flex flex-justify-end pt-1 pb-2 px-2">
      <div *ngIf="company.referralProgram.createPosts && post.overview.user?.id === me?.id" className="mid-width pr-1">
         <app-button-basic
          (click)="openEditPost()"
          [size]="ButtonSize.SMALL"
          [classes]="'button--dark-grey button-border--grey button-hover button-hover--dark'">
          <fa-icon className="mr-1" [icon]="faPenToSquare"></fa-icon>
          {{ 'manage.edit-post.edit-post' | transloco }}
        </app-button-basic> 
      </div>
      <div className="mid-width pl-1">
        <app-button-post (click)="onShare()" [posted]="post.overview.posted" [tokens]="company.referralProgram.sharedPost" [token]="company.referralProgram.token"></app-button-post>
      </div>
    </div>
  </ng-container> */}
    </div >
  )
};

interface StoriesProps {
  companyInfo: Company;
  stories: Page<Post>
};

const Stories: NextPage = () => {
  const { t, ready } = useTranslation('common')
  const [data, setData] = useState<StoriesProps>({ companyInfo: null, stories: null })
  const [isLoading, setLoading] = useState(true)
  useEffect(() => {
    async function getJobsData() {
      const companyInfo = await getCompanyInfo();
      const stories = await getPosts(companyInfo.id);
      setData({ companyInfo, stories });
      setLoading(false);
    }
    getJobsData();
  }, [])
  return (
    <>
      {(!isLoading) &&
        <>
          <Header companyName={data.companyInfo.attributes.name} title={t('stories')} />
          <div className="pt-8">
            <Navbar logoUrl={data.companyInfo.attributes.logo} url='stories' companyUrl={data.companyInfo.attributes.site} />
            <Posts stories={data.stories} companyInfo={data.companyInfo} />
            <AboutCompany {...data.companyInfo} />
            <Footer />
          </div>
        </>
      }
      {
        (isLoading) &&
        <h2>Loading</h2>
      }
    </>
  )
};

export default Stories;