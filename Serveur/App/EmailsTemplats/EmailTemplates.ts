export const validationMailTemplate = (link: string, name: string): string => {
    return `<div style="width: 50%; margin: auto; font-family: Arial, Helvetica, sans-serif; color: #000000">
    <div style="width: 100%; font-size: 30px; font-weight: bold; text-transform: capitalize; color: #000000; text-align: center">
        email confirmation
    </div>
    <br />
    <div style="font-weight: bold; text-align: left; width: 100%; color: #000000">Hello ${name} hope you are doing well!</div>
    <br />
    <div style="margin: 10px 0; color: #000000">
        Thank you for your registration in sahla & mahla , we are looking formard to accomplish <b>BIG</b> things together, but first you must
        conifrm your e-mail, to do so just click on the button bellow
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
            Confirm My E-mail
        </div>
    </a>
    <br />
    <br />
    <div style="text-align: left; width: 100%; color: #000000">see you soon !</div>
    <br />
    <div style="font-size: 12px; text-align: left; width: 100%; color: #000000">Sahla & Mahla Team</div>
</div>`;
};

export const passResetMailTemplate = (link: string, email: string): string => {
    return `<div style="width: 50%; margin: auto; font-family: Arial, Helvetica, sans-serif; color: #000000">
    <div style="width: 100%; font-size: 30px; font-weight: bold; text-transform: capitalize; color: #000000; text-align: center">
        Password reset mail
    </div>
    <br />
    <div style="font-weight: bold; text-align: left; width: 100%; color: #000000">Hello ${email} hope you are doing well!</div>
    <br />
    <div style="margin: 10px 0; color: #000000">
        You forgot your password ? don't panick we'v got your back , juste click on the link bellow and reset your password
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
            Reset My Password
        </div>
    </a>
    <br />
    <br />
    <div style="text-align: left; width: 100%; color: #000000">Good Luck</div>
    <br />
    <div style="font-size: 12px; text-align: left; width: 100%; color: #000000">Sahla & Mahla Team</div>
</div>`;
};
