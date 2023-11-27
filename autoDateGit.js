import { writeFile } from "fs/promises";

(async () => {
    const date = new Date();
    const dateOpts = {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    };
    const data = `Auto Git: Mise A Jour le ${date.toLocaleDateString("fr-FR", dateOpts)} `;
    await writeFile("Com.txt", data);
    console.log("comment updated");
})();
