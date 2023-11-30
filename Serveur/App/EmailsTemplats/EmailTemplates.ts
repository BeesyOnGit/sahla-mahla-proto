import { emailConfirmLang, passwordResetLang } from "./EmailTemplatesLang";

const defaultLang = "fr";
export const validationMailTemplate = (link: string, name: string, language?: "ar" | "fr" | "en"): string => {
    const lang: "ar" | "fr" | "en" = language || defaultLang;

    return `<div dir=${lang == "ar" ? "rtl" : "ltr"} style="width: 50%; margin: auto; font-family: Arial, Helvetica, sans-serif; color: #000000">
    <div style="width: 100%; font-size: 30px; font-weight: bold; text-transform: capitalize; color: #000000; text-align: center">
        ${emailConfirmLang[lang].title}
    </div>
    <br />
    <div style="font-weight: bold; text-align:start; width: 100%; color: #000000">${emailConfirmLang[lang].greeting} ${name} ${
        emailConfirmLang[lang].greetingRest
    }</div>
    <br />
    <div style="margin: 10px 0; color: #000000; text-align:start">
    ${emailConfirmLang[lang].instruction}
    </div>
    <br />

    <a style="padding-top: 16px; text-decoration: none; display: block; margin: 0 auto; max-width: 464px" href=${link}>
        <div
            style="
                height: 40px;
                text-align: center;
                vertical-align: middle;
                line-height: 40px;
                border-radius: 50px;
                background-color: rgb(0, 128, 87);
                color: #ffffff;
            "
        >
        ${emailConfirmLang[lang].button}
        </div>
    </a>
    <br />
    <br />
    <div style="; text-align:start; width: 100%; color: #000000">${emailConfirmLang[lang].goodbye}</div>
    <br />
    <div style="font-size: 12px ; text-align:start; width: 100%; color: #000000">${emailConfirmLang[lang].team}</div>
</div>`;
};

export const passResetMailTemplate = (link: string, email: string, language?: "ar" | "fr" | "en"): string => {
    const lang: "ar" | "fr" | "en" = language || defaultLang;

    return `<div dir=${lang == "ar" ? "rtl" : "ltr"} style="width: 50%; margin: auto; font-family: Arial, Helvetica, sans-serif; color: #000000">
    <div style="width: 100%; font-size: 30px; font-weight: bold; text-transform: capitalize; color: #000000; text-align: center">
    ${passwordResetLang[lang].title}
    </div>
    <br />
    <div style="font-weight: bold; text-align:start; width: 100%; color: #000000">${passwordResetLang[lang].greeting} ${email} ${
        passwordResetLang[lang].greetingRest
    } </div>
    <br />
    <div style="margin: 10px 0; color: #000000; text-align:start">
    ${passwordResetLang[lang].instruction}
    </div>
    <br />

    <a style="padding-top: 16px; text-decoration: none; display: block; margin: 0 auto; max-width: 464px" href=${link}>
        <div
            style="
                height: 40px;
                text-align: center;
                vertical-align: middle;
                line-height: 40px;
                border-radius: 50px;
                background-color: rgb(0, 128, 87);
                color: #ffffff;
            "
        >
        ${passwordResetLang[lang].button}
        </div>
    </a>
    <br />
    <br />
    <div style="text-align:start; width: 100%; color: #000000">${passwordResetLang[lang].goodLuck}</div>
    <br />
    <div style="font-size: 12px; text-align:start; width: 100%; color: #000000">${passwordResetLang[lang].team}</div>
</div>`;
};
