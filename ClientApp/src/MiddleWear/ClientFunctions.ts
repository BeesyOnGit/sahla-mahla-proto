import { FormEventHandler, useSyncExternalStore } from "react";
import { useState, useEffect } from "react";
import { apiResponseLang } from "./ClientData";
import { configColorType, langType } from "./ClientInterface";

export function useWindowDimensions() {
    const hasWindow: Boolean = typeof window !== "undefined";

    function getWindowDimensions() {
        const width: number | null = hasWindow ? window.innerWidth : null;
        const height: number | null = hasWindow ? window.innerHeight : null;
        return {
            width,
            height,
        };
    }

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        if (hasWindow) {
            function handleResize() {
                setWindowDimensions(getWindowDimensions());
            }

            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, [hasWindow]);

    return windowDimensions;
}

export const getTimefromNow = (creationDate: string | Date | number | null) => {
    if (creationDate) {
        const now = new Date().getTime();
        const date = new Date(creationDate).getTime();
        const timeDifference = now - date;

        const divi = (n: number) => {
            return Math.floor(timeDifference / n);
        };

        const minuteMs = 60000,
            hourMs = 3600000,
            dayMs = 86400000,
            weekMs = 604800000,
            monthMs = 2419200000;

        if (divi(monthMs) >= 1) {
            return `il y a ${divi(monthMs)} Mois`;
        }
        if (divi(weekMs) >= 1) {
            return `il y a ${divi(weekMs)} Semaine${divi(weekMs) == 1 ? "" : "s"}`;
        }
        if (divi(dayMs) >= 1) {
            return `il y a ${divi(dayMs)} Jour${divi(dayMs) == 1 ? "" : "s"}`;
        }
        if (divi(hourMs) >= 1) {
            return `il y a ${divi(hourMs)} Heure${divi(hourMs) == 1 ? "" : "s"}`;
        }
        if (divi(minuteMs) <= 1) {
            return "il y a moins d'une Minute";
        }
        if (divi(minuteMs) < 60) {
            return `il y a ${divi(minuteMs)} Minute${divi(minuteMs) == 1 ? "" : "s"}`;
        }
    }
    return "date incorrecte";
};

