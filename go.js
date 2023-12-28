import { exec } from "child_process";

exec(
    "Remove-Item -Recurse -Force C:/Users/THINKBOOK/Desktop/salaMahla-Dep/www/app.sahla-mahla.com/*",
    { shell: "powershell.exe" },
    (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log("dist removed");
    }
);
// exec(
//     "Remove-Item -Recurse -Force C:/Users/THINKBOOK/Desktop/salaMahla-Dep/www/api.sahla-mahla.com",
//     { shell: "powershell.exe" },
//     (error, stdout, stderr) => {
//         if (error) {
//             console.log(`error: ${error.message}`);
//             return;
//         }
//         if (stderr) {
//             console.log(`stderr: ${stderr}`);
//             return;
//         }
//         console.log("dist removed");
//     }
// );
// exec(
//     "Remove-Item -Recurse -Force C:/Users/THINKBOOK/Desktop/salaMahla-Dep/www/cdn.sahla-mahla.com",
//     { shell: "powershell.exe" },
//     (error, stdout, stderr) => {
//         if (error) {
//             console.log(`error: ${error.message}`);
//             return;
//         }
//         if (stderr) {
//             console.log(`stderr: ${stderr}`);
//             return;
//         }
//         console.log("dist removed");
//     }
// );

setTimeout(() => {
    exec(
        "cp C:/Users/THINKBOOK/Desktop/sahla-mahla-prototype/ClientApp/dist/* C:/Users/THINKBOOK/Desktop/salaMahla-Dep/www/app.sahla-mahla.com -Recurse -force",
        { shell: "powershell.exe" },
        (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log("Front Copied");
        }
    );
    exec(
        "cp C:/Users/THINKBOOK/Desktop/sahla-mahla-prototype/Serveur/dist/* C:/Users/THINKBOOK/Desktop/salaMahla-Dep/www/api.sahla-mahla.com -Recurse -force",
        { shell: "powershell.exe" },
        (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log("Server Copied");
        }
    );
    exec(
        "cp C:/Users/THINKBOOK/Desktop/sahla-mahla-prototype/Cdn/dist/* C:/Users/THINKBOOK/Desktop/salaMahla-Dep/www/cdn.sahla-mahla.com -Recurse -force",
        { shell: "powershell.exe" },
        (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log("cdn Copied");
            exec(
                "cd C:/Users/THINKBOOK/Desktop/salaMahla-Dep ; scp -i sahlaSSH.txt -r ./www/* root@app.sahla-mahla.com:/var/www ",
                { shell: "powershell.exe" },
                (error, stdout, stderr) => {
                    if (error) {
                        console.log(`error: ${error.message}`);
                        return;
                    }
                    if (stderr) {
                        console.log(`stderr: ${stderr}`);
                        return;
                    }
                    if (stdout) {
                        console.log(`stdout: ${stdout}`);
                    }
                    console.log("Upload Fini");
                }
            );
        }
    );
}, 1000);

// setTimeout(() => {
//     exec(
//         "cd C:/Users/THINKBOOK/Desktop/CloudServ ; scp -i ssh.txt -r ./TesteRealAuto/* root@62.171.133.211:/home/TesteRealAuto ",
//         { shell: "powershell.exe" },
//         (error, stdout, stderr) => {
//             if (error) {
//                 console.log(`error: ${error.message}`);
//                 return;
//             }
//             if (stderr) {
//                 console.log(`stderr: ${stderr}`);
//                 return;
//             }
//             if (stdout) {
//                 console.log(`stdout: ${stdout}`);
//             }
//             console.log("Upload Fini");
//         }
//     );
// }, 2000);
