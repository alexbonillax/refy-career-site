import { faCookieBite } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { Accordion } from "../accordion";
import { ButtonBasic } from "../buttons";
import { Toggle } from "../toggle/toggle";

const cookieLifespawn = (): string => {
  var now = new Date();
  var time = now.getTime();
  var expireTime = time + 1000 * 36000;
  now.setTime(expireTime);
  return now.toUTCString();
}

export const CookiesBanner = () => {
  const { t } = useTranslation("common");

  const refyCookies = [
    { title: t('cookies.type.analysis'), description: t('cookies.type.analysis-desc'), id: '_refyAnalitycs', value: 'xxxxxx', defValue: 'xxxxxx', expiration: cookieLifespawn() },
    { title: t('cookies.type.publi'), description: t('cookies.type.publi-desc'), id: '_refyMarketing', value: 'xxxxxx', defValue: 'xxxxxx' },
    { title: t('cookies.type.preferences'), description: t('cookies.type.preferences-desc'), id: '_refyPreferences', value: 'xxxxxx', defValue: 'xxxxxx', mandatory: true },
  ]

  const updateFieldChanged = (index: number, value: boolean) => {
    let newArr = [...cookies];
    newArr[index] = { ...newArr[index], value: value ? newArr[index].defValue : 'NaN' }
    setCookies(newArr);
  }

  const setAllCookies = (): void => {
    cookies.forEach(cookie => {
      document.cookie = `${cookie.id}=${cookie.value};${cookie.expiration ? `expires=${cookieLifespawn()};` : ''}`;
    })
    setSettedCookies(true);
  }

  const rejectAllCookies = (): void => {
    cookies.forEach(cookie => {
      document.cookie = `${cookie.id}=NaN;${cookie.expiration ? `expires=${cookieLifespawn()};` : ''}`;
    })
    setSettedCookies(true);
  }

  const getCookie = (name: string): string | null => {
    const nameLenPlus = (name.length + 1);
    return document.cookie
      .split(';')
      .map(c => c.trim())
      .filter(cookie => {
        return cookie.substring(0, nameLenPlus) === `${name}=`;
      })
      .map(cookie => {
        return decodeURIComponent(cookie.substring(nameLenPlus));
      })[0] || null;
  }

  const [settedCookies, setSettedCookies] = useState(Boolean);
  const [cookies, setCookies] = useState(refyCookies);
  const [editCookies, setEditCookies] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (!document) { return };
    setSettedCookies(!refyCookies.some(cookie => !!!getCookie(cookie.id)));
    setLoading(false);
  }, [])
  return (
    <>
      {(!settedCookies && !loading) &&
        <section className="fixed flex flex-col bottom-0 left-0 right-0 background-color--grey--0 z-20">
          <div className="w-full pt-0.5 background-dynamic"></div>
          <div className="w-5 h-4 flex justify-center items-center background-dynamic rounded-b-3xl margin-auto">
            <FontAwesomeIcon icon={faCookieBite} className="icon-font icon-font--normal icon-font--light"></FontAwesomeIcon>
          </div>
          <div className="flex">
            <div className={`max-w-6xl relative font-hint mx-auto flex ${editCookies ? 'flex-col' : 'desktop:flex-row mobile:flex-col'}  p-3 justify-between`}>
              {
                editCookies &&
                <div className="pb-5">
                  {
                    cookies.map((cookie, i) => (
                      <div className="flex justify-between w-full max-w-6xl" key={i}>
                        <Accordion first={i === 0} title={cookie.title} open={false} setHeight={500}>
                          <div className="w-full pt-1 pb-3 flex justify-center items-center">{cookie.description}</div>
                        </Accordion>
                        <Toggle disabled={cookie.mandatory} value={cookie.value === cookie.defValue} onClick={e => updateFieldChanged(i, e)} />
                      </div>
                    ))
                  }
                </div>
              }
              {
                !editCookies &&
                <div className="flex flex-col w-full">
                  <div className="font-subtitle pb-1">{t('cookies.title')}</div>
                  <div className="font-multiline">{t('cookies.description')}</div>
                </div>
              }
              <div className={`flex items-center mobile:justify-center mobile:my-5 h-auto space-x-4 ${editCookies ? 'justify-center' : 'ml-5'}`}>
                <div className="w-28 font-subtitle !text-sm underline cursor-pointer" onClick={_ => setEditCookies(!editCookies)}>{t('cookies.setting')}</div>
                <ButtonBasic classes="button button--outline" onClick={() => rejectAllCookies()}>{t('cookies.reject')}</ButtonBasic>
                <ButtonBasic onClick={() => setAllCookies()}>{t('cookies.accept')}</ButtonBasic>
              </div>
            </div>
          </div>
        </section>
      }
    </>
  )
}