export const randomIdGenerator = (length: number) => {
    let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
    let id = "";
    for (let i = 0; i < length; i++) {
        id += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return id;
};

export const phoneFomater = (str: string) => {
    const cleanedString = str.trim();
    let groups = cleanedString.match(/.{1,2}/g);

    groups![0] = groups![0] + groups![1];
    groups?.splice(1, 1);

    const formattedString = groups!.join(" ");

    return formattedString;
};

export const formatAsCurrency = (amount: number) => {
    const lang = window.localStorage.lang;
    const DZDCurr = new Intl.NumberFormat(`${lang}-DZ`, {
        style: "currency",
        maximumSignificantDigits: 10,
        currency: "DZD",
    });
    const price = JSON.stringify(DZDCurr.format(amount));
    const prArr = price.split("");
    prArr.shift();
    prArr.pop();
    prArr.splice(prArr.length - 3, 1);
    const finalSTR = prArr.join("");
    const returned = finalSTR.replace(/\s+/g, ",");
    return returned;
};

interface mediaCompression {
    InputValues: any;
    width?: number;
    quality?: number;
    format?: "jpeg" | "png" | "webp";
}

export const mediaCompressionArr = async ({ InputValues, width, quality, format }: mediaCompression) => {
    return new Promise((resolve) => {
        const files = InputValues;
        let filesArray: Array<Blob> = [];

        for (const file of files) {
            filesArray.push(file);
        }

        let CompressedMedias: Array<string> = [];
        const finish = files.length - 1;

        if (finish == -1) {
            return resolve([]);
        }

        filesArray.forEach((file: Blob, index: number) => {
            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = (event: any) => {
                const imageUrl = event.target.result;
                const image: any = document.createElement("img");
                image.src = imageUrl;
                image.crossOrigin = "anonymous";

                image.onload = (e: any) => {
                    let canvas = document.createElement("canvas");
                    let ratio = width! / image.width;
                    canvas.width = width!;
                    canvas.height = image.height * ratio;

                    let context: any = canvas.getContext("2d");
                    context.drawImage(image, 0, 0, canvas.width, canvas.height);

                    const imageUrl: string = canvas.toDataURL(`image/${format}`, quality);
                    CompressedMedias.push(imageUrl);

                    if (index == finish) {
                        return resolve(CompressedMedias);
                    }
                };
            };
        });
    });
};

export const mediaCompressionMono = async ({ InputValues, width, quality, format }: mediaCompression) => {
    return new Promise((resolve) => {
        const file = InputValues;

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = (event: any) => {
            const imageUrl = event.target.result;
            const image: any = document.createElement("img");
            image.src = imageUrl;
            image.crossOrigin = "anonymous";

            image.onload = (e: any) => {
                let canvas = document.createElement("canvas");
                let ratio = width! / image.width;
                canvas.width = width!;
                canvas.height = image.height * ratio;

                let context: any = canvas.getContext("2d");
                context.drawImage(image, 0, 0, canvas.width, canvas.height);

                const imageUrl: string = canvas.toDataURL(`image/${format}`, quality);

                return resolve(imageUrl);
            };
        };
    });
};
export const fileToBase64Mono = async ({ InputValues }: mediaCompression) => {
    return new Promise((resolve) => {
        const file = InputValues;

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = (event: any) => {
            return resolve(event.target.result);
        };
    });
};

export const setUserType = (type: number) => {
    return window.localStorage.setItem("_user_type", type.toString());
};

// export const getDaysOfWorkFromRange = ({ from, to }: { from?: number; to?: number }) => {
//     const date = new Date();
//     if (!from) {
//         from = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
//     }
//     if (!to) {
//         to = new Date(date.getFullYear(), date.getMonth() + 1, 1).getTime();
//     }
//     const msInDay = 86400000;
//     let daysInRange: number = Math.round((to! - from!) / msInDay);
//     let repoDays: number = 0;

//     for (let i = 7; i <= daysInRange; i += 7) {
//         repoDays += 1;
//     }

//     return daysInRange - repoDays;
// };

export const formatForInput = (date: any, full?: "full") => {
    if (full == "full") {
        return dateToISOStringPreserveTimezone(date).split(".")[0];
    }
    return dateToISOStringPreserveTimezone(date).split("T")[0];
};

function dateToISOStringPreserveTimezone(dateFournished: Date | number | string) {
    const date = new Date(dateFournished);
    const tzOffset = date.getTimezoneOffset() * 60000; // offset in milliseconds
    const localISOTime = new Date(date.getTime() - tzOffset).toISOString().slice(0, -1);
    // const timezoneOffset =
    //     (tzOffset < 0 ? "+" : "-") +
    //     ("0" + Math.abs(tzOffset / 3600000)).slice(-2) + // Hours
    //     ":" +
    //     ("0" + (Math.abs(tzOffset / 60000) % 60)).slice(-2); // Minutes

    return localISOTime;
}

export const getDateVal = (dateToForm: any, type: "from" | "to"): string => {
    const date = new Date();
    const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 1).getTime();
    const monthBegin = new Date(date.getFullYear(), date.getMonth(), 1, 23, 59, 59).getTime();
    if (!dateToForm) {
        return type == "from" ? formatForInput(monthBegin) : type == "to" ? formatForInput(monthEnd) : "";
    }

    return formatForInput(dateToForm);
};

export const linkToURL = async ({ InputValues, width, quality, format }: mediaCompression) => {
    return new Promise<void>((resolve, reject) => {
        let CompressedMedias: any = [];
        const finish = InputValues.length - 1;
        setTimeout(() => {
            resolve(InputValues);
        }, 10000);
        InputValues.forEach((link: string, index: number) => {
            const image: HTMLImageElement = document.createElement("img");
            image.src = link;
            image.crossOrigin = "anonymous";

            image.onload = (e: any) => {
                let canvas = document.createElement("canvas");
                let ratio = width! / image.width;
                canvas.width = width!;
                canvas.height = image.height * ratio;

                let context: any = canvas.getContext("2d");
                context.drawImage(image, 0, 0, canvas.width, canvas.height);

                const imageUrl: string = canvas.toDataURL(`image/${format}`, quality);
                CompressedMedias.push(imageUrl);

                if (index == finish) {
                    return resolve(CompressedMedias);
                }
            };
        });
    });
};

