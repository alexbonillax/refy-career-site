import { faCalendar } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Divider, Navbar } from "../../components";
import AboutCompany from "../../components/about";
import Footer from "../../components/footer";
import { Header } from "../../components/header";
import { Logo } from "../../components/logo";
import { ReadMore } from "../../components/read-more";
import { DEFAULT_WILDCARD } from "../../constants";
import { getCompanyInfo } from "../../services";
import { PostType } from "../../services/enum/post-type";
import { getPosts } from "../../services/getPosts";
import Company from "../../services/models/company";
import Page from "../../services/models/page";
import Post from "../../services/models/post";
import { bucketM, bucketXXL } from "../../services/urls";
import { BeautifyUrl } from "../../utils/beautifyUrl";
import { DateToTimeLeftReduced } from "../../utils/dateToTimeLeftReduced";


export const Posts = ({ stories, companyInfo, loading = true }: { stories: Page<Post>, companyInfo: Company, loading: boolean }) => {
  const { t } = useTranslation("common");
  return (
    <section id="department-posts" className="py-10 px-2 background-color--grey--0">
      <div className="mobile-container">
        <p className="font-big-title text-center desktop:text-4xl mobile:text-3xl">{t('stories.latest')}</p>
      </div>
      <div className="mobile-container flex-column pt-5 ">
        {
          !loading && stories.content?.map((post, i) => (
            <PostItem key={i} post={post} companyInfo={companyInfo} />
          ))
        }

        {
          !loading && stories.content.length <= 0 &&
          <p className="font-prose text-center">{'candidate.stories.empty'}</p>
        }

        {loading && Array.from(Array(3)).map((_, i) => <PostItemLoading key={i} />)}

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
    <div className={`flex-column rounded-b-md ${pics.length > 1 && "border border--white"}`}>
      <div className="flex">
        {
          pics.slice(0, 2).map((pic, i) => {
            const picturePostUrl = bucketXXL + pic;
            return (
              <div key={i}
                className={`flex full-width h-60 overflow-hidden background-center rounded-b-md	 ${pics.length > 1 ? "border border--white" : "bg-cover"}`}
                style={{ backgroundImage: picturePostUrl ? `url(${picturePostUrl})` : '' }}>
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
              <div key={i} className="flex full-width h-20 overflow-hidden background-center border border--white rounded-b-md" style={{ backgroundImage: picturePostUrl ? `url(${picturePostUrl})` : '' }} >
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
      <div className="flex-column border border--grey-100 overflow-hidden cursor-pointer rounded-b-md">
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
        <div className="flex flex-align-center flex-justify-between py-2 px-2">
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
    </div >
  )
};

export const PostItemLoading = () => {
  return (
    <div className="flex-column box-shadow-container--card br-1 my-1">
      <div className="flex-column">
        <div className="flex flex-align-center flex-justify-between p-2">
          <div className="flex flex-align-center">
            <div className="h-5 w-5 background-loading-gradient background-loading-gradient--rounded"></div>
            <div className="flex-column px-2">
              <div className="flex h-3">
                <div className="h-2 w-15 background-loading-gradient"></div>
              </div>
              <div className="h-2 w-5 background-loading-gradient"></div>
            </div>
          </div>
        </div>
      </div>
      <Divider />
      <div className="h-30 flex-column flex-justify-between py-2 px-2 background-loading-gradient background-loading-gradient--rect"></div>
      <div className="flex flex-align-center flex-justify-between py-1 px-2 h-5">
        <div className="h-2 w-2 background-loading-gradient"></div>
        <div className="h-2 w-3 background-loading-gradient ml-1"></div>
      </div>
    </div >
  )
};


interface StoriesProps {
  stories: Page<Post>
};

const Stories: NextPage = ({ pageProps }: any) => {
  const { t, ready } = useTranslation('common')
  const [data, setData] = useState<StoriesProps>({ stories: null })
  const [isLoading, setLoading] = useState(true)
  useEffect(() => {
    async function getJobsData() {
      const stories = await getPosts(pageProps.companyInfo.id);
      setData({ stories });
      setLoading(false);
      console.log(pageProps.wildcard);
    }
    getJobsData();
  }, [])
  return (
    <>
      <Header company={pageProps.companyInfo} title={t('stories')} />
      <div className="pt-8">
        <Navbar company={pageProps.companyInfo} url='stories' />
        <Posts stories={data.stories} companyInfo={pageProps.companyInfo} loading={isLoading} />
        <AboutCompany {...pageProps.companyInfo} />
        <Footer />
      </div>
    </>
  )
};

export const getServerSideProps = async ({ locale, req }: any) => {
  const translations = await serverSideTranslations(locale, ["common"]);
  const wildcard = (process.env.NODE_ENV != "development" && !!req.headers.host.includes('localhost')) ? req.headers.host.split(".")[0] : DEFAULT_WILDCARD;
  const companyInfo = await getCompanyInfo(wildcard);
  return {
    props: {
      _nextI18Next: translations._nextI18Next,
      pageProps: {
        companyInfo,
        wildcard
      }
    }
  };
};

export default Stories;