// Serves the built ClientApp; unknown paths fall back to index.html (client-side routing).
// Copied next to Serveur/dist in the image so it reuses Serveur's express.
const path = require("path");
const express = require("express");
const compression = require("compression");

const dir = path.join(__dirname, "../ClientApp/dist");
const app = express();
app.use(compression());
app.use(express.static(dir));
app.get("*", (req, res) => res.sendFile(path.join(dir, "index.html")));
app.listen(process.env.PORT, () => console.log(`App live on port ${process.env.PORT}`));