export const urlToFile = (url: any, name: String) => {
    const arr = url.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const data = arr[1];

    const dataStr = atob(data);
    let n = dataStr.length;
    let dataArr = new Uint8Array(n);

    while (n--) {
        dataArr[n] = dataStr.charCodeAt(n);
    }

    let file = new File([dataArr], `${name}.jpg`, { type: mime });

    return file;
};

export const objectToUrl = (obj: any) => {
    return new URLSearchParams(obj).toString();
};

export const URLToObjectQuerry = (url: string) => {
    const urlToArr = url.split("");
    urlToArr.shift();
    const cleanUrlToStr = urlToArr.join("");
    const object = JSON.parse('{"' + cleanUrlToStr.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) {
        return key === "" ? value : decodeURIComponent(value);
    });

    const purifiedString = JSON.stringify(object).replace(/[-+]/g, " ");
    const preReturnStr = JSON.parse(purifiedString);
    for (const key in preReturnStr) {
        preReturnStr[key] = preReturnStr[key];
    }
    return preReturnStr;
};

export const URLSearchAdd = (navigate: Function | null, obj: any) => {
    const { location } = window;
    const { search } = location;
    const url = new URLSearchParams(search ? search : "");

    let tmpOb: any = {};

    for (const [key, val] of url) {
        if (["[", "{"].includes(val[0])) {
            tmpOb = { ...tmpOb, [key]: JSON.parse(val) };
            continue;
        }
        tmpOb = { ...tmpOb, [key]: val };
    }
    tmpOb = { ...tmpOb, ...obj };

    for (const key in tmpOb) {
        if (typeof tmpOb[key] == "object") {
            tmpOb[key] = JSON.stringify(tmpOb[key]);
        }
    }
    const newUrl = objectToUrl(tmpOb);

    return navigate ? navigate(`?${newUrl}`) : newUrl;
};
export const URLSearchremove = (navigate: Function | null, keyToRemove: string) => {
    const { location } = window;
    const { search } = location;

    if (!search) {
        return;
    }

    const url = new URLSearchParams(search);

    let tmpOb = {};

    for (const [key, val] of url) {
        if (key == keyToRemove) {
            continue;
        }
        if (["[", "{"].includes(val[0])) {
            tmpOb = { ...tmpOb, [key]: JSON.parse(val) };
            continue;
        }
        tmpOb = { ...tmpOb, [key]: val };
    }

    const newUrl = objectToUrl(tmpOb);
    return navigate ? navigate(`?${newUrl}`) : newUrl;
};
export const URLSearchParse = (): { [key in string]: any } => {
    const { location } = window;
    const { search } = location;
    if (!search) {
        return {};
    }
    const url = new URLSearchParams(search);

    let tmpOb = {};

    for (const [key, val] of url) {
        if (["[", "{"].includes(val[0])) {
            tmpOb = { ...tmpOb, [key]: JSON.parse(val) };
            continue;
        }
        tmpOb = { ...tmpOb, [key]: val };
    }

    return tmpOb;
};

export const setTheme = (theme: boolean) => {
    if (theme == true) {
        document.documentElement.className = "dark";
    }
    if (theme == false) {
        document.documentElement.className = "light";
    }
};

export const initiateUserColors = (userConfiguredColors: configColorType) => {
    if (!userConfiguredColors) {
        return;
    }

    const { property, color } = userConfiguredColors;
    document.documentElement.style.setProperty(`--${property}`, color);
};

export const urlPath = (url: string) => {
    const urlArr = url.split("/");
    if (urlArr.length <= 2) {
        return urlArr.join("/");
    }
    while (urlArr.length > 2) {
        urlArr.pop();
    }

    return urlArr.join("/");
};

export const pathWithoutParam = (panthNum: number) => {
    const { pathname } = window.location;
    const urlArr = pathname.split("/");
    if (urlArr.length <= panthNum) {
        return urlArr.join("/");
    }
    while (urlArr.length > panthNum) {
        urlArr.pop();
    }

    return urlArr.join("/");
};

export const idElementPrint = (ref: string) => {
    const iframe = document.createElement("iframe");
    iframe.style.width = "80mm";
    iframe.style.minHeight = "80mm";
    const refSelect = document.getElementById(ref);
    iframe.style.display = "none";
    document.body.appendChild(iframe);
    const pri = iframe.contentWindow;

    pri!.document.open();
    pri!.document.write(refSelect!.innerHTML);
    pri!.document.close();
    pri!.focus();
    pri!.print();
    // pri!.onafterprint = () => {
    iframe.remove();
    document.body.removeChild(iframe);
    // };
};

export const randomArrLength = (min: number, max: number) => {
    return new Array(getRandomArbitrary(min, max)).fill(0);
};
export function getRandomArbitrary(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
}

export const dateFormater = (date: Date | string | number, short?: boolean) => {
    const lang: langType = window.localStorage.lang;
    if (lang == "ar") {
        const dateOptions: Intl.DateTimeFormatOptions = !short
            ? { month: "short", day: "numeric", year: "numeric" }
            : { month: "short", day: "numeric" };
        const formatDate = new Date(date);
        return formatDate.toLocaleDateString("ar-EG-u-nu-latn", dateOptions);
    }
    const preferedLang = navigator.language;
    const dateOptions: Intl.DateTimeFormatOptions = !short ? { month: "short", day: "numeric", year: "numeric" } : { month: "short", day: "numeric" };
    const formatDate = new Date(date);
    return formatDate.toLocaleDateString(preferedLang, dateOptions);
};

export const generalAddEditFunction = async (
    e: any,
    {
        endPoint,
        successCode,
        setNewAlert,
        refresh,
        getData,
        optFunc,
        setApiWait,
        apiWait,
    }: {
        refresh: Function;
        endPoint: any;
        successCode: string;
        setNewAlert: Function;
        getData?: boolean;
        optFunc?: Function;
        setApiWait: Function;
        apiWait: boolean;
    }
) => {
    e ? e.preventDefault() : null;

    const lang: "ar" | "fr" | "en" = window.localStorage.lang;
    if (!lang) {
        return;
    }
    try {
        if (apiWait) {
            return;
        }

        setApiWait(true);

        const res = await endPoint;

        if (!res) {
            setApiWait(false);
            return setNewAlert({ type: "error", message: apiResponseLang[lang].resErr });
        }

        const { code, data } = res;

        if (code == "EO") {
            setNewAlert({ type: "error", message: res.error });
            return setApiWait(false);
        }
        if (code != successCode) {
            setNewAlert({ type: "warning", message: apiResponseLang[lang][code] });
            return setApiWait(false);
        }

        setNewAlert({ type: "success", message: apiResponseLang[lang][code] });
        setApiWait(false);

        if (!getData && !optFunc) {
            return refresh();
        }
        return optFunc ? optFunc(data) : refresh();
    } catch (error) {
        console.log("🚀 ~ file: ClientFunctions.ts:272 ~ error:", error);
    }
};

export const generalGetFunction = async ({
    endPoint,
    successCode,
    setNewAlert,
    setState,
    field,
    emptyCode,
    refresh,
    silent,
    cb,
}: {
    endPoint: any;
    successCode: string;
    emptyCode?: string;
    setNewAlert: Function;
    setState?: Function;
    field?: string;
    refresh?: Function;
    silent?: boolean;
    cb?: Function;
}) => {
    const lang: "ar" | "fr" | "en" = window.localStorage.lang;
    if (!lang) {
        return;
    }
    try {
        const res = await endPoint;

        if (!res) {
            return setNewAlert({ type: "error", message: apiResponseLang[lang].resErr });
        }

        const { code, data } = res;

        if (emptyCode && code == emptyCode) {
            silent ? null : setNewAlert({ type: "warning", message: apiResponseLang[lang][code] });
            return setState ? setState("empty") : undefined;
        }
        if (code == "EO") {
            return setNewAlert({ type: "error", message: res.error });
        }
        if (code != successCode) {
            return silent ? null : setNewAlert({ type: "warning", message: apiResponseLang[lang][code] });
        }

        silent ? null : setNewAlert({ type: "success", message: apiResponseLang[lang][code] });

        refresh && refresh();

        cb ? cb() : null;

        return setState && setState!(field ? data[field] : data);
    } catch (error) {}
};
